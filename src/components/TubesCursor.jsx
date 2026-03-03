"use client";

import { useEffect, useRef } from "react";

export default function TubesCursor() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
      const canvas = document.getElementById("tubes-cursor-canvas");
      if (canvas) {
        window.__tubesCursorApp = TubesCursor(canvas, {
          tubes: {
          lerp: .6,
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
            }
          }
        });
      }
    `;
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (window.__tubesCursorApp?.dispose) {
        window.__tubesCursorApp.dispose();
      }
    };
  }, []);

  return (
    <div id="tubes-cursor-wrapper">
      <canvas ref={canvasRef} id="tubes-cursor-canvas" />
    </div>
  );
}
