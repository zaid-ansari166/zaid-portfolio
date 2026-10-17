import Section from "@/components/ui/Section";
import { Index } from "@/components/ui/Index";
import { expertise } from "@/content/profile";

/**
 * Expertise — four editorial rows on fine rules: index · area · what it makes possible · tools.
 * lg: 1 / 4 / 4 / 3 columns of the 12-col grid (the index + title wrapper dissolves via `display: contents`).
 * Below lg the row stacks with 12px gaps; the index chip and the title share a line.
 * No logos, no percentages. Server component; data from src/content/profile.js.
 */
export default function Expertise() {
  const lastRow = expertise.length - 1;

  return (
    <Section
      id="skills"
      theme="light"
      surface="soft"
      edge="top"
      index="04"
      label="Expertise"
      title={
        <>
          {expertise.length === 6 ? "Six" : expertise.length === 4 ? "Four" : expertise.length} areas, <em className="hl">one workflow</em>.
        </>
      }
      intro="Grouped by the kind of work they make possible — not a wall of logos."
    >
      <ol>
        {expertise.map((area, i) => (
          <li
            key={area.index}
            className={`grid-12 gap-y-3 border-t border-sec-line py-7 md:py-9${i === lastRow ? " border-b" : ""}`}
            data-reveal=""
            style={{ "--i": i }}
          >
            <div className="col-span-12 flex items-center gap-4 lg:contents">
              <Index className="lg:col-span-1 lg:col-start-1 lg:mt-0.5 lg:self-start lg:justify-self-start">{area.index}</Index>
              <h3 className="h-sub lg:col-span-4 lg:col-start-2">{area.title}</h3>
            </div>

            <p className="col-span-12 max-w-prose text-sec-fg2 lg:col-span-4 lg:col-start-6">{area.enables}</p>

            <ul
              className="small col-span-12 flex flex-wrap gap-x-3 gap-y-1 text-sec-fg2 lg:col-span-3 lg:col-start-10"
              aria-label={`${area.title} — tools`}
            >
              {area.tools.map((tool, j) => (
                <li key={tool} className="flex gap-x-3">
                  {j > 0 ? <span aria-hidden="true">·</span> : null}
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
