import { spawn } from "node:child_process";
import fs from "node:fs";

const PROFILE_DIR = "C:\\Users\\acer\\OneDrive\\Desktop\\anunay-os\\scratch\\chrome-test-prof";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
fs.mkdirSync(PROFILE_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function testPage(url) {
  console.log(`\nTesting ${url}...`);
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--remote-debugging-port=9299",
      `--user-data-dir=${PROFILE_DIR}`,
      url,
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      try {
        const r = await fetch("http://127.0.0.1:9299/json/list");
        if (r.ok) {
          targets = await r.json();
          break;
        }
      } catch {}
      await sleep(300);
    }

    if (!targets || targets.length === 0) {
      console.log("No targets found");
      return;
    }

    const t = targets.find((x) => x.type === "page") || targets[0];
    const ws = new WebSocket(t.webSocketDebuggerUrl);

    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    const consoleLogs = [];
    const errors = [];

    let id = 1;
    function send(method, params = {}) {
      ws.send(JSON.stringify({ id: id++, method, params }));
    }

    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === "Runtime.consoleAPICalled") {
        const text = msg.params.args.map((a) => a.value || a.description).join(" ");
        consoleLogs.push(`[${msg.params.type}] ${text}`);
      }
      if (msg.method === "Runtime.exceptionThrown") {
        errors.push(msg.params.exceptionDetails.text + " " + (msg.params.exceptionDetails.exception?.description || ""));
      }
    };

    send("Runtime.enable");
    send("Page.enable");

    // Wait 4 seconds for page to hydrate and execute scripts
    await sleep(4000);

    console.log(`Page: ${url}`);
    console.log(`Exceptions found: ${errors.length}`);
    if (errors.length > 0) {
      errors.forEach((e) => console.error("EXCEPTION:", e));
    }
    console.log(`Console logs: ${consoleLogs.length}`);
    consoleLogs.slice(-10).forEach((l) => console.log("LOG:", l));

    ws.close();
  } finally {
    chrome.kill();
  }
}

async function run() {
  await testPage("http://localhost:3001/");
  await testPage("http://localhost:3001/os");
}

run().catch(console.error);
