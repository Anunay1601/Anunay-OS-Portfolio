import { spawn } from "node:child_process";
import fs from "node:fs";

const OUT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\sections-audit";
const PROFILE_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\chrome-prof-sections";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
fs.mkdirSync(PROFILE_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800, isMobile: true },
  { name: "tablet-768", width: 768, height: 1024, isMobile: false },
  { name: "laptop-1280", width: 1280, height: 800, isMobile: false },
  { name: "desktop-1920", width: 1920, height: 1080, isMobile: false }
];

async function run() {
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--remote-debugging-port=9255",
      `--user-data-dir=${PROFILE_DIR}`,
      "about:blank"
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      try {
        const r = await fetch("http://127.0.0.1:9255/json/list");
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

    for (const vp of VIEWPORTS) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.isMobile
      });

      await send("Page.navigate", { url: "http://localhost:3000/" });
      await sleep(1500);

      // Section 1: OS Reveal
      await send("Runtime.evaluate", {
        expression: `document.getElementById('os-reveal')?.scrollIntoView({ behavior: 'instant' })`
      });
      await sleep(500);
      const shotOSReveal = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\${vp.name}-os-reveal.png`, Buffer.from(shotOSReveal.data, "base64"));

      // Section 2: Projects
      await send("Runtime.evaluate", {
        expression: `document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' })`
      });
      await sleep(500);
      const shotProjects = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\${vp.name}-projects.png`, Buffer.from(shotProjects.data, "base64"));

      // Section 3: Technical Stack
      await send("Runtime.evaluate", {
        expression: `document.getElementById('skills')?.scrollIntoView({ behavior: 'instant' })`
      });
      await sleep(500);
      const shotSkills = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\${vp.name}-skills.png`, Buffer.from(shotSkills.data, "base64"));

      // Section 4: Experience
      await send("Runtime.evaluate", {
        expression: `document.getElementById('experience')?.scrollIntoView({ behavior: 'instant' })`
      });
      await sleep(500);
      const shotExp = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\${vp.name}-experience.png`, Buffer.from(shotExp.data, "base64"));

      // Section 5: Footer
      await send("Runtime.evaluate", {
        expression: `document.querySelector('footer')?.scrollIntoView({ behavior: 'instant' })`
      });
      await sleep(500);
      const shotFooter = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\${vp.name}-footer.png`, Buffer.from(shotFooter.data, "base64"));

      // Measure any overflow or issues on this viewport
      const checkEval = await send("Runtime.evaluate", {
        expression: `(() => {
          const elements = Array.from(document.querySelectorAll('*'));
          const overflowing = [];
          for (const el of elements) {
            const rect = el.getBoundingClientRect();
            if (rect.right > window.innerWidth + 1) {
              overflowing.push({
                tag: el.tagName,
                class: (el.className || '').toString().slice(0, 50),
                right: Math.round(rect.right),
                winW: window.innerWidth
              });
            }
          }
          return {
            winW: window.innerWidth,
            docW: document.documentElement.scrollWidth,
            overflowCount: overflowing.length,
            sample: overflowing.slice(0, 3)
          };
        })()`,
        returnByValue: true
      });
      console.log(`Measured ${vp.name}:`, JSON.stringify(checkEval.result.value));
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
