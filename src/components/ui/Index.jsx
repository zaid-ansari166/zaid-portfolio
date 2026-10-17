// Crop-mark bracket chip — the site's recurring motif. Used for section indexes, project numbers, nav.
export function Index({ children, size = "md", className = "", ...rest }) {
  return (
    <span className={`index ${size === "lg" ? "index--lg" : ""} ${className}`} {...rest}>
      {children}
    </span>
  );
}

export function Label({ children, as: Tag = "span", className = "", ...rest }) {
  return (
    <Tag className={`label ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export default Index;
