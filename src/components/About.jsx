"use client";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { services } from "../constants/constants";
import { SectionWrapper } from "./hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";

const ServiceCard = ({ index, title, Icon, color, description }) => (
  <Tilt
    className="w-full"
    glareEnable={false}
    tiltMaxAngleX={8}
    tiltMaxAngleY={8}
    scale={1.02}
    transitionSpeed={1200}
  >
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="glass-card rounded-3xl p-7 h-full"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: `linear-gradient(135deg, ${color}33, ${color}11)`,
          border: `1px solid ${color}44`,
          boxShadow: `0 0 30px -8px ${color}66`,
        }}
      >
        <Icon size={28} style={{ color }} />
      </div>
      <h3 className="text-ink text-[20px] font-bold font-display">{title}</h3>
      <p className="mt-3 text-secondary text-[15px] leading-[24px]">
        {description}
      </p>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-5 text-secondary text-[17px] sm:text-[18px] max-w-3xl leading-[32px]"
      >
        I&apos;m a results-driven{" "}
        <span className="text-ink font-semibold">
          Full Stack &amp; AI Developer
        </span>{" "}
        with <span className="text-ink font-semibold">3+ years</span> of
        professional experience across the MERN &amp; MEAN stacks. I specialize
        in designing, building, and deploying scalable web and mobile
        applications — and increasingly, in weaving{" "}
        <span className="text-ink font-semibold">
          AI &amp; large language models
        </span>{" "}
        (OpenAI, Claude, Gemini) into products to make them smarter. From
        real-time systems with WebRTC to AI chatbots and microservices, I love
        turning complex problems into clean, high-performance experiences.
      </motion.p>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
