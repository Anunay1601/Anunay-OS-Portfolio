// Comprehensive Contact API Test Suite

const BASE_URL = process.env.TEST_URL || "http://127.0.0.1:3005";

async function runTests() {
  console.log("=== STARTING CONTACT FORM API TEST SUITE ===");
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

  // Test 1: Empty Fields
  await testCase("Reject empty fields", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    if (!data.error.includes("Name is required")) throw new Error(`Unexpected error message: ${data.error}`);
  });

  // Test 2: Missing email
  await testCase("Reject missing email", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Alex Test" }),
    });
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    if (!data.error.includes("Email is required")) throw new Error(`Unexpected error message: ${data.error}`);
  });

  // Test 3: Invalid email syntax
  await testCase("Reject invalid email address", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Alex Test",
        email: "not-a-valid-email",
        message: "This is a legitimate message length for testing.",
      }),
    });
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    if (!data.error.includes("valid email")) throw new Error(`Unexpected error message: ${data.error}`);
  });

  // Test 4: Message too short (< 10 chars)
  await testCase("Reject message that is too short", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Alex Test",
        email: "alex@example.com",
        message: "Hi!",
      }),
    });
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    if (!data.error.includes("between 10 and 5000 characters")) throw new Error(`Unexpected error message: ${data.error}`);
  });

  // Test 5: Honeypot detection
  await testCase("Honeypot detection stops bot submissions", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Spam Bot 3000",
        email: "spambot@automated.net",
        subject: "Crypto Investment",
        message: "Buy our amazing crypto products right now please!",
        honeypot: "https://spammy-site.com",
      }),
    });
    const data = await res.json();
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
    if (!data.error.includes("Bot activity detected")) throw new Error(`Unexpected error message: ${data.error}`);
  });

  // Test 6: Graceful error when RESEND_API_KEY is not configured
  await testCase("Graceful 500 error when RESEND_API_KEY is absent without leaking internal details", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "192.168.1.101",
      },
      body: JSON.stringify({
        name: "Valid Visitor",
        email: "visitor@company.com",
        subject: "Project Inquiry",
        message: "Hello Anunay, we would like to collaborate on an open source project.",
      }),
    });
    const data = await res.json();
    if (res.status !== 500) throw new Error(`Expected status 500, got ${res.status}`);
    if (!data.error.includes("Email service is temporarily unavailable")) {
      throw new Error(`Unexpected error message: ${data.error}`);
    }
  });

  // Test 7: Rate limiting (send 5 requests from an IP, 6th should be blocked with 429)
  await testCase("Rate limiting prevents spam (triggers 429 after threshold)", async () => {
    const testIp = "10.0.0.99";
    const payload = {
      name: "Rate Limit Tester",
      email: "ratelimit@example.com",
      message: "This is a repeated message to test rate limits.",
    };

    let rateLimited = false;
    for (let i = 0; i < 7; i++) {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": testIp,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 429) {
        rateLimited = true;
        const data = await res.json();
        if (!data.error.includes("Too many messages sent")) {
          throw new Error(`Unexpected rate limit message: ${data.error}`);
        }
        break;
      }
    }

    if (!rateLimited) {
      throw new Error("Rate limiting failed to trigger 429 after exceeding limit");
    }
  });

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner failed:", err);
  process.exit(1);
});
