import Link from "next/link";
import { siteConfig, socials } from "@/content/site";
import Wordmark from "./Wordmark";
import BackToTop from "./BackToTop";
import { IconGithub, IconLinkedin, IconMail } from "./Icons";

const socialIcon = { github: IconGithub, linkedin: IconLinkedin, email: IconMail };

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-theme="dark" className="site-footer">
      <div className="container">
        <hr className="rule" />
        <div className="grid gap-10 py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_auto] md:items-start md:gap-8 md:py-16">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-[34ch] text-sec-fg2">
              {siteConfig.role}. {siteConfig.location}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label mb-4">Index</p>
            <ul className="grid gap-1">
              {siteConfig.nav.map((item, i) => (
                <li key={item.id}>
                  <Link href={item.href} className="link-arrow" style={{ minHeight: 40 }}>
                    <span className="nav-link__idx" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="link-arrow__text">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-4">Elsewhere</p>
            <ul className="grid gap-1">
              {socials.map((s) => {
                const Icon = socialIcon[s.id];
                const external = s.id !== "email";
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      className="link-arrow"
                      style={{ minHeight: 40 }}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      <Icon size={18} />
                      <span className="link-arrow__text">{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="md:justify-self-end">
            <BackToTop />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sec-line py-6 text-sm text-sec-fg2">
          <span>
            © {year} {siteConfig.name}
          </span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
