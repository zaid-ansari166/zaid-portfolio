import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import { IconArrow } from "@/components/ui/Icons";
import { siteConfig } from "@/content/site";
import { contact } from "@/content/profile";
import ContactForm from "@/components/ContactForm";
import CopyEmail from "@/components/CopyEmail";
import LocalTime from "@/components/LocalTime";

const row = "flex items-baseline justify-between gap-6 border-t border-sec-line py-4";

/** Sets `highlight` in cyan when it appears in the title (kept inside the h2 for screen readers). */
function Title({ text, highlight }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <em className="hl">{highlight}</em>
      {text.slice(i + highlight.length)}
    </>
  );
}

/**
 * 06 · Contact — the closing invitation. Dark and generous: a display-size headline, the email as the primary
 * action (tap to mail, tap to copy), a short fact list with fine rules, and the form. All copy comes from
 * src/content; rows with nothing real behind them (résumé, availability) are omitted rather than left dead.
 */
export default function Contact() {
  const { availability, resumeUrl } = siteConfig;

  return (
    <Section id="contact" theme="dark" index="06" label="Contact">
      <h2 className="h-display" data-reveal="" style={{ "--i": 1 }}>
        <Title text={contact.title} highlight={contact.highlight} />
      </h2>

      <div className="grid-12 mt-12 md:mt-16">
        <div className="col-span-full lg:col-span-5">
          <p className="lead prose" data-reveal="">
            {contact.text}
          </p>

          <Reveal delay={1} className="mt-8">
            <CopyEmail email={siteConfig.email} />
          </Reveal>

          <Reveal as="dl" delay={2} className="mt-10 border-b border-sec-line">
            <div className={row}>
              <dt className="label shrink-0">Based in</dt>
              <dd className="text-right">
                {siteConfig.location}
                {siteConfig.timeZone ? <LocalTime timeZone={siteConfig.timeZone} prefix=" · " className="text-sec-fg2" /> : null}
              </dd>
            </div>

            {availability && availability.available ? (
              <div className={row}>
                <dt className="label shrink-0">Availability</dt>
                <dd className="text-right">
                  <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-full bg-accent align-middle" />
                  {availability.label}
                </dd>
              </div>
            ) : null}

            <div className={row}>
              <dt className="label shrink-0">Elsewhere</dt>
              <dd className="-my-2 flex flex-wrap justify-end gap-x-5">
                <ArrowLink href={siteConfig.github}>GitHub</ArrowLink>
                <ArrowLink href={siteConfig.linkedin}>LinkedIn</ArrowLink>
              </dd>
            </div>

            {resumeUrl ? (
              <div className={row}>
                <dt className="label shrink-0">Résumé</dt>
                <dd className="-my-2 flex justify-end">
                  <a href={resumeUrl} download className="link-arrow">
                    <span className="link-arrow__text">Download résumé (PDF)</span>
                    <IconArrow size={18} />
                  </a>
                </dd>
              </div>
            ) : null}
          </Reveal>
        </div>

        <Reveal delay={2} className="col-span-full lg:col-span-6 lg:col-start-7">
          <ContactForm note={contact.note} email={siteConfig.email} toName={siteConfig.name} />
        </Reveal>
      </div>
    </Section>
  );
}
