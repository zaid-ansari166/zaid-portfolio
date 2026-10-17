"use client";
import { useEffect, useRef } from "react";

/**
 * The world: a fixed canvas behind every section — deep navy, a faint dot grid, a sparse seeded starfield and
 * three slow routes with small square stations and cyan "packets" travelling along them. Seeded, so it is
 * identical on every visit. 30 fps; a single static frame under 760px, with reduced motion or data saver.
 * Light surfaces are opaque, so the world shows only through the hero, the dark "windows" and the footer.
 */
export default function World() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = navigator.connection;
    const STATIC = reduce || window.innerWidth < 760 || Boolean(conn && conn.saveData);

    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let routes = [];
    let stars = [];
    let raf = null;
    let last = 0;

    // mulberry32 — the same world on every visit
    const rng = (seed) => () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    function layout() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const rand = rng(20160805);
      routes = [];
      const bands = [0.22, 0.52, 0.8];
      for (let r = 0; r < 3; r += 1) {
        const y0 = H * bands[r] + (rand() - 0.5) * 60;
        const pts = [];
        const steps = 90;
        const amp = 40 + rand() * 70;
        const phase = rand() * Math.PI * 2;
        for (let i = 0; i <= steps; i += 1) {
          const x = (i / steps) * (W + 240) - 120;
          const y = y0 + Math.sin((i / steps) * Math.PI * 2 + phase) * amp;
          pts.push([x, y]);
        }
        const nodes = [0.18, 0.5, 0.82].map((f) => pts[Math.round(f * steps)]);
        routes.push({
          pts,
          nodes,
          packets: [
            { p: rand(), v: 0.000018 + rand() * 0.00001 },
            { p: rand(), v: 0.000018 + rand() * 0.00001 },
          ],
        });
      }

      // sparse static stars — most of the "sky" is the rocket's particles, this only gives it depth
      const srand = rng(19770625);
      const count = Math.round((W * H) / 11000);
      stars = [];
      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: srand() * W,
          y: srand() * H,
          s: 1 + srand() * 0.7,
          a: 0.06 + srand() * 0.18,
          c: srand() < 0.2,
        });
      }
    }

    function draw(dt) {
      ctx.fillStyle = "#0b0f19";
      ctx.fillRect(0, 0, W, H);

      // dot grid
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      for (let gx = 28; gx < W; gx += 56) {
        for (let gy = 28; gy < H; gy += 56) ctx.fillRect(gx, gy, 1.4, 1.4);
      }

      // stars
      for (let i = 0; i < stars.length; i += 1) {
        const st = stars[i];
        ctx.fillStyle = st.c ? `rgba(34,211,238,${st.a + 0.08})` : `rgba(255,255,255,${st.a})`;
        ctx.fillRect(st.x, st.y, st.s, st.s);
      }

      routes.forEach((rt) => {
        // route
        ctx.strokeStyle = "rgba(47,94,255,0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        rt.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
        ctx.stroke();

        // stations
        ctx.strokeStyle = "rgba(47,94,255,0.38)";
        rt.nodes.forEach((n) => ctx.strokeRect(n[0] - 4, n[1] - 4, 8, 8));

        // packets: constant speed, short cyan trail
        rt.packets.forEach((pk) => {
          if (!STATIC) pk.p = (pk.p + pk.v * dt) % 1;
          const idx = pk.p * (rt.pts.length - 1);
          const i0 = Math.floor(idx);
          const f = idx - i0;
          const a = rt.pts[i0];
          const b = rt.pts[Math.min(i0 + 1, rt.pts.length - 1)];
          const x = a[0] + (b[0] - a[0]) * f;
          const y = a[1] + (b[1] - a[1]) * f;
          const t0 = Math.max(0, i0 - 7);
          const grad = ctx.createLinearGradient(rt.pts[t0][0], rt.pts[t0][1], x, y);
          grad.addColorStop(0, "rgba(34,211,238,0)");
          grad.addColorStop(1, "rgba(34,211,238,0.55)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(rt.pts[t0][0], rt.pts[t0][1]);
          for (let j = t0 + 1; j <= i0; j += 1) ctx.lineTo(rt.pts[j][0], rt.pts[j][1]);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.fillStyle = "rgba(34,211,238,0.9)";
          ctx.fillRect(x - 2, y - 2, 4, 4);
        });
      });
    }

    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (ts - last < 33) return; // ~30 fps
      const dt = last ? Math.min(ts - last, 100) : 16;
      last = ts;
      draw(dt);
    }

    layout();
    draw(0);

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf && !STATIC) {
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    let resizeT = 0;
    const onResize = () => {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        layout();
        draw(0);
      }, 200);
    };

    if (!STATIC) {
      raf = requestAnimationFrame(loop);
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeT);
    };
  }, []);

  return <canvas ref={ref} className="world" aria-hidden="true" />;
}
