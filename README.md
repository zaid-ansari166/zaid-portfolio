# Zaid Ansari — portfolio

Personal portfolio of Zaid Ansari, full-stack & AI developer (Indore, India).
Built with the Next.js 13 app router (plain JavaScript) and Tailwind CSS. No animation
libraries, no icon packs: motion is CSS plus a few small client components (two of them canvas 2D),
icons are inline SVG.

Everything personal lives in `src/content/`; components only render what they are given.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also run by Vercel)
npm run start    # serve the production build
npm run lint
```

Node 18+ is required (Next 13.4 and `sharp`).

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. All keys are documented in `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SERVICE_ID` | for the contact form | EmailJS service ID |
| `TEMPLATE_ID` | for the contact form | EmailJS template ID |
| `PUBLIC_KEY` | for the contact form | EmailJS public key |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL (default `https://zaid-ansari-xi.vercel.app`); feeds `metadataBase`, Open Graph, sitemap, robots and JSON-LD |
| `NEXT_PUBLIC_GA_ID` | optional | Google Analytics 4 ID; the gtag scripts only render when set |

The contact form posts straight to EmailJS's REST API from the browser, so the three EmailJS
values are shipped to the client (`next.config.js` forwards them via `env`). The public key is
designed to be public; allowlist your domain in the EmailJS dashboard. The EmailJS template must
accept `from_name`, `from_email`, `message`, `to_name` and `to_email`.

## Editing content

| File | What it holds |
| --- | --- |
| `src/content/site.js` | Name, role, email, location, social links, `availability` badge, `resumeUrl`, nav items, SEO title/description/keywords |
| `src/content/profile.js` | Hero, About, Expertise, Experience, Education and Contact copy |
| `src/content/projects.js` | Projects in display order, plus the case-study text for `/work/[slug]` |

**Add a project:** append an object to `projects` in `src/content/projects.js` (copy an existing one;
`slug` becomes the URL), then give it a cover image (next section). The gallery, the case-study
page, the previous/next links and `sitemap.xml` all pick it up automatically.

Lines marked `// EDIT:` in the content files flag facts that should be checked or filled in.

## Images

Project artwork is generated, not hand-exported:

```bash
npm run images                     # everything: project covers, tints, icons
npm run images -- --only=projects  # comma list of: projects, tints, icons
```

`scripts/optimize-images.mjs` (uses `sharp`) crops and converts the source screenshots and app
graphics in `src/assets/` into WebP covers in `src/assets/projects/`, samples one dark tint per
project into `src/assets/projects/tints.json` (used behind each image frame), and renders the
favicon and Apple touch icon into `src/app/icon.svg` and `src/app/apple-icon.png`.

To add a cover: drop the source into `src/assets/`, add an entry to `PROJECT_IMAGES` (and `TINTS`)
in the script, run `npm run images`, then import the new `.webp` in `src/content/projects.js` as
`cover` and set `coverAlt` and `coverAspect`. Covers are static imports, so `next/image` knows their
size and nothing shifts while loading.

## Résumé button

Drop the PDF into `public/` (for example `public/Zaid-Ansari-Resume.pdf`) and set
`resumeUrl: "/Zaid-Ansari-Resume.pdf"` in `src/content/site.js`. While `resumeUrl` is `null`,
no download button is rendered anywhere.

## Design tokens

Colours, type scale, spacing, radii and easing are CSS variables on `:root` in
`src/app/globals.css` — change values there only. `tailwind.config.js` maps them to class names
(`bg`, `ink`, `fg`, `fg2`, `line`, `accent`, `blue`, `font-display`, `font-mono`, …).

The direction is a deep navy × cyan "space" look:

