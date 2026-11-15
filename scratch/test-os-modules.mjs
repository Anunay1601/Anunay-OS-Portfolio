import { spawn } from "node:child_process";
import fs from "node:fs";

const OUT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\os-modules-audit";
const PROFILE_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\chrome-prof-modules";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
fs.mkdirSync(PROFILE_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const MODULES = [
  "project-lab",
  "terminal",
  "automation-core",
  "credential-vault",
  "contact",
  "dev-env"
];

async function run() {
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--remote-debugging-port=9266",
      `--user-data-dir=${PROFILE_DIR}`,
      "about:blank"
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      try {
        const r = await fetch("http://127.0.0.1:9266/json/list");
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

    // Test on Mobile (360x800)
    await send("Emulation.setDeviceMetricsOverride", {
      width: 360,
      height: 800,
      deviceScaleFactor: 2,
      mobile: true
    });

    for (const mod of MODULES) {
      await send("Page.navigate", { url: `http://localhost:3000/os?open=${mod}` });
      await sleep(1000);
      const shot = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\mobile-360-${mod}.png`, Buffer.from(shot.data, "base64"));
    }

    // Test on Tablet (768x1024)
    await send("Emulation.setDeviceMetricsOverride", {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: false
    });

    for (const mod of MODULES) {
      await send("Page.navigate", { url: `http://localhost:3000/os?open=${mod}` });
      await sleep(1000);
      const shot = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\tablet-768-${mod}.png`, Buffer.from(shot.data, "base64"));
    }

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
