import Section from "@/components/ui/Section";
import ArrowLink from "@/components/ui/ArrowLink";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

// EDIT: section copy. The project cards themselves come from src/content/projects.js.
const TITLE = (
  <>
    Real products, <em className="hl">shipped</em>.
  </>
);
const INTRO =
  "Six apps live on the stores, freelance products for clients in Canada and the UK, and AI platforms — built with React Native, Next.js, NestJS and FastAPI, from the API to the store listing.";

// Column spans of the layouts that share a `.grid-12` row; every other layout takes a row of its own.
const SPAN = { wide: 7, narrow: 5 };

/** Groups consecutive wide/narrow projects into shared rows (7 + 5 = 12 columns). DOM order stays reading order. */
function groupRows(items) {
  const rows = [];
  let shared = null;
  for (const project of items) {
    const span = SPAN[project.layout];
    if (!span) {
      shared = null;
      rows.push({ shared: false, items: [project] });
    } else if (shared && shared.span + span <= 12) {
      shared.items.push(project);
      shared.span += span;
    } else {
      shared = { shared: true, span, items: [project] };
      rows.push(shared);
    }
  }
  return rows;
}

/** 02 · Selected work — the warm ivory gallery. */
export default function Work() {
  const total = projects.length;
  // No `priority` in the gallery: the first frame starts below the fold at every common viewport (the hero is
  // 86svh tall), so a preload would only compete with fonts and CSS for bandwidth on slow connections.
  const first = null;
  const rows = groupRows(projects);

  return (
    <Section id="work" theme="light" edge="both" index="02" label="Selected work" title={TITLE} intro={INTRO}>
      <div className="grid gap-y-16 md:gap-y-24">
        {rows.map((row) =>
          row.shared ? (
            <div key={row.items[0].slug} className="grid-12 gap-y-16 md:gap-y-24">
              {row.items.map((project, j) => (
                <ProjectCard key={project.slug} project={project} total={total} priority={project === first} stagger={j} />
              ))}
            </div>
          ) : (
            <ProjectCard key={row.items[0].slug} project={row.items[0]} total={total} priority={row.items[0] === first} />
          )
        )}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-sec-line pt-6 md:mt-24">
        <p className="text-sec-fg2">More experiments and source on GitHub.</p>
        <ArrowLink href={siteConfig.github}>Visit my GitHub</ArrowLink>
      </div>
    </Section>
  );
}
