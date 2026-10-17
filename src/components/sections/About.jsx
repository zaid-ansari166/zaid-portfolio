import Section from "@/components/ui/Section";
import { siteConfig } from "@/content/site";
import { about } from "@/content/profile";

/**
 * About — a purely typographic composition (no portrait, no cards):
 * lg: lead + supporting paragraph in cols 1–7, a definition list of facts in cols 9–12.
 * Below: a full-width rule, the current position, and a résumé download only when a PDF is configured.
 * Server component. All copy comes from src/content/profile.js and src/content/site.js.
 */
export default function About() {
  const [lead, ...supporting] = about.paragraphs;
  const lastFact = about.facts.length - 1;

  return (
    <Section id="about" index="03" label="About" title={
        <>
          I build the whole product — app, API and the <em className="hl">AI in between</em>.
        </>
      }>
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-7" data-reveal="">
          {/* .lead is fg-2 by default (section intros); the opening paragraph carries the section, so it stays in fg */}
          <p className="lead prose text-sec-fg">{lead}</p>
          {supporting.map((text, i) => (
            <p key={i} className="prose mt-5 text-sec-fg2">
              {text}
            </p>
          ))}
        </div>

        <dl className="col-span-12 mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
          {about.facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`grid gap-1 border-t border-sec-line py-4${i === lastFact ? " border-b" : ""}`}
              data-reveal=""
              style={{ "--i": i + 1 }}
            >
              <dt className="label">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <hr className="rule mt-12" />
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4" data-reveal="">
        <p className="small text-sec-fg2">
          Currently at {siteConfig.company} · {siteConfig.location}
        </p>
        {siteConfig.resumeUrl ? (
          // Plain anchor on purpose: `download` needs a same-origin navigation, and next/link would prefetch the PDF as a route.
          <a href={siteConfig.resumeUrl} download className="btn btn-secondary">
            <span className="btn-label">Download résumé</span>
          </a>
        ) : null}
      </div>
    </Section>
  );
}
