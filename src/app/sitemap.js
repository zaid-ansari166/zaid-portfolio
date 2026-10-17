import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";

// Served at /sitemap.xml. Home + one entry per project case study (/work/[slug]).
export default function sitemap() {
  const base = siteConfig.url.replace(/\/+$/, "");
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
