import { siteConfig } from "@/content/site";

// Served at /robots.txt.
export default function robots() {
  const base = siteConfig.url.replace(/\/+$/, "");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