| Token | Value |
| --- | --- |
| Background / world | `#0B0F19` |
| Deep ink | `#030F25` |
| Text | `#FFFFFF`; secondary `rgba(255,255,255,.72)`; tertiary `rgba(255,255,255,.46)` |
| Hairline | `rgba(255,255,255,.14)` |
| Accent cyan | `#22D3EE` (hover `#36D3FF`) |
| Blue | `#1E6DFD` |
| Light surfaces | `#FFFFFF` / `#F4F6FB`; text `#030F25`; secondary `#56719F`; hairline `#E7ECF4` |

Type: Plus Jakarta Sans (bold) for display, IBM Plex Sans for body, IBM Plex Mono for labels
(uppercase, letter-spacing `.12em`). The recurring motif is a pair of crop-mark corner brackets
(two L shapes, top-left + bottom-right): cyan on dark sections, blue on light ones. The favicon,
Apple touch icon and the Open Graph cards (`src/app/opengraph-image.js`,
`src/app/work/[slug]/opengraph-image.js`) repeat the same palette and motif; Satori cannot read CSS
variables, so the hex values are mirrored there by hand.

Sections switch palette with `data-theme="dark|light"`; components use the section-scoped
`--s-*` variables (`text-sec-fg2`, `border-sec-line`, …) so they work on both.

Shared primitives (`Section`, `Index`, `Button`, `ArrowLink`, `Media`, `Reveal`, `Header`,
`Footer`, `Icons`, `LiteYouTube`) are in `src/components/ui/`.

## Motion

Transform and opacity only, plus two canvas 2D backgrounds written without any library:

- `src/components/fx/World.jsx` — the fixed background behind every section: a dot grid and three
  drifting routes carrying cyan packets. The layout is seeded, so the world is identical on every
  visit. It draws at 30 fps and is static (one frame) under 760px, with `prefers-reduced-motion`,
  or when `Save-Data` is on.
- `src/components/fx/Constellation.jsx` renders the hero particles: the name and the title (lines in `src/content/profile.js` → `hero.stage.scenes`) are set in the display font, sampled into a dot-matrix and assembled from scattered stars, held, dispersed and re-formed on a 14 s-per-scene cycle; formed and still under reduced motion. Both are canvas 2D with no libraries.
  component, nothing is fetched) sampled into a dot-matrix of particles that assemble, hold,
  disperse and re-form on a ~32 s cycle. Under `prefers-reduced-motion` the rocket renders formed
  and still.

Keyframes and transitions live in `globals.css`;
`src/components/MotionProvider.jsx` is the single controller: it reveals `[data-reveal]` elements
once when they enter the viewport (IntersectionObserver) and adds the small magnetic nudge to
`[data-magnetic]` buttons on fine pointers. With `prefers-reduced-motion` everything is visible
immediately and the magnetic effect is off; with JavaScript disabled, content is never hidden.

## Analytics

Two options, both free:

- **Vercel Web Analytics** (on by default in code): `<Analytics />` from `@vercel/analytics` is mounted in
  `src/app/layout.js`. It is cookie-free and shows page views, referrers, countries/cities, devices and
  browsers. Enable it once in the Vercel dashboard: Project → Analytics → Enable, then redeploy. Data
  appears under the Analytics tab. Nothing is sent from local development.
- **Google Analytics 4** (optional): create a GA4 property, set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in the
  environment and redeploy; the gtag scripts only render when the variable is set.

Neither identifies visitors by name; the contact form is the only place a visitor tells you who they are.

## SEO and metadata

`src/app/layout.js` holds the `metadata` object and Person/WebSite JSON-LD. The routes
`opengraph-image.js` / `twitter-image.js` (1200×630 social card rendered at the edge),
`manifest.js`, `sitemap.js` (home + every project) and `robots.js` in `src/app/` read
`src/content/site.js` and `src/content/projects.js`, so there is nothing to update by hand.

## Deployment

Deployed on Vercel: import the repo, set the environment variables above, and push to `main`.
Run `npm run images` and commit the generated files whenever source artwork changes — the build
does not regenerate them.
