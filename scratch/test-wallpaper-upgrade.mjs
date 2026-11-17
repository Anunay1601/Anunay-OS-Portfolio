import { spawn } from "node:child_process";
import fs from "node:fs";

const OUT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\wallpaper-audit";
const PROFILE_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\chrome-prof-arch";
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
      "--remote-debugging-port=9299",
      `--user-data-dir=${PROFILE_DIR}`,
      "about:blank",
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

    // 1. Desktop 1920x1080 - All Windows Minimized
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await send("Page.navigate", { url: "http://localhost:3000/os" });
    await sleep(2500);

    // Close the initially open window so desktop wallpaper is in full display
    await send("Runtime.evaluate", {
      expression: `(() => {
        const closeBtn = document.querySelector('button[aria-label="Close window"]');
        if (closeBtn) closeBtn.click();
      })()`
    });
    await sleep(1500);

    let shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\desktop-digital-architecture.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured: desktop-digital-architecture.png");

    // 2. Desktop with mouse parallax position
    await send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: 1500,
      y: 400
    });
    await sleep(1000);
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\desktop-digital-architecture-parallax.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured: desktop-digital-architecture-parallax.png");

    // 3. Desktop with Terminal window open
    await send("Page.navigate", { url: "http://localhost:3000/os?open=terminal" });
    await sleep(2000);
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\desktop-digital-architecture-terminal.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured: desktop-digital-architecture-terminal.png");

    // 4. Mobile 390x844
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send("Page.navigate", { url: "http://localhost:3000/os" });
    await sleep(2000);
    await send("Runtime.evaluate", {
      expression: `(() => {
        const closeBtn = document.querySelector('button[aria-label="Close panel"]');
        if (closeBtn) closeBtn.click();
      })()`
    });
    await sleep(1500);
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\mobile-digital-architecture.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured: mobile-digital-architecture.png");

    // 5. Tablet 820x1180
    await send("Emulation.setDeviceMetricsOverride", {
      width: 820,
      height: 1180,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await send("Page.navigate", { url: "http://localhost:3000/os" });
    await sleep(2000);
    await send("Runtime.evaluate", {
      expression: `(() => {
        const closeBtn = document.querySelector('button[aria-label="Close window"]');
        if (closeBtn) closeBtn.click();
      })()`
    });
    await sleep(1500);
    shot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(`${OUT_DIR}\\tablet-digital-architecture.png`, Buffer.from(shot.data, "base64"));
    console.log("Captured: tablet-digital-architecture.png");

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
