import {
  mobile,
  backend,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  jobit,
  inkSync,
  tracker,
  threejs,
  nextjs,
  express,
  java,
  jwt,
  nextauth,
  socialSphere,
  aIchatbot,
  meta,
  mataaf,
} from "../assets";

// Additional skill imports - add these after you add the icon files
import reactnative from "../assets/tech/reactnative.png";
import angular from "../assets/tech/angular.png";
import nestjs from "../assets/tech/nestjs.png";
import postgresql from "../assets/tech/postgresql.png";
import sql from "../assets/tech/sql.png";
import webrtc from "../assets/tech/webrtc.png";
import socketio from "../assets/tech/socketio.png";
import aws from "../assets/tech/aws.png";
import cicd from "../assets/tech/cicd.png";
import restapi from "../assets/tech/restapi.png";
import microservices from "../assets/tech/microservices.png";
import bootstrap from "../assets/tech/bootstrap.png";

export const navLinks = [
  {
    id: "about",
    title: "About",
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

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: mobile,
  },
  {
    title: "Programmer",
    icon: backend,
  },
  // {
  //   title: "Creator",
  //   icon: creator,
  // },
];

const technologies = [
  {
    name: "React Native",
    icon: reactjs,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },
  {
    name: "Angular",
    icon: angular,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "NestJS",
    icon: nestjs,
  },
  {
    name: "Express JS",
    icon: express,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "PostgreSQL",
    icon: postgresql,
  },
  {
    name: "SQL",
    icon: sql,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Bootstrap",
    icon: bootstrap,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "WebRTC",
    icon: webrtc,
  },
  {
    name: "Socket.io",
    icon: socketio,
  },
  {
    name: "REST APIs",
    icon: restapi,
  },
  {
    name: "Microservices",
    icon: microservices,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "AWS",
    icon: aws,
  },
  {
    name: "CI/CD",
    icon: cicd,
  },
  {
    name: "JWT",
    icon: jwt,
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
    source_code_link: "https://github.com/zaidansari",
  },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Mataaf Technology | Remote",
    icon: mataaf,
    iconBg: "#FFFFFF",
    date: "01/2023 - Present",
    points: [
      "Developed and maintained scalable full-stack web and mobile applications using React, Angular, Node.js, Express, MongoDB, and PostgreSQL.",
      "Engineered real-time communication features utilizing WebRTC, enhancing user interaction and collaboration within applications.",
      "Containerized applications using Docker and established CI/CD pipelines to automate testing and deployment on AWS, increasing deployment efficiency.",
      "Designed and implemented backend services following a microservices architecture, improving system scalability and maintainability.",
      "Integrated AI tools and chatbots to automate processes and provide advanced analytics, increasing overall application intelligence.",
      "Utilized Git for version control in a collaborative team environment, following Agile methodologies to deliver high-quality software on time.",
    ],
  },
];

// const testimonials = [
//   {
//     testimonial:
//       "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
//     name: "Sara Lee",
//     designation: "CFO",
//     company: "Acme Co",
//     image: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
//   {
//     testimonial:
//       "I've never met a web developer who truly cares about their clients' success like Rick does.",
//     name: "Chris Brown",
//     designation: "COO",
//     company: "DEF Corp",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//   },
//   {
//     testimonial:
//       "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
//     name: "Lisa Wang",
//     designation: "CTO",
//     company: "456 Enterprises",
//     image: "https://randomuser.me/api/portraits/women/6.jpg",
//   },
// ];

export {
  services,
  technologies,
  experiences,
  //  testimonials,
  projects,
};
