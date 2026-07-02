"use client";
import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "./hoc";
import { projects } from "../constants/constants";
import { fadeIn, textVariant } from "../utils/motion";
import { HiLink, HiDownload, HiVolumeUp, HiVolumeOff, HiCheckCircle, HiLockClosed } from "react-icons/hi";
import { ImGithub } from "react-icons/im";
import { FaGooglePlay } from "react-icons/fa";
import Image from "next/image";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  video_url,
  website_url,
  source_code_link,
  features,
  live_link,
  download_link,
  playStore,
}) => {
  const refLiveLink = React.useRef(null);
  const refSourceCodeLink = React.useRef(null);
  const refDownloadLink = React.useRef(null);
  const iframeRef = React.useRef(null);
  const [positionLiveLink, setPositionLiveLink] = React.useState({ x: 0, y: 0 });
  const [positionSourceCodeLink, setPositionSourceCodeLink] = React.useState({ x: 0, y: 0 });
  const [positionDownloadLink, setPositionDownloadLink] = React.useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = React.useState(true);

  const onMouseMoveLiveLink = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = refLiveLink.current.getBoundingClientRect();
    setPositionLiveLink({ x: clientX - (left + width / 2), y: clientY - (top + height / 2) });
  };
  const onMouseMoveSourceCodeLink = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = refSourceCodeLink.current.getBoundingClientRect();
    setPositionSourceCodeLink({ x: clientX - (left + width / 2), y: clientY - (top + height / 2) });
  };
  const onMouseMoveDownloadLink = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = refDownloadLink.current.getBoundingClientRect();
    setPositionDownloadLink({ x: clientX - (left + width / 2), y: clientY - (top + height / 2) });
  };
  const onMouseLeave = () => {
    setPositionLiveLink({ x: 0, y: 0 });
    setPositionSourceCodeLink({ x: 0, y: 0 });
    setPositionDownloadLink({ x: 0, y: 0 });
  };

  const getYouTubeEmbedUrl = (url, muted) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&fs=0&iv_load_policy=3&disablekb=1&enablejsapi=1&playsinline=1`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (iframeRef.current) {
      iframeRef.current.src = getYouTubeEmbedUrl(video_url, !isMuted);
    }
  };

  const btnBase =
    "glass w-12 h-12 rounded-full flex items-center justify-center text-accent-violet hover:text-accent-brown hover:border-accent-violet/60 transition-colors";
  const spring = { type: "spring", stiffness: 130, damping: 50, mass: 0.1 };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="glass-card rounded-3xl p-5 sm:p-6"
    >
      <h3 className="text-ink font-bold text-[24px] sm:text-[28px] flex gap-2 items-center my-2 font-display">
        {name}
        <HiLink size={16} className="text-accent-cyan" />
      </h3>

      <div className="lg:flex gap-10 lg:flex-row lg:justify-between lg:items-center">
        <div className="lg:w-[90%] lg:h-[90%] w-full h-full">
          <div className="relative flex justify-between transition-all duration-500">
            {video_url ? (
              <>
                <iframe
                  ref={iframeRef}
                  src={getYouTubeEmbedUrl(video_url, isMuted)}
                  title={`${name} video`}
                  className="h-full w-full object-cover rounded-2xl aspect-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="absolute bottom-4 right-4 glass hover:border-accent-violet/40 text-ink p-3 rounded-full transition-all duration-200 z-10"
                >
                  {isMuted ? <HiVolumeOff size={22} /> : <HiVolumeUp size={22} />}
                </button>
              </>
            ) : website_url ? (
              <>
                <iframe
                  src={website_url}
                  title={`${name} website`}
                  className="hidden lg:block h-full w-full object-cover rounded-2xl aspect-video"
                  allowFullScreen
                />
                <img
                  src={image.src}
                  alt={name}
                  className="lg:hidden h-full w-full object-cover rounded-2xl"
                />
              </>
            ) : playStore ? (
              <a
                href={download_link}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-full w-full aspect-video rounded-2xl flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-accent-violet/20 via-accent-purple/10 to-accent-cyan/20 border border-accent-bronze/30 hover:border-accent-violet/60 transition-colors"
              >
                {image && (
                  <img
                    src={image.src}
                    alt={`${name} icon`}
                    className="w-24 h-24 rounded-[22px] object-contain shadow-glow group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <span className="font-display font-bold text-ink text-[22px]">
                  {name.split("–")[0].trim()}
                </span>
                <span className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-ink text-sm font-semibold group-hover:border-accent-violet/60 transition-colors">
                  <FaGooglePlay className="text-accent-violet" size={18} /> View on Google Play
                </span>
              </a>
            ) : image ? (
              <img src={image.src} alt={name} className="h-full w-full object-cover rounded-2xl" />
            ) : (
              <div className="h-full w-full aspect-video rounded-2xl flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent-violet/25 via-accent-purple/15 to-accent-cyan/25 border border-accent-bronze/25">
                <HiLockClosed size={44} className="text-accent-violet" />
                <span className="font-display font-bold text-ink text-[22px]">{name.split("–")[0].trim()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex sm:flex lg:flex-col gap-5 mt-4 lg:mt-0">
          {live_link && (
            <motion.div ref={refLiveLink} onMouseMove={onMouseMoveLiveLink} onMouseLeave={onMouseLeave}
              animate={{ x: positionLiveLink.x, y: positionLiveLink.y }} transition={spring}>
              <button onClick={() => window.open(live_link, "_blank")} aria-label="Live link" className={btnBase}>
                <HiLink size={26} />
              </button>
            </motion.div>
          )}
          {source_code_link && (
            <motion.div ref={refSourceCodeLink} onMouseMove={onMouseMoveSourceCodeLink} onMouseLeave={onMouseLeave}
              animate={{ x: positionSourceCodeLink.x, y: positionSourceCodeLink.y }} transition={spring}>
              <button onClick={() => window.open(source_code_link, "_blank")} aria-label="Source code" className={btnBase}>
                <ImGithub size={24} />
              </button>
            </motion.div>
          )}
          {download_link && (
            <motion.div ref={refDownloadLink} onMouseMove={onMouseMoveDownloadLink} onMouseLeave={onMouseLeave}
              animate={{ x: positionDownloadLink.x, y: positionDownloadLink.y }} transition={spring}>
              <button onClick={() => window.open(download_link, "_blank")} aria-label="Download" className={btnBase}>
                <HiDownload size={26} />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-ink-soft text-[16px] sm:text-[18px] leading-[28px]">{description}</p>

        {features?.length > 0 && (
          <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-ink-soft text-[14px] leading-[22px]">
                <HiCheckCircle size={18} className="text-accent-cyan shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              title={tag.name}
              className="glass rounded-full px-3 py-1 text-[14px] font-semibold text-ink/85"
            >
              <span className={tag.color}>#{tag.name}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          A selection of real-world products I&apos;ve designed, built, and
          shipped — from AI-powered apps to real-time platforms and mobile apps
          live on the Play Store. Each one reflects how I solve complex problems
          across the full stack.
        </motion.p>
      </div>

      <span className="hash-span" id="work">&nbsp;</span>
      <div className="mt-16 flex flex-col gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
