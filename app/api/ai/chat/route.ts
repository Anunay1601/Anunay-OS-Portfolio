import { NextResponse } from "next/server";
import { getVerifiedPortfolioContext } from "@/lib/ai/portfolioContext";
import { generatePortfolioFallbackResponse } from "@/lib/ai/fallbackEngine";

// Lightweight in-memory rate limiter (sliding window)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    // Basic IP rate limiting check
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another query." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request payload: messages array is required." },
        { status: 400 }
      );
    }

    // Sanitize and bound payload: max 15 messages, max 1000 chars per message
    const boundedMessages = messages.slice(-15).map((m: any) => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: typeof m?.content === "string" ? m.content.slice(0, 1000) : "",
    }));

    const lastUserMessage = [...boundedMessages].reverse().find((m) => m.role === "user");
    const userQuery = lastUserMessage ? lastUserMessage.content : "";

    const apiKey = process.env.OPENAI_API_KEY;

    // 1. If OpenAI API Key is configured, attempt server-side OpenAI LLM completion
    if (apiKey) {
      try {
        const systemPrompt = getVerifiedPortfolioContext();

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...boundedMessages,
            ],
            temperature: 0.2,
            max_tokens: 600,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const assistantReply =
            data.choices?.[0]?.message?.content ||
            generatePortfolioFallbackResponse(userQuery);

          return NextResponse.json({
            message: assistantReply,
            source: "openai",
          });
        }
      } catch {
        // Fallback gracefully without leaking error
      }
    }

    // 2. Fallback Response (when API Key is not set or call fails)
    const fallbackResponse = generatePortfolioFallbackResponse(userQuery);

    return NextResponse.json({
      message: fallbackResponse,
      source: "portfolio-data",
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process AI request at this time." },
      { status: 500 }
    );
  }
}
