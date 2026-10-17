import { Index, Label } from "./Index";

/**
 * Section shell: sets the theme scope (dark | light), vertical rhythm, container and the editorial header row
 * (index chip + label / heading / intro). Pass `title` as string or JSX. Omit header props for a bare section.
 */
const EDGE = { top: "surface-top", bottom: "surface-bottom", both: "surface-top surface-bottom" };

export default function Section({
  id,
  theme = "dark",
  surface, // light sections: "soft" for the #F4F6FB panel
  edge, // light sections: "top" | "bottom" | "both" — rounds the corners that touch the world
  seam = false, // light section directly below another light section: a hairline between them
  index,
  label,
  title,
  intro,
  titleAs: TitleTag = "h2",
  className = "",
  headClassName = "",
  children,
  ...rest
}) {
  const hasHead = index || label || title || intro;
  const classes = ["section", EDGE[edge] || "", seam ? "surface-seam" : "", className].filter(Boolean).join(" ");
  return (
    <section id={id} data-theme={theme} data-surface={surface} className={classes} {...rest}>
      <div className="container">
        {hasHead ? (
          <div className={`section-head ${headClassName}`}>
            {index || label ? (
              <div className="section-label" data-reveal="">
                {index ? <Index>{index}</Index> : null}
                {label ? <Label>{label}</Label> : null}
              </div>
            ) : null}
            {title ? (
              <TitleTag className="h-section" data-reveal="" style={{ "--i": 1 }}>
                {title}
              </TitleTag>
            ) : null}
            {intro ? (
              <p className="lead prose" data-reveal="" style={{ "--i": 2 }}>
                {intro}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}
