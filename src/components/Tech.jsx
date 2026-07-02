"use client";
import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "./hoc";
import { skillGroups } from "../constants/constants";
import { fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import Skill from "./Skills";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I work with</p>
        <h2 className={styles.sectionHeadText}>Skills.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        A modern, AI-first toolkit — from large language models to full-stack
        web, mobile, and cloud infrastructure.
      </motion.p>

      <div className="mt-14 grid lg:grid-cols-2 gap-6">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            variants={fadeIn("up", "spring", gi * 0.15, 0.6)}
            className="glass-card rounded-3xl p-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: group.accent,
                  boxShadow: `0 0 14px ${group.accent}`,
                }}
              />
              <h3 className="text-ink text-[22px] font-bold font-display">
                {group.title}
              </h3>
              <span
                className="flex-1 h-px"
                style={{
                  background: `linear-gradient(90deg, ${group.accent}55, transparent)`,
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2.5">
              {group.skills.map((skill, i) => (
                <Skill key={skill.name} index={i} {...skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
