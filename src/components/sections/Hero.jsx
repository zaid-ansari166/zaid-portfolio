import Button from "@/components/ui/Button";
import { IconArrow } from "@/components/ui/Icons";
import { Index, Label } from "@/components/ui/Index";
import Constellation from "@/components/fx/Constellation";
import { siteConfig } from "@/content/site";
import { hero } from "@/content/profile";
import styles from "./Hero.module.css";

/** Splits a headline line around `highlight` so that word can be set in cyan (kept inside the h1 for screen readers). */
function Line({ text, highlight }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <em>{highlight}</em>
      {text.slice(i + highlight.length)}
    </>
  );
}

/**
 * Hero — open to the world: the starfield shows through and the particle constellation assembles on the right.
 * Left: index + label, the three-line headline (mask-reveal per line, one phrase in cyan), support copy,
 * CTAs and a mono note. Below: the figures row. Load motion is pure CSS; reduced motion disables it.
 */
export default function Hero() {
  const lines = hero.headline;
  const availability = siteConfig.availability;
  const note = [availability?.available ? availability.label : null, siteConfig.location, "replies within a day"]
    .filter(Boolean)
    .join(" · ");

  return (
    <section id="top" data-theme="dark" className={`section hero ${styles.hero}`}>
      <div className="container">
        {/* Row 1 — index + label */}
        <div className="enter section-label" style={{ "--i": 0 }}>
          <Index>01</Index>
          <Label>{hero.label}</Label>
        </div>

        {/* The constellation: stars → name → stars → title. A backdrop on desktop, a band above the headline on phones. */}
        <div className="hero__stage" aria-hidden="true">
          <Constellation scenes={hero.stage?.scenes} />
        </div>

        {/* Headline — one line per mask; `hero.highlight` is set in cyan */}
        <h1 className={`h-display hero-title mt-8 md:mt-10 ${styles.headline}`}>
          {lines.map((line, i) => (
            <span className="line-mask" key={line}>
              {i > 0 ? " " : null}
              <span style={{ "--i": i }}>
                <Line text={line} highlight={hero.highlight} />
              </span>
            </span>
          ))}
        </h1>

        {/* Support + CTAs */}
        <div className="grid-12 mt-8 md:mt-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="lead prose enter" style={{ "--i": 1 }}>
              {hero.support}
            </p>
            <div className="enter mt-8 flex flex-wrap items-center gap-x-4 gap-y-3" style={{ "--i": 2 }}>
              <Button href={hero.primaryCta.href} size="lg" icon={<IconArrow />} magnetic className="w-full xs:w-auto">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="ghost" size="lg" icon={<IconArrow />} className="w-full xs:w-auto">
                {hero.secondaryCta.label}
              </Button>
            </div>
            {note ? (
              <p className="enter mono mt-5 text-[0.75rem] tracking-[0.04em] text-sec-fg2" style={{ "--i": 3 }}>
                {availability?.available ? <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent align-middle" aria-hidden="true" /> : null}
                {note}
              </p>
            ) : null}
          </div>
        </div>

        {/* Figures */}
        {hero.facts?.length ? (
          <dl className="figures enter mt-12 md:mt-16" style={{ "--i": 4 }}>
            {hero.facts.map((fact) => (
              <div key={fact.label}>
                <dd className="v">{fact.value}</dd>
                <dt className="k">{fact.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
