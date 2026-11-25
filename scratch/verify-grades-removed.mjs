import { spawn } from "node:child_process";
import fs from "node:fs";

const OUT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\grades-audit";
const PROFILE_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\chrome-prof-grades";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
fs.mkdirSync(PROFILE_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--remote-debugging-port=9311",
      `--user-data-dir=${PROFILE_DIR}`,
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      try {
        const r = await fetch("http://127.0.0.1:9311/json/list");
        if (r.ok) {
          targets = await r.json();
          break;
        }
      } catch {}
      await sleep(300);
    }
    const t = targets.find((x) => x.type === "page") || targets[0];
    const ws = new WebSocket(t.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
      ws.onopen = res;
      ws.onerror = rej;
    });

    let id = 0;
    const pending = new Map();

    ws.onmessage = (evt) => {
      const m = JSON.parse(evt.data);
      if (m.id && pending.has(m.id)) {
        const p = pending.get(m.id);
        pending.delete(m.id);
        p.resolve(m.result);
      }
    };

    const send = (method, params = {}) =>
      new Promise((resolve) => {
        const mid = ++id;
        pending.set(mid, { resolve });
        ws.send(JSON.stringify({ id: mid, method, params }));
      });

    await send("Page.enable");
    await send("Runtime.enable");

    await send("Emulation.setDeviceMetricsOverride", {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // 1. Capture Hero Section on Homepage
    await send("Page.navigate", { url: "http://localhost:3000/" });
    await sleep(2000);
    let shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\homepage-hero.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured homepage-hero.png");

    // Scroll to Education section on Homepage
    await send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.getElementById("education");
        if (el) el.scrollIntoView();
      })()`
    });
    await sleep(1000);
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\homepage-education.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured homepage-education.png");

    // 2. Capture OS System Logs Education Tab
    await send("Page.navigate", { url: "http://localhost:3000/os?open=system-logs" });
    await sleep(2000);
    // Switch to Education tab in System Logs
    await send("Runtime.evaluate", {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const eduBtn = btns.find(b => b.textContent && b.textContent.includes('Education'));
        if (eduBtn) eduBtn.click();
      })()`
    });
    await sleep(1000);
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\os-system-logs-education.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured os-system-logs-education.png");

    // 3. Capture Resume Page (Confirm CGPA and 12th percentage are still visible there)
    await send("Page.navigate", { url: "http://localhost:3000/resume" });
    await sleep(2000);
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\resume-page.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured resume-page.png");

    ws.close();
  } finally {
    try {
      chrome.kill("SIGKILL");
    } catch {}
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
