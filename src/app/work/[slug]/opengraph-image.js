import { ImageResponse } from "next/server";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";
import { World } from "../../opengraph-image";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `Project case study — ${siteConfig.name}`;

// Satori has no CSS variables; these mirror the tokens in globals.css.
const BG = "#0B0F19";
const FG = "#FFFFFF";
const FG2 = "rgba(255,255,255,0.72)";
const LINE = "rgba(255,255,255,0.2)"; // tag pill borders
const ACCENT = "#22D3EE";

/** One L-shaped crop-mark corner (the site motif): top-left or bottom-right. */
const corner = (pos) => ({
  position: "absolute",
  width: 16,
  height: 16,
  ...(pos === "tl"
    ? { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2, borderTopStyle: "solid", borderLeftStyle: "solid", borderTopColor: ACCENT, borderLeftColor: ACCENT }
    : { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2, borderBottomStyle: "solid", borderRightStyle: "solid", borderBottomColor: ACCENT, borderRightColor: ACCENT }),
});

export default async function Image({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  const name = project ? project.name : siteConfig.name;
  const tagline = project ? project.tagline : siteConfig.role;
  const index = project ? project.index : "ZA";
  const tags = project && Array.isArray(project.tags) ? project.tags.slice(0, 5) : [];
  const host = siteConfig.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

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
        {/* the site's background world (dot grid + routes), shared with the root card */}
        <World />

        {/* top: crop-mark chip with the project index + label */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 84, height: 60 }}>
            <div style={corner("tl")} />
            <div style={corner("br")} />
            <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 3, color: FG }}>{index}</div>
          </div>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 2.4, textTransform: "uppercase", color: FG2 }}>{`Case study — ${siteConfig.name}`}</div>
        </div>

        {/* middle: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, color: FG }}>{name}</div>
          <div style={{ display: "flex", fontSize: 32, lineHeight: 1.3, color: FG2 }}>{tagline}</div>
        </div>

        {/* bottom: tag pills + site host */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 44,
                  padding: "0 20px",
                  borderRadius: 999,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: LINE,
                  fontSize: 22,
                  color: FG,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: FG2, whiteSpace: "nowrap" }}>{host}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
