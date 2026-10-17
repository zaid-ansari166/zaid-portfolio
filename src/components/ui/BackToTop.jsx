"use client";
import { IconArrowUp } from "./Icons";

export default function BackToTop({ className = "" }) {
  const onClick = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    const target = document.querySelector(".wordmark");
    if (target) target.focus({ preventScroll: true });
  };
  return (
    <button type="button" className={`btn btn-secondary btn-sm ${className}`} onClick={onClick}>
      <span className="btn-label">
        <span>Back to top</span>
        <IconArrowUp size={16} />
      </span>
    </button>
  );
}
