// Direct In-Process Route Handler Test Suite
import { createRequire } from "module";
const require = createRequire(import.meta.url);

async function run() {
  console.log("=== IN-PROCESS TEST SUITE FOR POST /api/contact ===");

  const routeModule = require("../.next/server/app/api/contact/route.js");
  const POST = routeModule.routeModule?.userland?.POST || routeModule.POST;

  if (typeof POST !== "function") {
    throw new Error("POST handler not found in route module!");
  }

  let passed = 0;
  let failed = 0;

  async function testCase(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  // Test 1: Reject empty body
  await testCase("Reject empty fields", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.1",
      },
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (!data.error?.includes("Name is required")) throw new Error(`Unexpected error: ${data.error}`);
  });

  // Test 2: Missing email
  await testCase("Reject missing email", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.2",
      },
      body: JSON.stringify({ name: "Alex" }),
    });
    const res = await POST(req);
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (!data.error?.includes("Email is required")) throw new Error(`Unexpected error: ${data.error}`);
  });

  // Test 3: Invalid email
  await testCase("Reject invalid email format", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.3",
      },
      body: JSON.stringify({
        name: "Alex",
        email: "not-an-email",
        message: "Hello world testing length requirement",
      }),
    });
    const res = await POST(req);
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (!data.error?.includes("valid email")) throw new Error(`Unexpected error: ${data.error}`);
  });

  // Test 4: Message length (< 10)
  await testCase("Reject message under minimum length (< 10 characters)", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.4",
      },
      body: JSON.stringify({
        name: "Alex",
        email: "alex@example.com",
        message: "Short",
      }),
    });
    const res = await POST(req);
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (!data.error?.includes("between 10 and 5000")) throw new Error(`Unexpected error: ${data.error}`);
  });

  // Test 5: Message length (> 5000)
  await testCase("Reject message over maximum length (> 5000 characters)", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.5",
      },
      body: JSON.stringify({
        name: "Alex",
        email: "alex@example.com",
        message: "a".repeat(5001),
      }),
    });
    const res = await POST(req);
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (!data.error?.includes("between 10 and 5000")) throw new Error(`Unexpected error: ${data.error}`);
  });

  // Test 6: Honeypot detection
  await testCase("Honeypot detection stops bot submissions", async () => {
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.6",
      },
      body: JSON.stringify({
        name: "Bot",
        email: "bot@spam.com",
        message: "Spam message here for testing length",
        honeypot: "http://bot-filled-this.com",
      }),
    });
    const res = await POST(req);
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected 400, got ${res.status}`);
    if (!data.error?.includes("Bot activity detected")) throw new Error(`Unexpected error: ${data.error}`);
  });

  // Test 7: Rate limiting per IP
  await testCase("Rate limiting rejects 6th request with 429", async () => {
    const ip = "10.0.0.7";
    let hitRateLimit = false;

    for (let i = 0; i < 7; i++) {
      const req = new Request("http://localhost/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": ip,
        },
        body: JSON.stringify({
          name: `User ${i}`,
          email: "user@example.com",
          message: "Testing rate limit threshold message",
        }),
      });
      const res = await POST(req);
      if (res.status === 429) {
        hitRateLimit = true;
        const data = await res.json();
        if (!data.error?.includes("Too many messages sent")) {
          throw new Error(`Unexpected rate limit error message: ${data.error}`);
        }
        break;
      }
    }

    if (!hitRateLimit) throw new Error("Rate limiting did not trigger 429");
  });

  // Test 8: API failure handling when RESEND_API_KEY is not set
  await testCase("Graceful 500 error when RESEND_API_KEY is missing (no stack leaks)", async () => {
    delete process.env.RESEND_API_KEY;
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "10.0.0.8",
      },
      body: JSON.stringify({
        name: "Valid Visitor",
        email: "visitor@example.com",
        subject: "Collaboration",
        message: "Hello Anunay, this is a valid collaboration inquiry.",
      }),
    });
    const res = await POST(req);
    const data = await res.json();
    if (res.status !== 500) throw new Error(`Expected 500, got ${res.status}`);
    if (!data.error?.includes("Email service is temporarily unavailable")) {
      throw new Error(`Unexpected error message: ${data.error}`);
    }
  });

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
}

run().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
