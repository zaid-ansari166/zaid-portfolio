import { ImageResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = "Zaid Ansari — AI & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f7f1e7",
          color: "#2e2521",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(212,175,55,0.45), transparent 45%), radial-gradient(circle at 100% 100%, rgba(176,135,90,0.4), transparent 45%), radial-gradient(circle at 85% 5%, rgba(232,164,92,0.35), transparent 40%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              backgroundColor: "#22c55e",
            }}
          />
          <div style={{ fontSize: "24px", color: "#8a7560", letterSpacing: "5px" }}>
            AVAILABLE FOR WORK
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "98px", fontWeight: 800, lineHeight: 1.02 }}>
          Zaid Ansari
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "54px",
            fontWeight: 700,
            marginTop: "8px",
            color: "#b8860b",
          }}
        >
          AI &amp; Full Stack Developer
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "30px",
            color: "#6b5a4c",
            marginTop: "28px",
            maxWidth: "920px",
          }}
        >
          3+ years building intelligent web &amp; mobile apps with LLMs, React,
          Next.js &amp; Node.js
        </div>

        <div style={{ display: "flex", gap: "14px", marginTop: "46px" }}>
          {["OpenAI", "Claude", "Gemini", "React", "Next.js"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                fontSize: "26px",
                padding: "10px 24px",
                borderRadius: "9999px",
                border: "1px solid rgba(111,78,55,0.32)",
                color: "#2e2521",
              }}
            >
              {t}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: "60px",
            right: "80px",
            fontSize: "26px",
            color: "#8b5e3c",
          }}
        >
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
