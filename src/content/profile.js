// Profile copy — hero, about, expertise, experience, education, contact. Data only; edit freely.
// Every fact here comes from the Sept 2026 resume; nothing is invented. Anything uncertain carries an `// EDIT:` comment.

export const hero = {
  label: "Zaid Ansari — AI & full-stack developer, Indore",
  headline: ["Mobile apps, backends", "and AI features,", "shipped end to end."],
  highlight: "AI features", // rendered in cyan wherever it appears in the headline
  // Scenes the hero particles assemble into, in order; each scene is its lines (uppercase reads best as a dot-matrix).
  stage: { scenes: [["ZAID", "ANSARI"], ["AI &", "FULL-STACK", "DEVELOPER"]] },
  support:
    "I went from intern to full-stack & AI developer at Mataaf Technology, building mobile and web apps on NestJS and FastAPI backends, WebRTC video, voice AI and multi-agent LLM systems. Six apps are live on the stores, plus freelance work for clients in Canada and the UK.",
  primaryCta: { label: "Explore my work", href: "#work" },
  secondaryCta: { label: "Let's talk", href: "#contact" },
  facts: [
    { value: "3.5+", label: "years shipping products" },
    { value: "6", label: "apps live on the stores" },
    { value: "16+", label: "projects delivered" },
    { value: "8+", label: "AI products built" },
  ],
};

export const about = {
  paragraphs: [
    "I've been writing software since 11th grade. In January 2023 I joined Mataaf Technology as an intern, shipped production React components and Express APIs in my first month, and was promoted twice in 18 months — to junior developer, then to full-stack & AI developer. I now lead the AI-first products, review code and mentor juniors.",
    "Day to day that means voice AI agents, multi-agent LLM systems and RAG pipelines built with GPT, Claude and Gemini; microservices in NestJS and FastAPI, containerized with Docker and deployed behind Nginx with CI/CD on AWS; and real-time systems over WebRTC and Socket.io. Alongside the job I've delivered freelance products for clients in Canada and the UK — Pixo, Pixo AI Detector, eazyTalks, Bestby Bites and HirePross — and completed my BCA at Renaissance University, Indore, in 2026.",
  ],
  facts: [
    { label: "Based in", value: "Indore, India" },
    { label: "Currently", value: "Full-Stack & AI Developer, Mataaf Technology" },
    { label: "Education", value: "BCA, Renaissance University (2023–2026)" },
    { label: "Working with", value: "React Native, Next.js, NestJS, FastAPI, LLM APIs" },
  ],
};

export const expertise = [
  {
    index: "01",
    title: "AI engineering",
    enables:
      "Voice AI agents, multi-agent LLM systems and RAG pipelines that turn a model into a working product feature — grounded in a business's own data and connected to its tools through MCP.",
    tools: [
      "OpenAI GPT",
      "Claude",
      "Gemini",
      "RAG pipelines",
      "Multi-agent systems",
      "Voice AI",
      "MCP",
      "Prompt engineering",
      "Python",
    ],
  },
  {
    index: "02",
    title: "Web front ends",
    enables:
      "Product front ends in React, Next.js, Angular and Vue that stay fast and maintainable as they grow, plus desktop builds with Electron.",
    tools: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Vue.js",
      "Nuxt.js",
      "Electron.js",
      "Vite",
      "Redux",
      "Zustand",
      "Tailwind CSS",
    ],
  },
  {
    index: "03",
    title: "Backend & real-time systems",
    enables:
      "REST APIs and microservices in Node.js, NestJS and FastAPI on MongoDB or PostgreSQL, with peer-to-peer video calling over WebRTC and Socket.io messaging at production scale.",
    tools: [
      "Node.js",
      "NestJS",
      "Express",
      "FastAPI",
      "MongoDB",
      "PostgreSQL",
      "Firebase",
      "REST APIs",
      "Microservices",
      "WebRTC",
      "Socket.io",
    ],
  },
  {
    index: "04",
    title: "Mobile & native",
    enables:
      "Cross-platform apps in React Native and Expo, with native Kotlin, Java and Swift modules where the platform needs them — taken through auth, push, in-app purchases and store release.",
    tools: ["React Native", "Expo", "Kotlin", "Java", "Swift"],
  },
  {
    index: "05",
    title: "CMS & growth",
    enables:
      "WordPress sites built and managed end to end, with on-page SEO, AEO and GEO strategy measured in Google Analytics and Search Console.",
    tools: ["WordPress", "SEO", "AEO", "GEO", "Google Analytics", "Search Console"],
  },
  {
    index: "06",
    title: "Cloud & delivery",
    enables:
      "Docker images behind Nginx, CI/CD pipelines and AWS deployments owned end to end, so releases are routine and hosting stays maintained.",
    tools: ["Docker", "Nginx", "AWS", "CI/CD", "Git", "Website management", "Figma", "Postman"],
  },
];

export const experience = [
  {
    role: "Full-Stack & AI Developer",
    company: "Mataaf Technology",
    location: "Remote",
    start: "Jul 2024",
    end: "Present",
    points: [
      "Lead development of AI-first products — voice AI agents, multi-agent LLM systems, RAG pipelines and process automation with GPT, Claude and Gemini; review code, mentor juniors and drive Agile delivery.",
      "Architected backends as microservices on Node.js/NestJS and Python/FastAPI with Docker, Nginx and CI/CD on AWS, owning deployments end to end.",
      "Engineered real-time systems: peer-to-peer audio/video calling over WebRTC and Socket.io messaging at production scale.",
      "Shipped cross-platform mobile apps in React Native with native Kotlin/Swift modules — six live on Google Play, two on the App Store and a third in review, 10K+ downloads — and manage client websites end to end: WordPress builds, Docker-based hosting and SEO / AEO / GEO strategy.",
    ],
  },
  {
    role: "Junior Full-Stack Developer",
    company: "Mataaf Technology",
    location: "Remote",
    start: "Apr 2023",
    end: "Jun 2024",
    points: [
      "Built full-stack features across React, Next.js and Angular front ends and Node.js/NestJS backends on MongoDB and PostgreSQL.",
      "Released React Native apps end to end: authentication, push notifications, in-app purchases and store launches.",
      "Integrated OpenAI GPT APIs into chatbots and internal tools; delivered client WordPress sites with on-page SEO and performance tuning.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Mataaf Technology",
    location: "Remote",
    start: "Jan 2023",
    end: "Mar 2023",
    points: [
      "Shipped production UI components in React within the first month.",
      "Built REST APIs in Express that went to production in the same month.",
      "Promoted to Junior Developer after three months.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Renaissance University",
    location: "Indore, Madhya Pradesh",
    period: "2023–2026",
    note: "Completed 2026",
  },
  {
    degree: "Higher Secondary Education (12th)",
    school: "St. Umar Higher Secondary School",
    location: "Indore, Madhya Pradesh",
    period: "2023",
    note: "Commerce with IP (Informatics Practices)",
  },
];

export const contact = {
  title: "Let's build the next one.",
  highlight: "next one", // rendered in cyan
  text: "I take on freelance and contract work for product teams — AI features, React Native apps and full-stack builds — and I'm open to the right role. Send a few lines about what you're working on; I usually reply within a day.",
  note: "Goes straight to my inbox. No newsletter, no automated follow-ups.",
};
