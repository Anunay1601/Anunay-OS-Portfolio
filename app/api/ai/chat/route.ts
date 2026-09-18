import { NextResponse } from "next/server";
import { getVerifiedPortfolioContext } from "@/lib/ai/portfolioContext";
import { generatePortfolioFallbackResponse } from "@/lib/ai/fallbackEngine";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request payload: messages array is required." },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
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
              ...messages.map((m: any) => ({
                role: m.role === "assistant" ? "assistant" : "user",
                content: m.content,
              })),
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
      } catch (err) {
        console.warn("OpenAI API call failed, using verified portfolio fallback:", err);
      }
    }

    // 2. Fallback Response (when API Key is not set or call fails)
    const fallbackResponse = generatePortfolioFallbackResponse(userQuery);

    return NextResponse.json({
      message: fallbackResponse,
      source: "portfolio-data",
    });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error processing AI request." },
      { status: 500 }
    );
  }
}
