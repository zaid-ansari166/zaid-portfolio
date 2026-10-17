/**
 * Media frame: 18px radius, 1px border, clipped, subtle shadow, project tint behind the image.
 * Put a next/image with `fill` inside (plus `sizes`). Hover scale is handled in CSS on fine pointers.
 */
export default function Media({ aspect = "16 / 9", tint, className = "", style, children, as: Tag = "div", ...rest }) {
  return (
    <Tag className={`media ${className}`} style={{ aspectRatio: aspect, "--tint": tint, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
