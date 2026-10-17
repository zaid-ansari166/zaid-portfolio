import { ImageResponse } from "next/server";
import { siteConfig } from "@/content/site";

export const runtime = "edge";
export const alt = "Zaid Ansari — AI & full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tokens mirrored from src/app/globals.css (Satori cannot read CSS variables).
const BG = "#0B0F19";
const FG = "#FFFFFF";
const FG2 = "rgba(255,255,255,0.72)";
const LINE = "rgba(255,255,255,0.14)";
const ACCENT = "#22D3EE";
const ROUTE = "rgba(47,94,255,0.35)"; // route stroke
const NODE = "rgba(47,94,255,0.6)"; // hollow node squares on a route
const DOT = "rgba(255,255,255,0.10)"; // dot grid

// Copy mirrors the hero (src/content/profile.js). Kept literal here because the layout is
// tuned to these line lengths at 88px — a longer headline would overflow the 1200px canvas.
const LABEL = "Zaid Ansari — AI & full-stack developer, Indore";
const HEADLINE = [["Mobile apps, backends"], ["and", "AI features", ","], ["shipped end to end."]]; // line 2: middle part is cyan
const FOOTNOTE = "6 apps live on the stores · React Native · NestJS · LLM features";

// Host shown bottom-right: protocol and any trailing slash stripped.
const host = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/+$/, "");

// Crop-mark corner (the site's motif): a 14px L in the given corner of the chip.
const cornerBase = { position: "absolute", width: 14, height: 14 };
const cornerTopLeft = { ...cornerBase, top: 0, left: 0, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}` };
const cornerBottomRight = { ...cornerBase, bottom: 0, right: 0, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}` };

/* ------------------------------------------------------------------------------------------ */
/* World: the site's fixed background canvas (src/components/fx/World.jsx) reduced to a still. */
/* A dot grid, two sinusoidal routes, two hollow node squares and one cyan packet per route.   */
/* Drawn as ONE inline <svg> so Satori rasterises it as a single image however many shapes it  */
/* holds. Attributes are kebab-case because Satori copies SVG props verbatim. Shared with the  */
/* project cards (src/app/work/[slug]/opengraph-image.js).                                     */
/* ------------------------------------------------------------------------------------------ */
const { width: W, height: H } = size;
// Each route is confined to a gutter that is empty on every card (root and project): the band
// between the label row and the headline, and the band under the footer row (which also stays
// inside a 2:1 crop), so nodes and packets never land on type.
const ROUTES = [
  { base: 150, amp: 20, wave: 860, phase: 0.74, nodes: [236, 884], packet: 548 },
  { base: 592, amp: 18, wave: 1040, phase: 2.9, nodes: [128, 1012], packet: 716 },
];
const yAt = (route, x) => route.base + route.amp * Math.sin((x / route.wave) * Math.PI * 2 + route.phase);
const routePath = (route) => {
  let d = "";
  for (let x = -24; x <= W + 24; x += 16) d += `${d ? "L" : "M"}${x} ${yAt(route, x).toFixed(1)}`;
  return d;
};

export function World() {
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: 0, left: 0 }}>
      <defs>
        <pattern id="dots" width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="28" cy="28" r="1.3" fill={DOT} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#dots)" />
      {ROUTES.map((route, i) => (
        <path key={`r${i}`} d={routePath(route)} fill="none" stroke={ROUTE} stroke-width="1" />
      ))}
      {ROUTES.map((route, i) =>
        route.nodes.map((x) => (
          <rect key={`n${i}${x}`} x={x - 4} y={(yAt(route, x) - 4).toFixed(1)} width="8" height="8" fill="none" stroke={NODE} stroke-width="1" />
        ))
      )}
      {ROUTES.map((route, i) => (
        <rect key={`p${i}`} x={route.packet - 2} y={(yAt(route, route.packet) - 2).toFixed(1)} width="4" height="4" fill={ACCENT} />
      ))}
    </svg>
  );
}

// Note: the ImageResponse bundled with Next 13.4 ships Noto Sans 400 only, so the weights below
// resolve to regular unless a font is passed via the `fonts` option. No external fonts by design.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: BG,
          color: FG,
          fontFamily: "sans-serif",
        }}
      >
        <World />

        {/* Top: crop-mark chip + label (uppercase + tracked, like the site's mono labels) */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              fontSize: 18,
              fontWeight: 700,
              color: FG,
            }}
          >
            <div style={cornerTopLeft} />
            <div style={cornerBottomRight} />
            <span>ZA</span>
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 2.4, textTransform: "uppercase", color: FG2 }}>{LABEL}</div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 0.98,
            letterSpacing: -3,
            color: FG,
          }}
        >
          <div style={{ display: "flex" }}>{HEADLINE[0][0]}</div>
          <div style={{ display: "flex" }}>
            <span>{HEADLINE[1][0]}</span>
            <span style={{ color: ACCENT, marginLeft: 22 }}>{HEADLINE[1][1]}</span>
            <span>{HEADLINE[1][2]}</span>
          </div>
          <div style={{ display: "flex" }}>{HEADLINE[2][0]}</div>
        </div>

        {/* Bottom: rule + footnote / host */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", height: 1, backgroundColor: LINE, marginBottom: 24 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 22,
              color: FG2,
            }}
          >
            <div style={{ display: "flex" }}>{FOOTNOTE}</div>
            <div style={{ display: "flex" }}>{host}</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
