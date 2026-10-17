"use client";
import { useEffect, useState } from "react";

const MINUTE = 60000;

/** "HH:MM IST" for an IANA time zone. Assembled from formatToParts so the output is stable across engines. */
function formatClock(timeZone, date) {
  const parts = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
    timeZoneName: "short",
  }).formatToParts(date);
  const part = (type) => (parts.find((p) => p.type === type) || {}).value;
  let hour = part("hour");
  if (hour === "24") hour = "00"; // some engines print midnight as 24 when hour12 is false
  const minute = part("minute");
  const zone = part("timeZoneName");
  if (!hour || !minute) return null;
  return zone ? `${hour}:${minute} ${zone}` : `${hour}:${minute}`;
}

/**
 * The current time in `timeZone`, e.g. "14:05 IST". Renders nothing on the server and until mounted (no
 * hydration mismatch), then updates on every minute boundary. `prefix` (e.g. " · ") only appears with the time.
 */
export default function LocalTime({ timeZone, prefix = "", className = "" }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    let interval = 0;
    // first update exactly on the next minute, then once a minute; re-sync when the tab returns (background timers throttle)
    const align = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, MINUTE);
    }, MINUTE - (Date.now() % MINUTE));
    const onVisibility = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(align);
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!now) return null;

  let text = null;
  try {
    text = formatClock(timeZone, now);
  } catch {
    text = null; // unknown zone or no Intl support: show nothing rather than a wrong time
  }
  if (!text) return null;

  return (
    <>
      {prefix}
      <time dateTime={now.toISOString()} className={`tabular ${className}`.trim()}>
        {text}
      </time>
    </>
  );
}
