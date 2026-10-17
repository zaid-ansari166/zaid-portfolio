import Link from "next/link";
import Image from "next/image";
import { Index, Label } from "@/components/ui/Index";
import Button from "@/components/ui/Button";
import ArrowLink from "@/components/ui/ArrowLink";
import Media from "@/components/ui/Media";
import LiteYouTube from "@/components/ui/LiteYouTube";
import TypeCover from "@/components/ui/TypeCover";
import { IconArrow, IconArrowLeft, IconExternal, IconGithub, IconPlay } from "@/components/ui/Icons";
import { siteConfig } from "@/content/site";
import styles from "./ProjectDetail.module.css";

/**
 * Case study page: reading-first on ivory (intro → sticky in-page index + parts), closing on dark
 * (next / previous project + contact). Server component; LiteYouTube is the only client island.
 */

const nn = (n) => String(n).padStart(2, "0");
const has = (arr) => Array.isArray(arr) && arr.length > 0;

/** "4 / 3" → 1.33. Tall covers get a narrower frame so the top image never towers over the viewport. */
const ratioOf = (aspect) => {
  const [w, h] = String(aspect || "16 / 9").split("/").map((s) => parseFloat(s));
  return w > 0 && h > 0 ? w / h : 16 / 9;
};

/** Static imports carry a blurDataURL; a plain string src would not. */
const blurOf = (src) => (src && typeof src === "object" && src.blurDataURL ? "blur" : "empty");

/** Metric may be a string or { value, label }. */
const metricText = (m) => (!m ? null : typeof m === "string" ? m : [m.value, m.label].filter(Boolean).join(" "));

/** "Final work" images: `project.gallery` [{ src, alt, aspect }] and/or `detail.finalWork` ({ image, alt, aspect } or an array). */
const galleryOf = (project) => {
  const d = project.detail || {};
  return []
    .concat(project.gallery || d.gallery || [], d.finalWork || [])
    .map((g) => ({ src: g.src || g.image, alt: g.alt || "", aspect: g.aspect || "16 / 9", caption: g.caption || null }))
    .filter((g) => g.src);
};

// External links in display order: [key, meta-row label, button label, button icon]
const LINKS = [
  ["playStore", "Google Play", "View on Google Play", IconExternal],
  ["appStore", "App Store", "View on the App Store", IconExternal],
  ["website", "Website", "Visit website", IconExternal],
  ["video", "Video", "Watch the video", IconPlay],
  ["github", "Source", "View source", IconGithub],
];

