"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { IconCheck, IconCopy } from "@/components/ui/Icons";

const RESET_MS = 2000;

/**
 * The email address, large, as a mailto link — with a one-tap "Copy" beside it.
 * Clipboard API first; without it (insecure context, denied permission, old browser) the address is selected
 * so a keyboard copy works. A visually hidden live region announces the outcome.
 */
export default function CopyEmail({ email, className = "" }) {
  const [copied, setCopied] = useState(false);
  const [announce, setAnnounce] = useState("");
  const linkRef = useRef(null);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const announceFor = (message, didCopy) => {
    setCopied(didCopy);
    setAnnounce(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setCopied(false);
      setAnnounce("");
    }, RESET_MS);
  };

  const selectAddress = () => {
    const node = linkRef.current;
    if (!node || !window.getSelection || !document.createRange) return false;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  };

  const onCopy = async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(email);
      announceFor("Email copied", true);
    } catch {
      // Fallback: select the address; try the legacy copy command, and leave the selection in place either way.
      let done = false;
      if (selectAddress()) {
        try {
          done = document.execCommand("copy");
        } catch {
          done = false;
        }
      }
      if (done) announceFor("Email copied", true);
      else announceFor("Email address selected. Copy it with your keyboard.", false);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`.trim()}>
      <a
        ref={linkRef}
        href={`mailto:${email}`}
        className="font-display text-[clamp(1.125rem,_0.6rem_+_1.4vw,_1.75rem)] font-medium leading-tight tracking-tight break-words"
      >
        {email}
      </a>
      <Button type="button" variant="secondary" size="sm" onClick={onCopy} className="min-h-[44px] min-w-[6.5rem]">
        <span className="inline-flex items-center gap-2">
          {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          <span>
            {copied ? (
              "Copied"
            ) : (
              <>
                Copy<span className="sr-only"> email address</span>
              </>
            )}
          </span>
        </span>
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {announce}
      </span>
    </div>
  );
}
