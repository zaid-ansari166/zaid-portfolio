import { carrent, jobit, inkSync, aIchatbot, image, mataaf } from "../assets";
import pixo from "../assets/pixo.png";

// Brand / tech icons (react-icons keeps them crisp at any size)
import {
  SiOpenai,
  SiPython,
  SiVercel,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiWebrtc,
  SiSocketdotio,
  SiJsonwebtokens,
  SiDocker,
  SiAmazon,
  SiGit,
  SiFigma,
  SiPostman,
} from "react-icons/si";
import {
  FaRobot,
  FaBrain,
  FaServer,
  FaCubes,
  FaInfinity,
  FaMobileAlt,
} from "react-icons/fa";
import { ClaudeIcon, GeminiIcon, HuggingFaceIcon } from "../components/icons/AiIcons";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "work",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

// Quick-glance stats shown in the hero
const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "12+", label: "Projects Shipped" },
  { value: "6+", label: "AI Integrations" },
  { value: "4", label: "Apps on Play Store" },
];

// "What I do" cards
const services = [
  {
    title: "AI Engineering",
    Icon: FaBrain,
    color: "#e879f9",
    description:
      "Integrating LLMs (GPT, Claude, Gemini), building RAG pipelines, chatbots & AI-powered features.",
  },
  {
    title: "Full Stack Web",
    Icon: SiReact,
    color: "#22d3ee",
    description:
      "Scalable MERN & MEAN apps with React, Next.js, Angular, Node.js, NestJS & Express.",
  },
  {
    title: "Mobile Apps",
    Icon: FaMobileAlt,
    color: "#915EFF",
    description:
      "Cross-platform iOS & Android apps with React Native — shipped & live on the Play Store.",
  },
  {
    title: "Real-time & Cloud",
    Icon: FaServer,
    color: "#3b82f6",
    description:
      "WebRTC, Socket.io, microservices, Docker, CI/CD & AWS deployments built to scale.",
  },
];

// Skills grouped by category for the glass skills panels
const skillGroups = [
  {
    title: "AI / ML",
    accent: "#e879f9",
    skills: [
      { name: "OpenAI (GPT)", Icon: SiOpenai, color: "#10a37f" },
      { name: "Claude", Icon: ClaudeIcon, color: "#D97757" },
      { name: "Gemini", Icon: GeminiIcon, color: "#4285F4" },
      { name: "Hugging Face", Icon: HuggingFaceIcon, color: "#FFD21E" },
      { name: "Vercel AI SDK", Icon: SiVercel, color: "#ffffff" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "Prompt Engineering", Icon: FaBrain, color: "#e879f9" },
      { name: "Chatbots & RAG", Icon: FaRobot, color: "#22d3ee" },
    ],
  },
  {
    title: "Frontend",
    accent: "#22d3ee",
    skills: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { name: "React Native", Icon: SiReact, color: "#61DAFB" },
      { name: "Angular", Icon: SiAngular, color: "#DD0031" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Redux", Icon: SiRedux, color: "#764ABC" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
    ],
  },
  {
    title: "Backend",
    accent: "#915EFF",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
      { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
      { name: "Express", Icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "REST APIs", Icon: FaServer, color: "#22d3ee" },
      { name: "Microservices", Icon: FaCubes, color: "#915EFF" },
      { name: "WebRTC", Icon: SiWebrtc, color: "#94a3b8" },
      { name: "Socket.io", Icon: SiSocketdotio, color: "#ffffff" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#e879f9" },
    ],
  },
  {
    title: "DevOps & Tools",
    accent: "#3b82f6",
    skills: [
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "AWS", Icon: SiAmazon, color: "#FF9900" },
      { name: "CI/CD", Icon: FaInfinity, color: "#22d3ee" },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
    ],
  },
];

