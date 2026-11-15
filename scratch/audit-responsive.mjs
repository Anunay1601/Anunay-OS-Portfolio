import { spawn } from "node:child_process";
import fs from "node:fs";

const OUT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\responsive-audit";
const PROFILE_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\0108860f-acfb-4ca9-8b0a-a937aad461c9\\scratch\\chrome-prof-audit";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

fs.rmSync(PROFILE_DIR, { recursive: true, force: true });
fs.mkdirSync(PROFILE_DIR, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const VIEWPORTS = [
  { name: "mobile-360", width: 360, height: 800, isMobile: true, deviceScaleFactor: 2 },
  { name: "mobile-390", width: 390, height: 844, isMobile: true, deviceScaleFactor: 3 },
  { name: "tablet-768", width: 768, height: 1024, isMobile: false, deviceScaleFactor: 2 },
  { name: "tablet-1024", width: 1024, height: 768, isMobile: false, deviceScaleFactor: 2 },
  { name: "laptop-1280", width: 1280, height: 800, isMobile: false, deviceScaleFactor: 1 },
  { name: "laptop-1366", width: 1366, height: 768, isMobile: false, deviceScaleFactor: 1 },
  { name: "desktop-1920", width: 1920, height: 1080, isMobile: false, deviceScaleFactor: 1 }
];

async function run() {
  const chrome = spawn(
    CHROME_PATH,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--remote-debugging-port=9244",
      `--user-data-dir=${PROFILE_DIR}`,
      "about:blank"
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      try {
        const r = await fetch("http://127.0.0.1:9244/json/list");
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
    const consoleErrors = [];

    ws.onmessage = (evt) => {
      const m = JSON.parse(evt.data);
      if (m.id && pending.has(m.id)) {
        const p = pending.get(m.id);
        pending.delete(m.id);
        p.resolve(m.result);
      } else if (m.method === "Runtime.exceptionThrown") {
        consoleErrors.push("EXCEPTION: " + m.params.exceptionDetails?.text);
      } else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
        consoleErrors.push("CONSOLE_ERROR: " + m.params.args.map((a) => a.value || a.description).join(" "));
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

    const auditResults = [];

    for (const vp of VIEWPORTS) {
      console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);

      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.deviceScaleFactor,
        mobile: vp.isMobile
      });

      // 1. Audit Home Page
      await send("Page.navigate", { url: "http://localhost:3000/" });
      await sleep(1500);

      const homeEval = await send("Runtime.evaluate", {
        expression: `(() => {
          const docW = document.documentElement.scrollWidth;
          const bodyW = document.body.scrollWidth;
          const winW = window.innerWidth;
          const hasOverflow = docW > winW || bodyW > winW;
          
          let offending = [];
          if (hasOverflow) {
            document.querySelectorAll('*').forEach(el => {
              const r = el.getBoundingClientRect();
              if (r.right > winW + 1.5) {
                offending.push({
                  tag: el.tagName,
                  className: (el.className || '').toString().slice(0, 80),
                  right: Math.round(r.right),
                  width: Math.round(r.width),
                  text: (el.innerText || '').slice(0, 40)
                });
              }
            });
          }

          const navButton = document.querySelector('button[aria-label="Toggle Navigation Menu"]');
          const isNavButtonVisible = navButton ? window.getComputedStyle(navButton).display !== 'none' : false;

          const aiButton = document.querySelector('button[aria-label="Toggle ANUNAY AI Assistant"]');
          const aiBtnRect = aiButton ? aiButton.getBoundingClientRect() : null;

          return {
            docW,
            winW,
            hasOverflow,
            offendingCount: offending.length,
            offending: offending.slice(0, 5),
            isNavButtonVisible,
            aiBtnRight: aiBtnRect ? Math.round(aiBtnRect.right) : null
          };
        })()`,
        returnByValue: true
      });

      const homeShot = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\home-${vp.name}.png`, Buffer.from(homeShot.data, "base64"));

      // 2. Audit OS Page
      await send("Page.navigate", { url: "http://localhost:3000/os" });
      await sleep(1500);

      const osEval = await send("Runtime.evaluate", {
        expression: `(() => {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          const winH = window.innerHeight;
          const hasOverflow = docW > winW;

          const dock = document.querySelector('nav[aria-label="ANUNAY OS Application Dock"]');
          const dockRect = dock ? dock.getBoundingClientRect() : null;
          const dockOverflow = dockRect ? (dockRect.right > winW || dockRect.left < 0) : false;

          const topbar = document.querySelector('header');
          const topbarRect = topbar ? topbar.getBoundingClientRect() : null;

          const openWindowEl = document.querySelector('div[role="dialog"]');
          const winRect = openWindowEl ? openWindowEl.getBoundingClientRect() : null;

          return {
            winW,
            winH,
            hasOverflow,
            dockRect: dockRect ? { width: Math.round(dockRect.width), right: Math.round(dockRect.right), left: Math.round(dockRect.left) } : null,
            dockOverflow,
            windowRect: winRect ? {
              x: Math.round(winRect.x),
              y: Math.round(winRect.y),
              width: Math.round(winRect.width),
              height: Math.round(winRect.height),
              exceedsW: (winRect.x + winRect.width) > winW,
              exceedsH: (winRect.y + winRect.height) > winH
            } : null
          };
        })()`,
        returnByValue: true
      });

      const osShot = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\os-${vp.name}.png`, Buffer.from(osShot.data, "base64"));

      // 3. Audit Resume Page
      await send("Page.navigate", { url: "http://localhost:3000/resume" });
      await sleep(1200);

      const resumeEval = await send("Runtime.evaluate", {
        expression: `(() => {
          const docW = document.documentElement.scrollWidth;
          const winW = window.innerWidth;
          const hasOverflow = docW > winW;
          return { winW, docW, hasOverflow };
        })()`,
        returnByValue: true
      });

      const resumeShot = await send("Page.captureScreenshot", { format: "png" });
      fs.writeFileSync(`${OUT_DIR}\\resume-${vp.name}.png`, Buffer.from(resumeShot.data, "base64"));

      auditResults.push({
        viewport: vp.name,
        width: vp.width,
        height: vp.height,
        home: homeEval.result ? homeEval.result.value : homeEval,
        os: osEval.result ? osEval.result.value : osEval,
        resume: resumeEval.result ? resumeEval.result.value : resumeEval
      });
    }

    fs.writeFileSync(`${OUT_DIR}\\audit-report.json`, JSON.stringify(auditResults, null, 2));
    console.log("\n================ FULL AUDIT REPORT ================");
    console.log(JSON.stringify(auditResults, null, 2));
    console.log("Console Errors during audit:", consoleErrors);

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
