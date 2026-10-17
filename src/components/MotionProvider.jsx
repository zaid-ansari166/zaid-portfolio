"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The site's single motion controller (no animation libraries):
 *  - reveals [data-reveal] elements once when they enter the viewport (IntersectionObserver)
 *  - magnetic nudge (≤ 5px) for [data-magnetic] buttons on fine pointers — moves the inner label only
 * Reduced motion: reveals happen instantly (CSS) and the magnetic effect is disabled.
 */
export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("js", "motion-ready");

    const revealNow = (el) => el.classList.add("is-in");
    const pending = () => document.querySelectorAll("[data-reveal]:not(.is-in)");

    if (!("IntersectionObserver" in window)) {
      pending().forEach(revealNow);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // reveal when in view, or if the element is already above the viewport (deep links, back navigation)
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            revealNow(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    const observe = (root) => {
      const nodes = root.querySelectorAll ? root.querySelectorAll("[data-reveal]:not(.is-in)") : [];
      nodes.forEach((el) => io.observe(el));
      if (root.matches && root.matches("[data-reveal]:not(.is-in)")) io.observe(root);
    };
    observe(document.body);

    // client-side navigation / late content: observe nodes added later
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach((n) => n.nodeType === 1 && observe(n)));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // safety net: anything in the viewport that somehow never intersected becomes visible after 2.5s
    const safety = window.setTimeout(() => {
      pending().forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) revealNow(el);
      });
    }, 2500);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(safety);
    };
  }, [pathname]);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return undefined;

    const MAX = 5;
    let current = null;
    let label = null;

    const reset = () => {
      if (label) label.style.transform = "";
      current = null;
      label = null;
    };

    const onMove = (e) => {
      const el = e.target && e.target.closest ? e.target.closest("[data-magnetic]") : null;
      if (!el) {
        if (current) reset();
        return;
      }
      if (el !== current) {
        reset();
        current = el;
        label = el.querySelector(".btn-label") || el.firstElementChild;
      }
      if (!label) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
      const x = Math.max(-MAX, Math.min(MAX, dx));
      const y = Math.max(-MAX, Math.min(MAX, dy));
      label.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    };

    const onLeave = (e) => {
      if (current && e.target === current) reset();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
      reset();
    };
  }, []);

  return null;
}
