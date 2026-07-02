"use client";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../constants/constants";
import { SectionWrapper } from "./hoc";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import Image from "next/image";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(14px)",
        color: "#2e2521",
        border: "1px solid rgba(176,135,90,0.3)",
        borderRadius: "1.25rem",
        boxShadow: "0 20px 60px -25px rgba(201,162,39,0.5)",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(201,162,39,0.45)" }}
      date={experience.date}
      iconStyle={{
        background: experience.iconBg,
        boxShadow: "0 0 0 4px rgba(201,162,39,0.5), 0 0 24px rgba(176,135,90,0.5)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <Image
            src={experience.icon}
            alt={experience.company_name}
            className="w-[100%] h-[100%] object-contain rounded-full"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-ink text-[24px] font-bold font-display">
          {experience.title}
        </h3>
        <p
          className="text-accent-cyan text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="rgba(201,162,39,0.3)">
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
