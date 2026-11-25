import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Configuration & Constants
const RECIPIENT_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || "anunaychhapre@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "ANUNAY OS <onboarding@resend.dev>";
const MAX_NAME_LENGTH = 100;
const MIN_NAME_LENGTH = 2;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 150;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5000;

// Rate limiting: 5 requests per 10 minutes per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Basic HTML sanitization to prevent injection in email clients
function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (match) => htmlEntities[match] || match);
}

// RFC 5322 compliant email regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    // 2. Parse request body
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = body || {};

    // 3. Honeypot check for spam bots
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json(
        { error: "Bot activity detected." },
        { status: 400 }
      );
    }

    // 4. Validate Name
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }
    const cleanName = name.trim();
    if (cleanName.length < MIN_NAME_LENGTH || cleanName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // 5. Validate Email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 6. Validate Subject
    let cleanSubject = "General Inquiry";
    if (subject && typeof subject === "string") {
      const trimmedSub = subject.trim();
      if (trimmedSub.length > MAX_SUBJECT_LENGTH) {
        return NextResponse.json(
          { error: `Subject cannot exceed ${MAX_SUBJECT_LENGTH} characters.` },
          { status: 400 }
        );
      }
      if (trimmedSub.length > 0) {
        cleanSubject = trimmedSub;
      }
    }

    // 7. Validate Message
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }
    const cleanMessage = message.trim();
    if (cleanMessage.length < MIN_MESSAGE_LENGTH || cleanMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message must be between ${MIN_MESSAGE_LENGTH} and ${MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // 8. Verify Resend Configuration
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[POST /api/contact] Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email service is temporarily unavailable. Please reach out directly to anunaychhapre@gmail.com." },
        { status: 500 }
      );
    }

    // 9. Format Content
    const now = new Date();
    const submissionTime = `${now.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    })} (IST) / ${now.toUTCString()}`;

    const escapedName = escapeHtml(cleanName);
    const escapedEmail = escapeHtml(cleanEmail);
    const escapedSubject = escapeHtml(cleanSubject);
    const escapedMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

    const emailSubject = `New Portfolio Message — ${cleanSubject}`;

    const htmlBody = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.4);">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 24px; text-align: left;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
        ANUNAY OS &bull; Portfolio Message
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #bfdbfe;">
        New inquiry received via your desktop portfolio contact module
      </p>
    </div>

    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; width: 120px;">From:</td>
          <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #f8fafc;">${escapedName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8;">Email:</td>
          <td style="padding: 8px 0; font-size: 14px; color: #60a5fa;">
            <a href="mailto:${escapedEmail}" style="color: #60a5fa; text-decoration: none;">${escapedEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8;">Subject:</td>
          <td style="padding: 8px 0; font-size: 14px; color: #f8fafc; font-weight: 500;">${escapedSubject}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8;">Submitted:</td>
          <td style="padding: 8px 0; font-size: 13px; color: #cbd5e1;">${submissionTime}</td>
        </tr>
      </table>

      <div style="margin-top: 16px; border-top: 1px solid #1f2937; padding-top: 20px;">
        <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 10px;">
          Message
        </div>
        <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #e2e8f0; word-break: break-word;">
          ${escapedMessage}
        </div>
      </div>

      <div style="margin-top: 24px; padding: 12px 16px; background-color: #1e293b; border-radius: 8px; font-size: 12px; color: #94a3b8; text-align: center;">
        Tip: Hit <strong>Reply</strong> in your email client to directly reply to <span style="color: #60a5fa;">${escapedEmail}</span>.
      </div>
    </div>

    <div style="border-top: 1px solid #1f2937; padding: 16px 24px; background-color: #0a0f1d; text-align: center; font-size: 11px; color: #64748b;">
      Sent automatically from ANUNAY OS Portfolio &bull; Next.js 14 & Resend
    </div>
  </div>
</body>
</html>`;

    const plainText = `ANUNAY OS — Portfolio Message
=====================================
From: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
Submitted: ${submissionTime}

Message:
-------------------------------------
${cleanMessage}

-------------------------------------
(Replying directly to this email will reply to ${cleanEmail})`;

    // 10. Send via Resend
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [RECIPIENT_EMAIL],
      replyTo: cleanEmail,
      subject: emailSubject,
      html: htmlBody,
      text: plainText,
    });

    if (error) {
      console.error("[POST /api/contact] Resend delivery error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later or email directly." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully. I'll get back to you soon.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[POST /api/contact] Unexpected server error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
