/** Wrapper that rises 18px + fades in once when scrolled into view. `delay` is a stagger step (× 70ms). */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  return (
    <Tag data-reveal="" className={className} style={{ "--i": delay, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
