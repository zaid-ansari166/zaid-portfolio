import Section from "@/components/ui/Section";
import { experience, education } from "@/content/profile";

/**
 * Experience & education — one spine (1px rule), two groups: Work, then Education.
 * Each entry hangs off the spine with a 9px cyan marker (filled for work, outlined for education) centred on the
 * date line. md+: date in cols 1–4 (1–3 from lg), content in the remaining columns. No library, server component.
 */

/** 9px square on the spine, vertically centred on the date label (py-8 + half a 13px/1.6 line ≈ 42px). */
function Marker({ outlined = false }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -left-[5px] top-[38px] h-[9px] w-[9px] ${
        outlined ? "border border-accent bg-transparent" : "bg-accent"
      }`}
    />
  );
}

function Entry({ index, date, title, meta, points, note, outlined = false }) {
  return (
    <li
      className="relative border-b border-sec-line py-8 pl-8 last:border-b-0 md:pl-10"
      data-reveal=""
      style={{ "--i": index }}
    >
      <Marker outlined={outlined} />
      <div className="md:grid md:grid-cols-12 md:gap-6">
        <p className="label tabular md:col-span-4 lg:col-span-3">{date}</p>
        <div className="mt-2 md:col-span-8 md:col-start-5 md:mt-0 lg:col-span-9 lg:col-start-4">
          <h3 className="h-sub">{title}</h3>
          <p className="mt-1 text-sec-fg2">{meta}</p>
          {points && points.length ? (
            <ul className="mt-5 grid max-w-prose gap-2">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="flex-none text-sec-fg2" aria-hidden="true">
                    –
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {note ? <p className="small mt-2 text-sec-fg2">{note}</p> : null}
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <Section id="experience" theme="light" edge="bottom" seam index="05" label="Experience & education" title={
        <>
          Where I&apos;ve <em className="hl">worked</em> and studied.
        </>
      }>
      {/* ml-2 below md keeps the hanging marker inside the 20px gutter; the label shifts with the spine so they stay aligned */}
      {experience.length ? (
        <div className="ml-2 md:ml-0">
          <p id="experience-work" className="label mb-2" data-reveal="">
            Work
          </p>
          <ol className="relative border-l border-sec-line" aria-labelledby="experience-work">
            {experience.map((job, i) => (
              <Entry
                key={`${job.company}-${job.start}`}
                index={i + 1}
                date={`${job.start} — ${job.end}`}
                title={job.role}
                meta={`${job.company} · ${job.location}`}
                points={job.points}
              />
            ))}
          </ol>
        </div>
      ) : null}

      {education.length ? (
        <div className="ml-2 mt-12 md:ml-0">
          <p id="experience-education" className="label mb-2" data-reveal="">
            Education
          </p>
          <ol className="relative border-l border-sec-line" aria-labelledby="experience-education">
            {education.map((item, i) => (
              <Entry
                key={`${item.degree}-${item.period}`}
                index={i + 1}
                date={item.period}
                title={item.degree}
                meta={`${item.school} · ${item.location}`}
                note={item.note}
                outlined
              />
            ))}
          </ol>
        </div>
      ) : null}
    </Section>
  );
}
