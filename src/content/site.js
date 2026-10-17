// Site-wide personal config. Everything personal that isn't project/profile copy lives here.
export const siteConfig = {
  name: "Zaid Ansari",
  firstName: "Zaid",
  role: "AI & full-stack developer",
  jobTitle: "AI & Full-Stack Developer",
  company: "Mataaf Technology",
  title: "Zaid Ansari — AI & full-stack developer",
  description:
    "Zaid Ansari is an AI & full-stack developer in Indore, India, building React Native and web products, NestJS and FastAPI backends, real-time video, voice AI and multi-agent LLM systems. Six apps live on the stores, plus freelance products for clients in Canada and the UK.",
  // Set NEXT_PUBLIC_SITE_URL in your env (Vercel → Settings → Environment Variables) to your real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://zaid-ansari-xi.vercel.app",
  locale: "en_US",
  email: "iamzaidansari166@gmail.com",
  location: "Indore, India",
  timeZone: "Asia/Kolkata",
  github: "https://github.com/zaid-ansari166",
  linkedin: "https://www.linkedin.com/in/zaid-ansari-b27677295/",
  // EDIT: set to true/false as your situation changes. Shown in the hero and contact section.
  availability: { available: true, label: "Open to new roles & projects" },
  // EDIT: drop your PDF into /public (e.g. public/Zaid-Ansari-Resume.pdf) and set this to "/Zaid-Ansari-Resume.pdf".
  // While it is null, no download button is rendered anywhere.
  resumeUrl: "/Zaid-Ansari-Resume.pdf",
  nav: [
    { id: "work", label: "Work", href: "/#work" },
    { id: "about", label: "About", href: "/#about" },
    { id: "skills", label: "Expertise", href: "/#skills" },
    { id: "experience", label: "Experience", href: "/#experience" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ],
  keywords: [
    "Zaid Ansari",
    "AI Developer",
    "Full Stack Developer",
    "Voice AI",
    "FastAPI Developer",
    "React Native Developer",
    "Next.js Developer",
    "NestJS Developer",
    "LLM Integration",
    "WebRTC",
    "Indore",
    "India",
    "Portfolio",
  ],
};

export const socials = [
  { id: "github", label: "GitHub", href: siteConfig.github, handle: "zaid-ansari166" },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.linkedin, handle: "zaid-ansari" },
  { id: "email", label: "Email", href: `mailto:${siteConfig.email}`, handle: siteConfig.email },
];
