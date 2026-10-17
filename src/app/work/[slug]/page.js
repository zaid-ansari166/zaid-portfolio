import { notFound } from "next/navigation";
import { projects, getProject, getAdjacent } from "@/content/projects";
import { siteConfig } from "@/content/site";
import ProjectDetail from "@/components/ProjectDetail";

// Every project page is rendered at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return {};
  const title = `${p.name} — ${p.tagline}`;
  const url = `/work/${p.slug}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: p.summary,
      type: "article",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: { card: "summary_large_image", title, description: p.summary },
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  const { prev, next } = getAdjacent(project.slug);
  return <ProjectDetail project={project} prev={prev} next={next} total={projects.length} />;
}
