"use client";
import { useEffect, useRef } from "react";

/**
 * The hero constellation: one pool of particles that assembles, holds, disperses and re-forms into each scene —
 * by default the name "ZAID / ANSARI" and then "AI & / FULL-STACK / DEVELOPER" — each rendered in the display
 * font and sampled into a dot-matrix. Scenes run 14 s (form 4 s → hold 6.5 s → disperse 2.5 s → rest 1 s).
 * Seeded, so it is identical on every visit; pointer parallax on fine pointers; with reduced motion the first
 * scene is drawn formed and still. Canvas 2D, no libraries. The lines come from src/content/profile.js.
 */
const SCENE = 14; // seconds per scene
const FORM = 4;
const HOLD_END = 10.5;
const DISPERSE_END = 13;

function formedness(c) {
  if (c < FORM) {
    const u = c / FORM;
    return u * u * (3 - 2 * u);
  }
  if (c < HOLD_END) return 1;
  if (c < DISPERSE_END) {
    const v = 1 - (c - HOLD_END) / (DISPERSE_END - HOLD_END);
    return v * v * (3 - 2 * v);
  }
  return 0;
}

/** Normalised dot-matrix points of the opaque pixels in `data` (FW×FH), sampled every `step` px. */
function samplePoints(data, FW, FH, step) {
  let x0 = FW;
  let x1 = 0;
  let y0 = FH;
  let y1 = 0;
  for (let y = 0; y < FH; y += 2) {
    for (let x = 0; x < FW; x += 2) {
      if (data[(y * FW + x) * 4 + 3] > 100) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  const S = Math.max(x1 - x0, y1 - y0) || 1; // one factor for both axes keeps proportions exact
  const mx = (x0 + x1) / 2;
  const my = (y0 + y1) / 2;
  const pts = [];
  for (let y = y0; y <= y1; y += step) {
    for (let x = x0; x <= x1; x += step) {
      if (data[(y * FW + x) * 4 + 3] > 100) pts.push([(x - mx) / S, (y - my) / S]);
    }
  }
  return pts;
}

export default function Constellation({ scenes: sceneLines = [["ZAID", "ANSARI"], ["AI &", "FULL-STACK", "DEVELOPER"]] }) {
  const ref = useRef(null);
  const linesRef = useRef(sceneLines);
  linesRef.current = sceneLines;

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas && canvas.parentElement;
    if (!canvas || !host) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let small = false;
    let scenes = []; // { pts, size, ax, ay }
    let parts = [];
    let raf = null;
    let visible = true;
    let last = 0;
    let sky = 300;
    let disposed = false;
    const par = { x: 0, y: 0, tx: 0, ty: 0 };

    let seed = 20160805;
    const rand = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    const textSize = () => (small ? Math.min(W * 0.96, 380) : Math.min(W * 0.4, 600));

    // on-screen width of each scene and where it sits (right-aligned backdrop on desktop, centred band on phones)
    function layout() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const r = host.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      small = W < 980;
      sky = small ? H : Math.min(W, H) * 0.6;
      const size = textSize();
      scenes.forEach((sc) => {
        sc.size = size;
        sc.ax = small ? W * 0.5 : W - size / 2 - 24; // 24px keeps the parallax shift inside the canvas
        sc.ay = small ? H * 0.5 : H * 0.42;
      });
    }

    function buildText(lines, family) {
      const FW = 900;
      const FH = 600;
      const off = document.createElement("canvas");
      off.width = FW;
      off.height = FH;
      const o = off.getContext("2d");
      const font = (px) => `700 ${px}px ${family}`;
      o.font = font(100);
      const widest = Math.max(...lines.map((l) => o.measureText(l).width)) || 1;
      const px = Math.min(100 * (820 / widest), 520 / (lines.length * 1.08));
      o.font = font(px);
      o.fillStyle = "#fff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      const lh = px * 1.08;
      const top = FH / 2 - ((lines.length - 1) * lh) / 2;
      lines.forEach((l, i) => o.fillText(l, FW / 2, top + i * lh));
      const data = o.getImageData(0, 0, FW, FH).data;
      // dots ~4.5px apart on screen (6px on small screens → fewer particles)
      const step = Math.max(3, Math.round(((small ? 6 : 4.5) * 820) / textSize()));
      return { pts: samplePoints(data, FW, FH, step) };
    }

    function buildParticles() {
      const n = Math.max(...scenes.map((s) => s.pts.length));
      seed = 20160805;
      parts = [];
      for (let i = 0; i < n; i += 1) {
        const cyan = rand() < 0.14;
        const ang = rand() * Math.PI * 2;
        const dist = 0.3 + rand() * 0.95;
        parts.push({
          sx: Math.cos(ang) * dist,
          sy: Math.sin(ang) * dist * 0.8,
          size: 1.4 + rand() * 1.1,
          color: cyan ? "rgba(34,211,238," : "rgba(255,255,255,",
          alpha: cyan ? 0.88 : 0.48 + rand() * 0.3,
          shiner: rand() < 0.08,
          sf: 0.15 + rand() * 0.25,
          sp: rand() * Math.PI * 2,
          ph: (rand() - 0.5) * 1.6,
        });
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      par.x += (par.tx - par.x) * 0.06;
      par.y += (par.ty - par.y) * 0.06;
      const breathe = 1 + Math.sin(t * 0.35) * 0.06;
      const bob = Math.sin(t * 0.5) * 4;
      const dim = small ? 0.9 : 1;
      const n = scenes.length;
      for (let i = 0; i < parts.length; i += 1) {
        const p = parts[i];
        const tp = t + p.ph;
        const k = ((Math.floor(tp / SCENE) % n) + n) % n;
        const c = tp - Math.floor(tp / SCENE) * SCENE;
        const sc = scenes[k];
        const target = sc.pts[i];
        const m = target ? formedness(c) : 0;
        const ax = sc.ax + par.x;
        const ay = sc.ay + par.y + bob;
        const px = ax + p.sx * sky * (1 - m) + (target ? target[0] * sc.size * m : 0);
        const py = ay + p.sy * sky * (1 - m) + (target ? target[1] * sc.size * m : 0);
        let a = p.alpha * breathe * dim * (0.06 + 0.94 * m);
        if (p.shiner && m > 0.9) {
          const s = Math.sin(t * p.sf * 6.28 + p.sp);
          if (s > 0.93) a = Math.min(1, a + (s - 0.93) * 10);
        }
        if (a < 0.015) continue;
        ctx.fillStyle = p.color + a.toFixed(3) + ")";
        ctx.fillRect(px, py, p.size, p.size);
      }
    }

    function loop(ts) {
      raf = visible ? requestAnimationFrame(loop) : null;
      if (ts - last < 33) return;
      last = ts;
      draw(ts / 1000);
    }

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      par.tx = ((e.clientX - r.left) / r.width - 0.5) * 18;
      par.ty = ((e.clientY - r.top) / r.height - 0.5) * 12;
    };
    const onLeave = () => {
      par.tx = 0;
      par.ty = 0;
    };

    let io = null;
    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        layout();
        if (reduce) draw(FORM + 1);
      }, 200);
    };

    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() ||
      '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif';
    const ready = async () => {
      try {
        if (document.fonts) {
          await document.fonts.load(`700 100px ${family}`);
          await document.fonts.ready;
        }
      } catch (e) {
        /* fall back to whatever the canvas has */
      }
    };

    ready().then(() => {
      if (disposed) return;
      layout();
      scenes = linesRef.current.filter((l) => Array.isArray(l) && l.length).map((lines) => buildText(lines, family));
      if (!scenes.length) return;
      layout();
      buildParticles();
      if (reduce) {
        draw(FORM + 1); // first scene, formed and still
        window.addEventListener("resize", onResize);
        return;
      }
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            visible = en.isIntersecting;
            if (visible && !raf) raf = requestAnimationFrame(loop);
          });
        });
        io.observe(host);
      }
      raf = requestAnimationFrame(loop);
      window.addEventListener("resize", onResize);
      if (fine) {
        host.addEventListener("pointermove", onMove, { passive: true });
        host.addEventListener("pointerleave", onLeave, { passive: true });
      }
    });

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (io) io.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeT);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero__rocket" aria-hidden="true" />;
}
