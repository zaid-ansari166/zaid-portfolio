"use client";
import React from "react";
import { motion } from "framer-motion";

// Magnetic glass skill chip
function Skill({ name, Icon, color, index }) {
  const ref = React.useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const onMouseLeave = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 200, damping: 12, mass: 0.2 }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ transitionDelay: `${index * 30}ms` }}
      className="group glass rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 cursor-default hover:border-accent-violet/50 transition-colors"
    >
      <Icon
        size={22}
        color={color}
        style={{ color, filter: `drop-shadow(0 0 8px ${color}88)` }}
        className="shrink-0"
      />
      <span className="text-ink/85 text-sm font-medium whitespace-nowrap group-hover:text-ink">
        {name}
      </span>
    </motion.div>
  );
}

export default Skill;