const projects = [
  {
    name: "MSpark – Random Chat & Video Calling App",
    description:
      "MSpark is a real-time random chat and video calling mobile application, similar to Omegle, where users can instantly connect with random people across the platform. Built with React Native for mobile and NestJS for backend, featuring WebRTC for seamless peer-to-peer communication and Socket.io for real-time messaging. The app provides a secure, fast, and engaging user experience with smooth UI animations and reliable backend infrastructure.",
    features: [
      "Random user-to-user text chat and video calling with instant connection",
      "WebRTC integration for high-quality peer-to-peer video and audio calls",
      "Real-time messaging using Socket.io for instant communication",
      "Secure and scalable backend built with NestJS and MongoDB",
      "Smooth and responsive mobile UI using React Native with optimized performance",
      "User authentication and privacy controls for safe interactions",
    ],
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
      {
        name: "NestJS",
        color: "green-text-gradient",
      },
      {
        name: "WebRTC",
        color: "pink-text-gradient",
      },
      {
        name: "Socket.io",
        color: "orange-text-gradient",
      },
      {
        name: "MongoDB",
        color: "blue-text-gradient",
      },
    ],
    image: carrent,
    video_url: "https://www.youtube.com/watch?v=Apx2H9lwRUo",
    download_link: "https://play.google.com/store/apps/details?id=com.mataaftech.mspark",
  },
  {
    name: "GloFi – Multi-Chain Crypto Wallet & Web3 Super App",
    description:
      "GloFi is a comprehensive cross-platform crypto wallet (iOS & Android) that empowers users to securely manage digital assets across multiple blockchains without the complexity of manual bridging. Built with React Native and NestJS, GloFi provides a seamless Web3 experience with advanced features like cross-chain swaps, multi-asset support, and integrated DApp browser. The app focuses on delivering enterprise-grade security combined with an intuitive, premium user interface for both beginners and experienced crypto investors.",
    features: [
      "Buy, sell, store, and swap crypto assets with ease and security",
      "Multi-chain support including Bitcoin, Ethereum, Solana, Polygon, and more",
      "Cross-chain swaps without manual bridging for seamless asset transfers",
      "Integrated Web3 gateway to explore tokens, DApps, and NFTs",
      "Advanced security features including biometric authentication and encrypted storage",
      "Real-time price tracking and portfolio management",
      "Premium user experience with smooth animations and intuitive navigation",
    ],
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
      {
        name: "NestJS",
        color: "green-text-gradient",
      },
      {
        name: "Web3",
        color: "pink-text-gradient",
      },
      {
        name: "MongoDB",
        color: "orange-text-gradient",
      },
      {
        name: "Blockchain",
        color: "blue-text-gradient",
      },
    ],
    image: jobit,
    website_url: "https://www.glofi.io/",
    download_link: "https://play.google.com/store/apps/details?id=io.glofi.glofiapp",
  },
  {
    name: "MataafHR – HRM System",
    description:
      "MataafHR is a comprehensive web-based Human Resource Management (HRM) system designed to streamline company employee management and HR operations. Built with Angular for a dynamic frontend and Node.js for a robust backend, the system provides an all-in-one solution for managing employee data, attendance tracking, and HR workflows. The application features a clean, responsive UI built with Angular and Bootstrap, ensuring accessibility across all devices and providing HR teams with powerful tools to manage their workforce efficiently.",
    features: [
      "Complete employee management system with profiles, roles, and detailed records",
      "Attendance tracking and management with automated reports",
      "Comprehensive HR workflows including leave management and approvals",
      "Role-based access control for different user types (Admin, HR, Employees)",
      "Clean and responsive UI using Angular and Bootstrap for seamless experience",
      "Secure backend APIs built with Node.js and MongoDB for data integrity",
      "Dashboard with analytics and insights for HR decision-making",
      "Employee self-service portal for viewing information and making requests",
    ],
    tags: [
      {
        name: "Angular",
        color: "blue-text-gradient",
      },
      {
        name: "Bootstrap",
        color: "green-text-gradient",
      },
      {
        name: "Node.js",
        color: "pink-text-gradient",
      },
      {
        name: "MongoDB",
        color: "orange-text-gradient",
      },
    ],
    image: inkSync,
    website_url: "https://www.mataafhr.com/",
  },
  {
    name: "AI Chatbot Builder – Web Application",
    description:
      "An intelligent AI chatbot web application that empowers users to create and deploy custom chatbots for their websites without any complex setup or coding knowledge. Built with React.js for an intuitive frontend and NestJS for a powerful backend, the platform integrates advanced AI APIs to deliver natural, context-aware conversations. Users can customize chatbot behavior, train it on their specific business data, and seamlessly integrate it into their websites with a simple embed code. The scalable architecture handles multiple chatbot instances efficiently, making it perfect for businesses of all sizes.",
    features: [
      "Intuitive drag-and-drop chatbot builder with customizable workflows",
      "AI-powered responses using advanced language models for natural conversations",
      "Train chatbots on custom business data and FAQs for domain-specific responses",
      "Easy website integration with simple embed code or API",
      "Scalable backend built with NestJS for handling multiple chatbot instances",
      "Real-time analytics dashboard to track conversations and user interactions",
      "Customizable chatbot appearance to match website branding",
      "Multi-channel support including web chat, WhatsApp, and more",
    ],
    tags: [
      {
        name: "React.js",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
      {
        name: "NestJS",
        color: "pink-text-gradient",
      },
      {
        name: "AI APIs",
        color: "orange-text-gradient",
      },
    ],
    image: aIchatbot,
    source_code_link: "https://github.com/zaid-ansari166",
  },
  {
    name: "MataafPOS – Point of Sale App",
    description:
      "MataafPOS is a mobile point-of-sale application designed to simplify business operations for small and medium businesses. Built with React Native and Firebase, the app enables merchants to manage sales, print bills using thermal printers, and track business performance — all from their phone. With an intuitive interface similar to Ezo POS, MataafPOS streamlines billing, inventory management, and daily operations, making it easier for business owners to focus on growing their business.",
    features: [
      "Fast and intuitive billing system with thermal printer support",
      "Real-time inventory and stock management",
      "Sales tracking and business analytics dashboard",
      "Firebase-powered backend for reliable data sync across devices",
      "Offline support for uninterrupted business operations",
      "Easy product catalog management with categories and variants",
    ],
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
      {
        name: "Firebase",
        color: "green-text-gradient",
      },
      {
        name: "Thermal Printing",
        color: "pink-text-gradient",
      },
    ],
    image: image,
    download_link: "https://play.google.com/store/apps/details?id=com.mataaftech.mataafpos",
  },
  {
    name: "Pixo – Private Photo Vault",
    description:
      "Pixo is a privacy-first mobile app that keeps your most personal photos, videos and files truly private — locked behind a 6-digit passcode and biometrics, hidden from your gallery, and even disguised as a fully working calculator. Built with React Native, it pairs a clean, modern UI with secure, encrypted cloud storage, giving users complete control over their private content.",
    features: [
      "Secure vault for photos, videos & files behind a 6-digit passcode",
      "Instant unlock with fingerprint or face biometrics, plus auto-lock on exit",
      "Calculator disguise — opens as a real calculator, hold '+' to reveal the vault",
      "Disguise the app icon as Calculator, Notes or Photos for total discretion",
      "Hide any file type — photos, videos, documents, PDFs & audio",
      "Organise items into albums, mark favourites, and search & filter instantly",
      "One-tap clean-up to remove originals from the device gallery",
      "Encrypted cloud storage with email/Google sign-in and account recovery",
    ],
    tags: [
      { name: "React Native", color: "blue-text-gradient" },
      { name: "Biometric Auth", color: "green-text-gradient" },
      { name: "Encryption", color: "pink-text-gradient" },
      { name: "Cloud Storage", color: "orange-text-gradient" },
    ],
    image: pixo,
    playStore: true,
    download_link: "https://play.google.com/store/apps/details?id=com.pixovault.app",
  },
];

const experiences = [
  {
    title: "Full Stack & AI Developer",
    company_name: "Mataaf Technology | Remote",
    icon: mataaf,
    iconBg: "#FFFFFF",
    date: "01/2023 - Present",
    points: [
      "Built and shipped AI-powered features — integrating LLM APIs (OpenAI GPT, Claude, Gemini), chatbots, and RAG pipelines to automate workflows and deliver intelligent, context-aware experiences.",
      "Developed and maintained scalable full-stack web and mobile applications using React, Next.js, Angular, React Native, Node.js, NestJS, Express, MongoDB, and PostgreSQL.",
      "Engineered real-time communication features with WebRTC and Socket.io, powering live video calling and messaging at scale.",
      "Containerized applications with Docker and set up CI/CD pipelines to automate testing and deployment on AWS, improving release velocity.",
      "Designed backend services following a microservices architecture, improving system scalability and maintainability.",
      "Collaborated in an Agile team using Git, delivering high-quality, production-ready software on time.",
    ],
  },
];

export {
  stats,
  services,
  skillGroups,
  experiences,
  projects,
};
