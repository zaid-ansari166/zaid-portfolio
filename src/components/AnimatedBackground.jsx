"use client";
import React from "react";

// Fixed, GPU-friendly animated gradient-mesh ("aurora") + subtle neon grid.
// Sits behind all content (z-[-1]); the page wrapper must stay transparent.
const AnimatedBackground = () => (
  <>
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-blob aurora-blob--violet" />
      <div className="aurora-blob aurora-blob--cyan" />
      <div className="aurora-blob aurora-blob--pink" />
    </div>
    <div className="grid-overlay" aria-hidden="true" />
  </>
);

export default AnimatedBackground;
