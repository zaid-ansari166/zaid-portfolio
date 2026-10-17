import Link from "next/link";

/**
 * Button — primary (cyan on the world, ink on light surfaces), secondary (outlined), ghost (text + rule).
 * Renders <a> (next/link for internal hrefs) when `href` is given, otherwise <button>.
 * `magnetic` enables the ≤5px magnetic nudge on fine pointers (handled by MotionProvider; the hit target never moves).
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "end",
  magnetic = false,
  loading = false,
  disabled = false,
  external = false,
  className = "",
  children,
  type = "button",
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconEl = icon ? <span className="btn-arrow inline-flex">{icon}</span> : null;

  const content = (
    <span className="btn-label">
      {loading ? <span className="spinner" aria-hidden="true" /> : iconPosition === "start" ? iconEl : null}
      <span>{children}</span>
      {!loading && iconPosition === "end" ? iconEl : null}
    </span>
  );

  const magneticAttr = magnetic ? { "data-magnetic": "" } : {};

  if (href) {
    const isExternal = external || /^https?:\/\//.test(href) || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-disabled={disabled || undefined}
          {...magneticAttr}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-disabled={disabled || undefined} {...magneticAttr} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      data-loading={loading ? "true" : undefined}
      aria-busy={loading || undefined}
      {...magneticAttr}
      {...rest}
    >
      {content}
    </button>
  );
}
