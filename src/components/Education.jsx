"use client";
import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "./hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { HiAcademicCap } from "react-icons/hi";

const educationList = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Renaissance University",
    location: "Indore, Madhya Pradesh",
    period: "2023 - 2026",
    desc: "Focused on full-stack development, software engineering principles, data structures, and modern web technologies.",
  },
  {
    degree: "Higher Secondary Education (12th)",
    school: "St. Umar Higher Secondary School",
    location: "Indore, Madhya Pradesh",
    period: "2023",
    desc: "Completed Commerce stream with Information Practice (IP), building a strong foundation in business concepts and programming.",
  },
];

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Academic Background</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <div className="mt-12 flex flex-col gap-6">
        {educationList.map((edu, index) => (
          <motion.div
            key={edu.degree}
            variants={fadeIn("up", "spring", index * 0.15, 0.75)}
            className="glass-card rounded-3xl p-8"
          >
            <div className="flex items-start gap-5">
              <div className="flex justify-center items-center w-14 h-14 rounded-2xl flex-shrink-0 bg-gradient-to-br from-accent-violet to-accent-cyan shadow-glow">
                <HiAcademicCap size={28} className="text-white" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                  <div>
                    <h3 className="text-ink text-[22px] font-bold font-display">
                      {edu.degree}
                    </h3>
                    <p className="text-accent-cyan text-[17px] font-semibold mt-1">
                      {edu.school}
                    </p>
                    <p className="text-secondary text-[14px] mt-1">
                      {edu.location}
                    </p>
                  </div>
                  <span className="glass rounded-full px-4 py-1.5 text-secondary text-[14px] font-medium whitespace-nowrap h-fit">
                    {edu.period}
                  </span>
                </div>

                <p className="text-ink-100 text-[15px] leading-[24px]">
                  {edu.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
