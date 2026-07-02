import { siteConfig } from "@/lib/site";

export default function manifest() {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortTitle,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#050816",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
