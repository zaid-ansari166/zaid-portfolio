import Image from "next/image";
import Link from "next/link";
import Media from "@/components/ui/Media";
import ArrowLink from "@/components/ui/ArrowLink";
import LiteYouTube from "@/components/ui/LiteYouTube";
import { Index } from "@/components/ui/Index";
import TypeCover from "@/components/ui/TypeCover";

/**
 * One project in the Selected Work gallery. `project.layout` (src/content/projects.js) picks the composition:
 *   featured — full-width media, then a 12-col text row (big title left, meta right)
 *   wide     — 7 of 12 columns in a shared row        narrow — 5 columns, offset down on desktop
 *   row      — media in 7 columns, text in 5, vertically centred
 * Work.jsx groups wide/narrow neighbours into one `.grid-12` row and passes `stagger` (reveal delay step).
 * Server component; LiteYouTube (client) is only rendered for projects with a `videoId`.
 */

// next/image `sizes`: the rendered width of the frame per layout at each breakpoint.
const SIZES = {
  featured: "(min-width: 1360px) 1264px, 100vw",
  wide: "(min-width: 1024px) 58vw, 100vw",
  narrow: "(min-width: 1024px) 41vw, 100vw",
  row: "(min-width: 1024px) 58vw, 100vw",
};

const caseStudyHref = (slug) => `/work/${slug}`;
const pad = (n) => String(n).padStart(2, "0");

/** Media frame. Links to the case study, or hosts the click-to-play facade when the project has a video. */
function Cover({ project, priority }) {
  const { slug, name, cover, coverAlt, coverAspect, tint, videoId, layout } = project;
  const sizes = SIZES[layout] || SIZES.wide;
  // faint project-coloured shadow — the tint's only use besides the frame background behind the image
  const style = tint ? { boxShadow: `0 40px 80px -48px color-mix(in srgb, ${tint} 60%, transparent)` } : undefined;

  if (videoId) {
    // the facade is a button, so it is not wrapped in a link; the case-study link sits in the text block
    return (
      <Media aspect={coverAspect} tint={tint} style={style}>
        <LiteYouTube
          id={videoId}
          title={`${name} — app video`}
          poster={cover}
          posterAlt={coverAlt}
          sizes={sizes}
          priority={priority}
        />
      </Media>
    );
  }

  if (!cover) {
    // no artwork exists for this project → typographic frame (still links to the case study)
    return (
      <Link href={caseStudyHref(slug)} className="block rounded-media" aria-label={`${name} — view case study`}>
        <TypeCover project={project} aspect={coverAspect || "4 / 3"} />
      </Link>
    );
  }

  return (
    <Link href={caseStudyHref(slug)} className="block rounded-media" aria-label={`${name} — view case study`}>
      <Media aspect={coverAspect} tint={tint} style={style}>
        <Image src={cover} alt={coverAlt} fill placeholder="blur" sizes={sizes} priority={priority} />
      </Media>
    </Link>
  );
}

/** "01 / 06" — crop-mark index chip plus the running total (read as "Project 01 of 06"). */
function Counter({ index, total, size = "md" }) {
  return (
    <p className="flex items-center">
      <span className="sr-only">Project </span>
      <Index size={size}>{index}</Index>
      <span className="label ml-3">
        <span aria-hidden="true">/ </span>
        <span className="sr-only">of </span>
        {pad(total)}
      </span>
    </p>
  );
}

/** Plain-text tag pills; the metric (when present) leads the row as the gallery's one cyan detail. */
function Tags({ tags = [], metric, className = "" }) {
  if (!metric && tags.length === 0) return null;
  return (
    <ul className={`scroll-x md:flex-wrap md:overflow-visible ${className}`}>
      {metric ? (
        <li className="tag tag--accent">
          {metric.value} {metric.label}
        </li>
      ) : null}
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Text block for wide / narrow / row cards. */
function Details({ project, total, titleId }) {
  const { slug, index, name, tagline, summary, role, status, tags, metric } = project;
  return (
    <>
      <Counter index={index} total={total} />
      <h3 id={titleId} className="h-sub mt-3">
        {name}
      </h3>
      <p className="mt-1 text-sec-fg">{tagline}</p>
      <p className="small mt-2 max-w-prose text-sec-fg2">{summary}</p>
      <p className="small mt-4 flex flex-wrap items-baseline gap-x-3">
        <span className="label">Role</span>
        <span>{role}</span>
      </p>
      {status ? <p className="small text-sec-fg2">{status}</p> : null}
      <Tags tags={tags} metric={metric} className="mt-4" />
      <ArrowLink href={caseStudyHref(slug)} className="mt-4">
        View the {name} case study
      </ArrowLink>
    </>
  );
}

function FeaturedCard({ project, total, priority, titleId }) {
  const { slug, index, name, tagline, summary, role, client, platforms = [], status, tags, metric } = project;
  // meta rows — only the facts the data actually has
  const meta = [
    ["Role", role],
    ["Status", status],
    ["Client", client],
    ["Platforms", platforms.length ? platforms.join(", ") : null],
  ].filter(([, value]) => value);

  return (
    <>
      <Cover project={project} priority={priority} />
      <div className="grid-12 mt-8 md:mt-10">
        <div className="col-span-12 lg:col-span-7">
          <Counter index={index} total={total} size="lg" />
          <h3 id={titleId} className="h-section mt-4">
            {name}
          </h3>
          <p className="lead mt-2">{tagline}</p>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:self-end">
          <p className="text-sec-fg2">{summary}</p>
          {meta.length ? (
            <dl className="mt-6 border-t border-sec-line">
              {meta.map(([term, value]) => (
                <div key={term} className="flex items-baseline gap-4 border-b border-sec-line py-3">
                  <dt className="label w-24 shrink-0">{term}</dt>
                  <dd className="small">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <Tags tags={tags} metric={metric} className="mt-5" />
          <ArrowLink href={caseStudyHref(slug)} className="mt-4">
            View the {name} case study
          </ArrowLink>
        </div>
      </div>
    </>
  );
}

export default function ProjectCard({ project, total, priority = false, stagger = 0 }) {
  const { slug, layout } = project;
  const titleId = `work-${slug}-title`;
  const rootProps = {
    "data-reveal": "",
    "aria-labelledby": titleId,
    style: stagger ? { "--i": stagger } : undefined,
  };

  if (layout === "featured") {
    return (
      <article {...rootProps}>
        <FeaturedCard project={project} total={total} priority={priority} titleId={titleId} />
      </article>
    );
  }

  if (layout === "row") {
    return (
      <article {...rootProps} className="grid-12 gap-y-5">
        <div className="col-span-12 lg:col-span-7">
          <Cover project={project} priority={priority} />
        </div>
        <div className="col-span-12 lg:col-span-5 lg:self-center">
          <Details project={project} total={total} titleId={titleId} />
        </div>
      </article>
    );
  }

  // wide / narrow: a column of a shared row; narrow items sit 64px lower on desktop for the editorial offset
  const narrow = layout === "narrow";
  return (
    <article {...rootProps} className={narrow ? "col-span-12 lg:col-span-5 lg:mt-16" : "col-span-12 lg:col-span-7"}>
      <Cover project={project} priority={priority} />
      <div className="mt-5">
        <Details project={project} total={total} titleId={titleId} />
      </div>
    </article>
  );
}
