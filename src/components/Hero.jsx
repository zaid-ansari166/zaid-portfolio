"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { SiReact, SiNextdotjs, SiOpenai } from "react-icons/si";
import { ClaudeIcon, GeminiIcon } from "./icons/AiIcons";
import { stats } from "../constants/constants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const aiBadges = [
  { name: "OpenAI", Icon: SiOpenai, color: "#10a37f" },
  { name: "Claude", Icon: ClaudeIcon, color: "#D97757" },
  { name: "Gemini", Icon: GeminiIcon, color: "#4285F4" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
];

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto flex items-center overflow-hidden pt-28 pb-16">
      <div className="max-w-7xl mx-auto w-full sm:px-16 px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-ink/80 font-medium">
              Available for work
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-black text-ink leading-[1.05] text-[42px] sm:text-[58px] lg:text-[68px]"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient-animated glow-text">Zaid Ansari</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-3 font-display text-[24px] sm:text-[32px] lg:text-[38px] font-bold text-ink/90 min-h-[48px]"
          >
            <TypeAnimation
              sequence={[
                "AI Engineer",
                2000,
                "Full Stack Developer",
                2000,
                "Mobile App Developer",
                2000,
                "React & Next.js Specialist",
                2000,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              cursor={true}
              className="text-gradient"
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 text-secondary text-[17px] sm:text-[18px] leading-[30px] max-w-xl"
          >
            I build intelligent, scalable web &amp; mobile products — blending{" "}
            <span className="text-ink font-semibold">AI &amp; LLMs</span> with
            production-grade{" "}
            <span className="text-ink font-semibold">
              full-stack engineering
            </span>
            . 3+ years turning ideas into shipped, real-world apps.
          </motion.p>

          {/* AI tool badges */}
          <motion.div variants={item} className="mt-7 flex flex-wrap gap-2.5">
            {aiBadges.map(({ name, Icon, color }) => (
              <span
                key={name}
                className="glass rounded-full px-3.5 py-1.5 flex items-center gap-2 text-sm text-ink/80 hover:text-ink hover:border-accent-violet/40 transition-colors"
              >
                <Icon size={16} color={color} style={{ color }} />
                {name}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white bg-gradient-to-r from-accent-violet via-accent-purple to-accent-cyan bg-[length:200%_auto] hover:bg-[position:right_center] transition-all duration-500 shadow-glow"
            >
              <HiSparkles size={20} />
              View Projects
            </a>
            <a
              href="#contact"
              className="glass rounded-full px-7 py-3.5 font-semibold text-ink hover:border-accent-cyan/50 transition-colors"
            >
              Get in touch
            </a>
            <div className="flex items-center gap-3 ml-1">
              <a
                href="https://github.com/zaid-ansari166"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass w-11 h-11 rounded-full flex items-center justify-center text-ink/80 hover:text-ink hover:border-accent-violet/60 transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/zaid-ansari-b27677295/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass w-11 h-11 rounded-full flex items-center justify-center text-ink/80 hover:text-ink hover:border-accent-violet/60 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:iamzaidansari166@gmail.com"
                aria-label="Email"
                className="glass w-11 h-11 rounded-full flex items-center justify-center text-ink/80 hover:text-ink hover:border-accent-cyan/60 transition-colors"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
                <p className="font-display text-[26px] sm:text-[30px] font-black text-gradient">
                  {s.value}
                </p>
                <p className="text-[12px] text-secondary mt-1 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: glass code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <div className="gradient-border shadow-glow-soft animation">
            <div className="rounded-[1.2rem] bg-[#1f1812] p-6 font-mono text-[14px] leading-relaxed">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-[#b8a88f] text-xs">developer.js</span>
              </div>
              <pre className="whitespace-pre-wrap text-white/90">
<span className="text-amber-400">const</span> <span className="text-amber-200">developer</span> = {"{"}
{"\n  "}name: <span className="text-green-400">&apos;Zaid Ansari&apos;</span>,
{"\n  "}role: <span className="text-green-400">&apos;AI + Full Stack Engineer&apos;</span>,
{"\n  "}experience: <span className="text-amber-300">&apos;3+ years&apos;</span>,
{"\n  "}stack: [<span className="text-green-400">&apos;React&apos;</span>, <span className="text-green-400">&apos;Next.js&apos;</span>, <span className="text-green-400">&apos;Node&apos;</span>],
{"\n  "}ai: [<span className="text-green-400">&apos;OpenAI&apos;</span>, <span className="text-green-400">&apos;Claude&apos;</span>, <span className="text-green-400">&apos;Gemini&apos;</span>],
{"\n  "}available: <span className="text-amber-300">true</span>,
{"\n"}{"}"};
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — minimal mouse */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 hidden sm:flex"
      >
        <div className="w-[26px] h-[44px] rounded-full border-2 border-accent-bronze/50 flex justify-center pt-2.5 hover:border-accent-violet/70 transition-colors">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent-violet"
          />
        </div>
      </a>
    </section>
  );
};

export default Hero;
