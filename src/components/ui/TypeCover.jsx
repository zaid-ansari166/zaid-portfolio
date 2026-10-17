import Media from "./Media";
import { Index } from "./Index";

/**
 * Typographic cover for projects with no artwork: the project's tint as the frame, the index chip, the name and
 * the stack set in type. Fixed dark palette inside the frame so it reads the same on ivory and ink sections.
 */
export default function TypeCover({ project, aspect = "4 / 3", size = "md", className = "" }) {
  const stack = (project.detail && project.detail.stack) || project.tags || [];
  const big = size === "lg";
  return (
    <Media aspect={aspect} tint={project.tint} className={className}>
      <div
        className={`absolute inset-0 flex flex-col justify-between ${big ? "p-8 md:p-12" : "p-6 md:p-8"}`}
        style={{ "--s-mark": "var(--accent)", "--s-fg": "var(--fg)", "--s-fg-2": "var(--fg-2)", color: "var(--fg)" }}
      >
        <div className="atmosphere" aria-hidden="true" />
        <Index size="lg" className="self-start">{project.index}</Index>
        <div>
          <p className={`font-display leading-[1.02] tracking-[-0.03em] ${big ? "text-[clamp(2rem,1.4rem+3vw,4.5rem)]" : "text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)]"}`}>
            {project.name}
          </p>
          {stack.length ? <p className="small mt-3 max-w-[40ch]" style={{ color: "var(--fg-2)" }}>{stack.join(" · ")}</p> : null}
        </div>
      </div>
    </Media>
  );
}
