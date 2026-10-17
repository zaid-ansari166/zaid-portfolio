import Link from "next/link";
import { siteConfig } from "@/content/site";

/**
 * Typographic wordmark: crop-mark monogram "ZA" (decorative) + the name in Plus Jakarta Sans.
 * The name is always in the DOM so the link's accessible name is the visible name; with showName="sm" it is
 * visually hidden below 640px (sr-only) instead of removed, which keeps the name and the visible text in sync.
 */
export default function Wordmark({ className = "", showName = true }) {
  const nameClass = showName === "sm" ? "wordmark__name max-sm:sr-only" : "wordmark__name";
  return (
    <Link href="/" className={`wordmark ${className}`}>
      <span className="wordmark__mark" aria-hidden="true">
        ZA
      </span>
      {showName ? <span className={nameClass}>{siteConfig.name}</span> : <span className="sr-only">{siteConfig.name}</span>}
    </Link>
  );
}
