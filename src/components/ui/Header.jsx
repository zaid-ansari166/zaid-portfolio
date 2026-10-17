"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";
import Wordmark from "./Wordmark";
import { IconClose, IconMenu } from "./Icons";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Sticky header: wordmark · compact section nav (desktop) · contact action. Transparent at the top, gains a
 * near-opaque surface after scrolling, and flips to ink text while over an ivory (light) section.
 * Mobile: full-screen menu with focus trap, Escape, close control and no layout jump.
 */
export default function Header() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(() => pathname.startsWith("/work/"));
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  // one rAF-throttled scroll listener drives: scrolled surface, light/dark flip, active section
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
      const probe = headerH / 2;
      const activeLine = Math.min(window.innerHeight * 0.4, 360);
      let light = false;
      let current = null;
      document.querySelectorAll("[data-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) light = el.getAttribute("data-theme") === "light";
        if (el.id && r.top <= activeLine && r.bottom > activeLine) current = el.id;
      });
      setScrolled(window.scrollY > 24);
      setOnLight(light);
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // sliding indicator under the active desktop link
  useIsoLayoutEffect(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;
    if (!nav || !ind) return;
    const link = isHome && active ? nav.querySelector(`[data-id="${active}"]`) : null;
    if (!link) {
      ind.dataset.visible = "false";
      return;
    }
    const nr = nav.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    ind.style.width = `${Math.max(0, lr.width - 24)}px`;
    ind.style.transform = `translateX(${lr.left - nr.left + 12}px)`;
    ind.dataset.visible = "true";
  }, [active, isHome]);

  // close the menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // mobile menu: scroll lock without layout jump, focus trap, Escape, inert background, focus restore
  useEffect(() => {
    if (!open) return undefined;
    const html = document.documentElement;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, pad: html.style.paddingRight };
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;

    const background = Array.from(document.querySelectorAll("body > header, body > main, body > footer"));
    background.forEach((el) => el.setAttribute("inert", ""));

    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu ? menu.querySelectorAll('a[href], button:not([disabled])') : []).filter((el) => el.offsetParent !== null);
    const first = focusables()[0];
    if (first) first.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && i === f.length - 1) {
        e.preventDefault();
        f[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onMq);

    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      background.forEach((el) => el.removeAttribute("inert"));
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.pad;
      if (toggleRef.current) toggleRef.current.focus();
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header className="site-header" data-scrolled={scrolled ? "true" : "false"} data-on-light={onLight ? "true" : "false"}>
        <div className="container site-header__inner">
          <Wordmark showName="sm" />

          <nav className="nav-desktop" aria-label="Primary" ref={navRef}>
            {siteConfig.nav.map((item, i) => (
              <Link
                key={item.id}
                href={item.href}
                data-id={item.id}
                className="nav-link"
                aria-current={isHome && active === item.id ? "true" : undefined}
              >
                <span className="nav-link__idx" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
            <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" data-visible="false" />
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Link href="/#contact" className="btn btn-primary btn-sm">
                <span className="btn-label">Let&apos;s talk</span>
              </Link>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose size={22} /> : <IconMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" ref={menuRef}>
          <div className="mobile-menu__bar">
            <Wordmark />
            <button type="button" className="menu-toggle" aria-label="Close menu" onClick={close}>
              <IconClose size={22} />
            </button>
          </div>
          <nav aria-label="Primary" className="mt-6">
            <ul>
              {siteConfig.nav.map((item, i) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="mobile-menu__link"
                    style={{ "--i": i }}
                    aria-current={isHome && active === item.id ? "true" : undefined}
                    onClick={close}
                  >
                    <span className="nav-link__idx">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-8 flex flex-col gap-4">
            <Link href="/#contact" className="btn btn-primary btn-lg" onClick={close}>
              <span className="btn-label">Let&apos;s talk</span>
            </Link>
            <p className="text-fg2 small">
              <a className="link-inline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
