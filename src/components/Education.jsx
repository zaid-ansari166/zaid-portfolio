'use client'
import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "./hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { HiAcademicCap } from "react-icons/hi";

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Academic Background</p>
        <h2 className={styles.sectionHeadText}>Education.</h2>
      </motion.div>

      <div className='mt-10 flex flex-col gap-7'>
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className='bg-tertiary bg-opacity-70 p-8 rounded-2xl'
        >
          <div className='flex items-start gap-5'>
            <div className='flex justify-center items-center w-16 h-16 rounded-full bg-[#915EFF] flex-shrink-0'>
              <HiAcademicCap size={32} className="text-white" />
            </div>

            <div className='flex-1'>
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3'>
                <div>
                  <h3 className='text-white text-[24px] font-bold'>
                    Bachelor of Computer Applications (BCA)
                  </h3>
                  <p className='text-secondary text-[18px] font-semibold mt-1'>
                    Renaissance University
                  </p>
                </div>
                <p className='text-secondary text-[16px] font-medium mt-2 sm:mt-0'>
                  2023 - 2026
                </p>
              </div>

              <p className='text-white-100 text-[16px] leading-[24px]'>
                Currently pursuing Bachelor of Computer Applications with a focus on full-stack development,
                software engineering principles, and modern web technologies.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("", "", 0.2, 1)}
          className='bg-tertiary bg-opacity-70 p-8 rounded-2xl'
        >
          <div className='flex items-start gap-5'>
            <div className='flex justify-center items-center w-16 h-16 rounded-full bg-[#915EFF] flex-shrink-0'>
              <HiAcademicCap size={32} className="text-white" />
            </div>

            <div className='flex-1'>
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3'>
                <div>
                  <h3 className='text-white text-[24px] font-bold'>
                    Higher Secondary Education (12th)
                  </h3>
                  <p className='text-secondary text-[18px] font-semibold mt-1'>
                    St. Umar Higher Secondary School
                  </p>
                  <p className='text-secondary text-[14px] mt-1'>
                    Indore, Madhya Pradesh
                  </p>
                </div>
                <p className='text-secondary text-[16px] font-medium mt-2 sm:mt-0'>
                  2023
                </p>
              </div>

              <p className='text-white-100 text-[16px] leading-[24px]'>
                Completed Higher Secondary Education with Commerce stream and Information Practice (IP), building a strong foundation in business concepts and programming.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
