"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { navLinks } from "@/constants/constants";
import { styles } from "@/styles";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-30 transition-all duration-300 ${
        scrolled ? "glass !py-3" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-violet via-accent-purple to-accent-cyan flex items-center justify-center font-display font-black text-white text-[18px] shadow-glow">
            ZA
          </span>
          <span className="text-ink text-[22px] font-bold font-display hidden sm:block">
            Zaid<span className="text-gradient"> Ansari</span>
          </span>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-9 items-center">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`relative text-[16px] font-medium cursor-pointer transition-colors ${
                active === nav.title ? "text-ink" : "text-secondary hover:text-ink"
              }`}
              onClick={() => setActive(nav.title)}
            >
              <a data-scroll-to href={`#${nav.id}`}>
                {nav.title}
              </a>
              {active === nav.title && (
                <span className="absolute -bottom-1.5 left-0 w-full h-0.5 rounded-full bg-accent-gradient" />
              )}
            </li>
          ))}
          <a
            href="#contact"
            onClick={() => setActive("Contact")}
            className="glass rounded-full px-5 py-2 text-ink font-semibold hover:border-accent-cyan/60 transition-colors"
          >
            Let&apos;s talk
          </a>
        </ul>

        {/* Mobile */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            aria-label="Toggle menu"
            onClick={() => setToggle(!toggle)}
            className="text-ink"
          >
            {toggle ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 glass absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-2xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-ink" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a data-scroll-to href={`#${nav.id}`}>
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