export default function ProjectDetail({ project, prev, next, total }) {
  const d = project.detail || {};
  const links = LINKS.filter(([key]) => project.links && project.links[key]);
  const gallery = galleryOf(project);
  const stack = has(d.stack) ? d.stack : project.tags || [];
  const metric = metricText(project.metric);

  // Top media: an optional detail-specific cover, else the gallery cover. MSpark plays its video here.
  const topImage = project.detailCover || project.cover;
  const topAspect = (project.detailCover && project.detailCoverAspect) || project.coverAspect || "16 / 9";
  const wide = ratioOf(topAspect) >= 1.6;
  const topSizes = wide ? "(min-width: 1360px) 1264px, 100vw" : "(min-width: 1360px) 835px, (min-width: 1024px) 66vw, 100vw";
  const partSizes = "(min-width: 1360px) 835px, (min-width: 1024px) 66vw, 100vw";

  const meta = [
    { term: "Role", value: project.role },
    { term: "Client", value: project.client },
    { term: "Year", value: project.year },
    { term: "Platforms", value: has(project.platforms) ? project.platforms.join(", ") : null },
    { term: "Stack", value: has(stack) ? stack.join(" · ") : null },
    { term: "Status", value: project.status },
    {
      term: "Links",
      value: links.length ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {links.map(([key, label]) => (
            <li key={key}>
              <a className="link-inline" href={project.links[key]} target="_blank" rel="noopener noreferrer">
                {label}
                <span className="sr-only"> ({project.name})</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null,
    },
  ].filter((m) => m.value);

  // Only the parts that have content exist — the in-page index and the numbering follow from this list.
  const parts = [
    has(d.overview) && {
      id: "overview",
      title: "Overview",
      body: (
        <div className="prose mt-6">
          {d.overview.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      ),
    },
    d.problem && {
      id: "problem",
      title: "Problem",
      body: (
        <div className="prose mt-6">
          <p>{d.problem}</p>
        </div>
      ),
    },
    has(d.contribution) && {
      id: "contribution",
      title: "My contribution",
      body: (
        <ul className="prose mt-6">
          {d.contribution.map((item) => (
            <li key={item} className="flex gap-4 border-b border-sec-line py-3">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    has(d.process) && {
      id: "process",
      title: "Process",
      body: (
        <ol className="prose mt-6">
          {d.process.map((step, i) => (
            <li key={step.title} className="flex gap-5 border-b border-sec-line py-4">
              <span className="nav-link__idx mt-[0.4em] shrink-0" aria-hidden="true">
                {nn(i + 1)}
              </span>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="small mt-1 text-sec-fg2">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    has(d.decisions) && {
      id: "decisions",
      title: "Key decisions",
      body: (
        <div className="mt-6 grid gap-x-6 gap-y-8 md:grid-cols-2">
          {d.decisions.map((dec) => (
            <div key={dec.title} className="border-t border-sec-line pt-4">
              <h3 className="font-medium">{dec.title}</h3>
              <p className="small mt-1 text-sec-fg2">{dec.text}</p>
            </div>
          ))}
        </div>
      ),
    },
    gallery.length > 0 && {
      id: "final-work",
      title: "Final work",
      body: (
        <div className="mt-6 grid gap-6">
          {gallery.map((g, i) => (
            <figure key={i}>
              <Media aspect={g.aspect} tint={project.tint}>
                <Image src={g.src} alt={g.alt} fill sizes={partSizes} placeholder={blurOf(g.src)} />
              </Media>
              {g.caption ? <figcaption className="small mt-3 text-sec-fg2">{g.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ),
    },
    has(d.outcomes) && {
      id: "outcomes",
      title: "Outcomes",
      body: (
        <div className="prose mt-6">
          {metric ? (
            <p>
              <span className="tag tag--accent">{metric}</span>
            </p>
          ) : null}
          <ul className={metric ? "mt-4" : undefined}>
            {d.outcomes.map((o) => (
              <li key={o} className="border-b border-sec-line py-3">
                {o}
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ].filter(Boolean);

  const showNext = next && next.slug !== project.slug;
  const showPrev = prev && prev.slug !== project.slug;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      {/* ── Intro (ivory): back link · index · name · tagline · meta · top media ─────────────── */}
      <section data-theme="light" className="section" style={{ paddingTop: "calc(var(--header-h) + clamp(32px, 5vw, 64px))" }}>
        <div className="container">
          <div>
            <Link href="/#work" className={`link-arrow enter ${styles.back}`} style={{ "--i": 0 }}>
              <IconArrowLeft size={18} />
              <span className="link-arrow__text">All work</span>
            </Link>
          </div>

          <div className="section-label enter mt-8" style={{ "--i": 0 }}>
            <Index size="lg">{project.index}</Index>
            <Label>
              Project {project.index} / {nn(total)}
            </Label>
          </div>

          <h1 className="h-display enter-solid mt-6" style={{ "--i": 1, fontSize: "clamp(2.5rem, 1.5rem + 4.5vw, 6rem)" }}>
            {project.name}
          </h1>
          <p className="lead prose enter mt-4" style={{ "--i": 2 }}>
            {project.tagline}
          </p>

          <dl className="grid-12 enter mt-10" style={{ "--i": 3 }}>
            {meta.map((m) => (
              <div key={m.term} className="col-span-6 border-t border-sec-line pt-4 lg:col-span-3">
                <dt className="label">{m.term}</dt>
                <dd className="mt-1">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="grid-12 enter-solid mt-10 md:mt-14" style={{ "--i": 2 }}>
            <div className={wide ? "col-span-12" : "col-span-12 lg:col-span-8"}>
              {!topImage && !project.videoId ? (
                <TypeCover project={project} aspect={topAspect} size="lg" />
              ) : (
              <Media aspect={topAspect} tint={project.tint}>
                {project.videoId ? (
                  <LiteYouTube
                    id={project.videoId}
                    title={`${project.name} — ${project.tagline}`}
                    poster={project.cover}
                    posterAlt={project.coverAlt}
                    sizes={topSizes}
                    priority
                  />
                ) : (
                  <Image src={topImage} alt={project.coverAlt || ""} fill priority sizes={topSizes} placeholder={blurOf(topImage)} />
                )}
              </Media>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body (ivory): sticky in-page index + numbered parts ──────────────────────────────── */}
      <section data-theme="light" className="section surface-bottom pt-0">
        <div className="container">
          <div className="grid-12">
            <nav aria-labelledby="toc-title" className={`${styles.toc} col-span-12 self-start lg:col-span-3`} data-reveal="">
              <p id="toc-title" className="label">
                On this page
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 lg:block">
                {parts.map((part, i) => (
                  <li key={part.id}>
                    <a
                      href={`#${part.id}`}
                      className="flex min-h-[44px] items-center gap-3 small text-sec-fg2 transition-colors duration-220 ease-out hover:text-sec-fg"
                    >
                      <span className="nav-link__idx" aria-hidden="true">
                        {nn(i + 1)}
                      </span>
                      {part.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-12 mt-6 lg:col-span-8 lg:col-start-5 lg:mt-0">
              {parts.map((part, i) => (
                <section
                  key={part.id}
                  id={part.id}
                  className="mt-12 border-t border-sec-line pt-8 first:mt-0"
                  data-reveal=""
                  style={{ "--i": Math.min(i, 2) }}
                >
                  <h2 className="h-sub flex items-center gap-4">
                    <Index aria-hidden="true">{nn(i + 1)}</Index>
                    {part.title}
                  </h2>
                  {part.body}
                </section>
              ))}

              {links.length ? (
                <div className="mt-12 flex flex-wrap gap-3" data-reveal="">
                  {links.map(([key, , label, Icon], i) => (
                    <Button key={key} href={project.links[key]} variant={i === 0 ? "primary" : "secondary"} icon={<Icon size={18} />}>
                      {label}
                    </Button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing (dark): next / previous project + contact ────────────────────────────────── */}
      <section data-theme="dark" className="section">
        <div className="atmosphere" aria-hidden="true" />
        <div className="container">
          <div className="grid-12">
            <div className="col-span-12 lg:col-span-7" data-reveal="">
              {showNext ? (
                <>
                  <p className="label">Next project</p>
                  <Link href={`/work/${next.slug}`} className="group mt-4 block">
                    <Index size="lg">{next.index}</Index>
                    <span className="h-section mt-3 block transition-colors duration-220 ease-out group-hover:text-accent">{next.name}</span>
                    <span className="lead mt-2 block">{next.tagline}</span>
                  </Link>
                </>
              ) : null}
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9" data-reveal="" style={{ "--i": 1 }}>
              {showPrev ? <ArrowLink href={`/work/${prev.slug}`}>Previous: {prev.name}</ArrowLink> : null}
              <p className="lead mt-10">Have something similar in mind?</p>
              <div className="mt-6">
                <Button href="/#contact" size="lg" icon={<IconArrow />} magnetic>
                  Let&apos;s talk
                </Button>
              </div>
              <p className="small mt-4 text-sec-fg2">
                or email{" "}
                <a className="link-inline" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
