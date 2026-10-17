import Link from "next/link";
import { IconArrow, IconArrowUpRight } from "./Icons";

/** Text link with a fine underline reveal and a 4px arrow nudge. Use descriptive link text. */
export default function ArrowLink({ href, children, external = false, className = "", size = 18, ...rest }) {
  const isExternal = external || /^https?:\/\//.test(href);
  const Icon = isExternal ? IconArrowUpRight : IconArrow;
  const inner = (
    <>
      <span className="link-arrow__text">{children}</span>
      <Icon size={size} />
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={`link-arrow ${className}`} target="_blank" rel="noopener noreferrer" {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={`link-arrow ${className}`} {...rest}>
      {inner}
    </Link>
  );
}
