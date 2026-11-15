import { spawn } from "node:child_process";
import fs from "node:fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PROFILE_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\chrome-prof-contact";

async function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function run() {
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--remote-debugging-port=9277",
    `--user-data-dir=${PROFILE_DIR}`,
    "about:blank"
  ]);

  await sleep(1000);
  const targets = await (await fetch("http://127.0.0.1:9277/json/list")).json();
  const t = targets.find((x) => x.type === "page") || targets[0];
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.onmessage = (evt) => {
    const m = JSON.parse(evt.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id).resolve(m.result);
      pending.delete(m.id);
    } else if (m.method === "Runtime.exceptionThrown") {
      errors.push("EXC: " + m.params.exceptionDetails?.text);
    }
  };
  const send = (method, params = {}) => new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, { resolve });
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    mobile: false
  });

  await send("Page.navigate", { url: "http://localhost:3000/os?open=contact" });
  await sleep(2500);

  const domCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const dialogs = Array.from(document.querySelectorAll('div[role="dialog"]')).map(d => ({
        label: d.getAttribute('aria-label'),
        rect: d.getBoundingClientRect(),
        opacity: window.getComputedStyle(d).opacity,
        transform: window.getComputedStyle(d).transform,
        display: window.getComputedStyle(d).display
      }));
      return {
        dialogCount: dialogs.length,
        dialogs
      };
    })()`,
    returnByValue: true
  });

  console.log("DOM CHECK:", JSON.stringify(domCheck.result.value, null, 2));
  console.log("ERRORS:", errors);

  const shot = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\contact-debug.png", Buffer.from(shot.data, "base64"));

  ws.close();
  chrome.kill();
}

run().catch(console.error);
