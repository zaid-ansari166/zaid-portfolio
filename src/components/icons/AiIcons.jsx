"use client";
import React from "react";

// Anthropic / Claude — radiating "spark" burst mark
export const ClaudeIcon = ({ size = 40, className = "", color = "#D97757" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill={color}
    aria-label="Claude"
    role="img"
  >
    {Array.from({ length: 12 }).map((_, i) => (
      <rect
        key={i}
        x="11"
        y="1.5"
        width="2"
        height="7.5"
        rx="1"
        transform={`rotate(${i * 30} 12 12)`}
      />
    ))}
  </svg>
);

// Google Gemini — 4-point sparkle with gradient
export const GeminiIcon = ({ size = 40, className = "" }) => {
  const id = "gemini-grad";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-label="Gemini"
      role="img"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="50%" stopColor="#9B72CB" />
          <stop offset="100%" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
        fill={`url(#${id})`}
      />
    </svg>
  );
};

// Hugging Face — uses the recognizable 🤗 emoji as its mark
export const HuggingFaceIcon = ({ size = 40, className = "" }) => (
  <span
    className={className}
    role="img"
    aria-label="Hugging Face"
    style={{
      fontSize: size * 0.85,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
    }}
  >
    🤗
  </span>
);
