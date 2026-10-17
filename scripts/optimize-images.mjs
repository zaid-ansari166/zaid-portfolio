#!/usr/bin/env node
/**
 * optimize-images.mjs — builds every derived image asset for the portfolio.
 *
 *   npm run images                    # project artwork + tints.json + icons
 *   npm run images -- --only=icons    # comma list of: projects, tints, icons
 *
 * Sources (all committed, so the script runs offline):
 *   src/assets/*.png              site screenshots / app graphics
 *   src/assets/projects/_source-mspark-poster.jpg   MSpark video poster frame
 *   src/assets/store/<app>/N.png  Google Play listing screenshots (Photo Vault by
 *                                 Pixo, ReplyAI – Smart AI Replies, MSpark), fetched
 *                                 at full size (`=w2000`) in listing order
 *   src/assets/sites/<name>.png   live-site captures (Playwright/Chromium, device
 *                                 scale 2, networkidle + 1.5 s): eazytalks.com/home
 *                                 and hirepross.com at 1440x900, bestbybites.com at
 *                                 1200x900 with its cookie-consent banner removed
 * Every output is fully derived from those sources, so re-running the script is
 * idempotent — the same files are rewritten with the same content.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src", "assets");
const OUT = path.join(ROOT, "src", "assets", "projects");
const APP = path.join(ROOT, "src", "app");

const WEBP = { quality: 84, effort: 5 };

const src = (name) => path.join(SRC, name);
const store = (app, n) => path.join(SRC, "store", app, `${n}.png`);
const site = (name) => path.join(SRC, "sites", `${name}.png`);
const out = (name) => path.join(OUT, name);
const rel = (file) => path.relative(ROOT, file);
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/* -------------------------------------------------------------------------- */
/* 1. Project artwork                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Fades the outer `feather` px of an image to transparent so it can sit on a
 * backdrop without a hard seam. The alpha mask is a blurred, inset white rectangle.
 */
async function featherEdges(input, feather) {
  const { width, height } = await sharp(input).metadata();
  const inset = Math.round(feather / 2);
  const mask = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
        `<rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" fill="#fff"/></svg>`,
    ),
  )
    .blur(feather / 4)
    .png()
    .toBuffer();
  const rgba = await sharp(input).ensureAlpha().png().toBuffer();
  return sharp(rgba).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

/**
 * Letterbox treatment for artwork whose shape or size does not fit the frame:
 * a blurred, darkened cover-crop of `source` fills width x height and the
 * `graphic` pipeline (the same artwork, already sized) sits centred on top with
 * its outer `feather` px faded into the backdrop so there is no hard seam.
 */
async function letterbox(source, width, height, graphic, feather = 48) {
  const backdrop = await sharp(source)
    .resize(width, height, { fit: "cover", position: "centre" })
    .blur(40)
    .modulate({ brightness: 0.85 })
    .toBuffer();
  const softened = await featherEdges(await graphic.toBuffer(), feather);
  return sharp(backdrop).composite([{ input: softened, gravity: "centre" }]).removeAlpha();
}

/** Rounds the corners of a raster (alpha mask, dest-in). */
async function rounded(buffer, radius) {
  const { width, height } = await sharp(buffer).metadata();
  const mask = Buffer.from(
    `<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${radius}" ry="${radius}"/></svg>`
  );
  return sharp(buffer).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

/**
 * Portrait store screenshots side by side as rounded "cards" on a flat canvas — every panel is
 * scaled to the same height (downscaled from the native 1080x1920 where possible), never cropped.
 */
async function panels(sources, width, height, { margin = 64, gap = 24, radius = 20, background = "#1E1A3F" } = {}) {
  const panelH = height - margin * 2;
  const cards = [];
  for (const file of sources) {
    const buf = await sharp(file).resize({ height: panelH, kernel: "lanczos3" }).png().toBuffer();
    cards.push(await rounded(buf, radius));
  }
  const widths = await Promise.all(cards.map(async (c) => (await sharp(c).metadata()).width));
  const total = widths.reduce((a, b) => a + b, 0) + gap * (cards.length - 1);
  let left = Math.round((width - total) / 2);
  const composites = cards.map((input, i) => {
    const c = { input, left, top: margin };
    left += widths[i] + gap;
    return c;
  });
  return sharp({ create: { width, height, channels: 3, background } }).composite(composites);
}

/** Each entry returns a sharp pipeline; the runner appends .webp() and writes it. */
const PROJECT_IMAGES = [
  {
    file: "glofi-cover.webp",
    // GloFi website screenshot (2908x1456, ~2:1) → 1920x960, centre cover crop.
    build: () => sharp(src("jobit.png")).resize(1920, 960, { fit: "cover", position: "centre" }),
  },
  {
    file: "mspark-cover.webp",
    // YouTube poster frame (1280x720) → same size, no crop, just WebP.
    build: () =>
      sharp(out("_source-mspark-poster.jpg")).resize(1280, 720, { fit: "inside", withoutEnlargement: true }),
  },
  {
    file: "mataafhr-cover.webp",
    // MataafHR website screenshot (2900x1424): 4:3 window below the nav bar, stopping
    // above the feature-card icons that start at y=1414 → 1600x1200.
    build: () =>
      sharp(src("ink.png")).extract({ left: 638, top: 181, width: 1625, height: 1219 }).resize(1600, 1200),
  },
  {
    file: "mataafhr-full.webp",
    // Full MataafHR frame for the case study → 1920 wide (height auto, ≈943).
    build: () => sharp(src("ink.png")).resize({ width: 1920 }),
  },
  {
    file: "mataafpos-cover.webp",
    // Play Store feature graphic (832x406) is too small for 16:9 hero use: letterboxed
    // into 1600x900 with a sharp 1200px copy centred on its own blurred backdrop.
    build: () =>
      letterbox(src("image.png"), 1600, 900, sharp(src("image.png")).resize({ width: 1200, kernel: "lanczos3" })),
  },
  {
    file: "pixo-cover.webp",
    // Featured cover: three Play Store promo screenshots (1080x1920 portrait — "Hide anything in one
    // tap", "Albums that stay private", "Backed up. Protected.") as a triptych of rounded cards on a
    // deep violet canvas. Panels are downscaled (never upscaled or cropped), so the artwork stays crisp.
    build: () =>
      panels([store("pixo", 1), store("pixo", 4), store("pixo", 3)], 1920, 1080, { background: "#1E1A3F" }),
  },
  {
    file: "replyai-cover.webp",
    // Two Play Store promo screenshots ("Upgrade your thinking" — Voice to Text; "Smarter every day" —
    // tone picker; ~500x880 is the largest size Google serves) as a diptych of rounded cards on an
    // indigo canvas. ~1.2x upscale, the softest artwork on the site — nothing sharper exists.
    build: () => panels([store("replyai", 2), store("replyai", 3)], 1600, 1200, { margin: 80, background: "#14143C" }),
  },
  {
    file: "aidetector-cover.webp",
    // Two Pixo AI Detector store screenshots (1080x1920 portrait — "See what's real" photo check and
    // "Check a clip, frame by frame") as a diptych of rounded cards on a deep plum canvas; downscaled only.
    build: () => panels([store("aidetector", 6), store("aidetector", 4)], 1600, 1200, { margin: 80, background: "#2A1B3D" }),
  },
  {
    file: "glofi-narrow.webp",
    // The whole GloFi screenshot (2908x1456) letterboxed into 4:3 for narrow slots:
    // 1500px wide on its own blurred backdrop. glofi-cover.webp (2:1 crop) stays as is.
    build: () =>
      letterbox(src("jobit.png"), 1600, 1200, sharp(src("jobit.png")).resize({ width: 1500, kernel: "lanczos3" })),
  },
  {
    file: "eazytalks-cover.webp",
    // Live-site capture, 1440x900 viewport @2x = 2880x1800 (exactly 16:10) → 1920x1200.
    build: () => sharp(site("eazytalks")).resize(1920, 1200, { fit: "cover", position: "top" }),
  },
  {
    file: "hirepross-cover.webp",
    // Live-site capture, 1440x900 viewport @2x = 2880x1800 (exactly 16:10) → 1920x1200.
    build: () => sharp(site("hirepross")).resize(1920, 1200, { fit: "cover", position: "top" }),
  },
  {
    file: "bestbybites-cover.webp",
    // Live-site capture, 1200x900 viewport @2x = 2400x1800 (4:3) → 1600x1200. The bottom
    // 20 rows are trimmed first: the next section's heading starts at row 1795 and would
    // otherwise be sliced by the edge, so the frame now ends on that section's plain
    // ivory card top (the cover-fit then trims 9px from each side).
    build: () =>
      sharp(site("bestbybites"))
        .extract({ left: 0, top: 0, width: 2400, height: 1780 })
        .resize(1600, 1200, { fit: "cover", position: "top" }),
  },
  {
    file: "aichatbot-cover.webp",
    // Illustration (1536x1024) has a baked-in title (rows ≤155) and feature rows (from
    // row 756); keep the widest 2:1 band that clears both, at native resolution (no
    // upscaling). The right edge clears the server rack (ends x=1283); the plant's
    // outer leaf bleeds off the left edge.
    build: () => sharp(src("aIchatbot.png")).extract({ left: 121, top: 164, width: 1168, height: 584 }),
  },
];

async function buildProjectImages() {
  await mkdir(OUT, { recursive: true });
  const rows = [];
  for (const job of PROJECT_IMAGES) {
    const pipeline = await job.build();
    const info = await pipeline.webp(WEBP).toFile(out(job.file));
    rows.push({ file: rel(out(job.file)), size: `${info.width}x${info.height}`, bytes: info.size });
  }
  return rows;
}

/* -------------------------------------------------------------------------- */
/* 2. Tints — one representative dark colour per project (Media frame backdrop) */
/* -------------------------------------------------------------------------- */

const TINTS = [
  { slug: "glofi", file: "glofi-cover.webp" },
  { slug: "mspark", file: "mspark-cover.webp" },
  { slug: "mataafhr", file: "mataafhr-cover.webp" },
  { slug: "mataafpos", file: "mataafpos-cover.webp" },
  { slug: "pixo", file: "pixo-cover.webp" },
  { slug: "aichatbot", file: "aichatbot-cover.webp" },
  { slug: "replyai", file: "replyai-cover.webp" },
  { slug: "aidetector", file: "aidetector-cover.webp" },
  { slug: "eazytalks", file: "eazytalks-cover.webp" },
  { slug: "hirepross", file: "hirepross-cover.webp" },
  { slug: "bestbybites", file: "bestbybites-cover.webp" },
];

/** Dominant colours lighter than this are useless as a tint → fall back to sampling. */
const LIGHT_LUMA = 0.7;

const hex = ({ r, g, b }) =>
  "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
const luma = ({ r, g, b }) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
const saturation = ({ r, g, b }) => {
  const max = Math.max(r, g, b);
  return max ? (max - Math.min(r, g, b)) / max : 0;
};

async function dominantColour(file) {
  const thumb = await sharp(file).resize(50, 50, { fit: "fill" }).flatten({ background: "#FFFFFF" }).png().toBuffer();
  const { dominant } = await sharp(thumb).stats();
  return dominant;
}

/**
 * A colourful, non-light colour sampled from the image (white/grey areas ignored):
 * `mode` = the most common one, `median` = the mid-tone of all of them.
 */
async function sampledColour(file, pick = "mode") {
  const { data, info } = await sharp(file)
    .resize(64, 64, { fit: "fill" })
    .flatten({ background: "#FFFFFF" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixels = [];
  for (let i = 0; i < data.length; i += info.channels) {
    const px = { r: data[i], g: data[i + 1], b: data[i + 2] };
    if (luma(px) <= 0.75 && saturation(px) >= 0.3) pixels.push(px);
  }
  if (pixels.length === 0) return null;
  if (pick === "median") {
    pixels.sort((a, b) => luma(a) - luma(b));
    return pixels[Math.floor(pixels.length / 2)];
  }
  const bins = new Map();
  for (const px of pixels) {
    const key = `${px.r >> 4},${px.g >> 4},${px.b >> 4}`;
    const bin = bins.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    bin.n += 1;
    bin.r += px.r;
    bin.g += px.g;
    bin.b += px.b;
    bins.set(key, bin);
  }
  const best = [...bins.values()].sort((a, b) => b.n - a.n)[0];
  return { r: best.r / best.n, g: best.g / best.n, b: best.b / best.n };
}

async function buildTints() {
  const tints = {};
  const rows = [];
  for (const { slug, file, sampleFrom, pick } of TINTS) {
    const target = out(file);
    const dominant = await dominantColour(target);
    let colour = dominant;
    let how = "dominant colour";
    if (luma(dominant) > LIGHT_LUMA) {
      const sampled = await sampledColour(sampleFrom ?? target, pick);
      if (sampled) {
        colour = sampled;
        how = `dominant ${hex(dominant)} too light → ${pick ?? "mode"} of ${rel(sampleFrom ?? target)}`;
      }
    }
    tints[slug] = hex(colour);
    rows.push({ slug, tint: tints[slug], how });
  }
  await writeFile(out("tints.json"), JSON.stringify(tints, null, 2) + "\n");
  return rows;
}

/* -------------------------------------------------------------------------- */
/* 3. Favicon (SVG, served by Next as /icon.svg) + Apple touch icon (180px PNG) */
/* -------------------------------------------------------------------------- */

// Rounded navy tile, cyan crop-mark brackets, white Z — the wordmark motif.
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0B0F19"/><path d="M5.5 11.5V5.5H11.5" fill="none" stroke="#22D3EE" stroke-width="2"/><path d="M26.5 20.5V26.5H20.5" fill="none" stroke="#22D3EE" stroke-width="2"/><path d="M10 11h12L10 21h12" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="miter"/></svg>`;

// Full-bleed variant for iOS (it applies its own corner mask), glyph pulled in a touch.
const APPLE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0B0F19"/><path d="M6.5 12.5V6.5H12.5" fill="none" stroke="#22D3EE" stroke-width="2"/><path d="M25.5 19.5V25.5H19.5" fill="none" stroke="#22D3EE" stroke-width="2"/><path d="M10.5 11.5h11L10.5 20.5h11" fill="none" stroke="#FFFFFF" stroke-width="2.8"/></svg>`;

const APPLE_ICON_SIZE = 180;

async function buildIcons() {
  const iconPath = path.join(APP, "icon.svg");
  await writeFile(iconPath, ICON_SVG + "\n");

  const applePath = path.join(APP, "apple-icon.png");
  // Give the SVG an explicit pixel size so it is rasterised crisply at 180px
  // instead of being rendered at 32px and upscaled.
  const sized = APPLE_ICON_SVG.replace("<svg ", `<svg width="${APPLE_ICON_SIZE}" height="${APPLE_ICON_SIZE}" `);
  const info = await sharp(Buffer.from(sized))
    .resize(APPLE_ICON_SIZE, APPLE_ICON_SIZE)
    .flatten({ background: "#0B0F19" })
    .png({ compressionLevel: 9 })
    .toFile(applePath);

  // Browsers still request /favicon.ico directly: a 32px PNG wrapped in an ICO container (valid since Vista).
  const icoPath = path.join(ROOT, "public", "favicon.ico");
  const png32 = await sharp(Buffer.from(ICON_SVG.replace("<svg ", '<svg width="32" height="32" ')))
    .resize(32, 32)
    .png({ compressionLevel: 9 })
    .toBuffer();
  const header = Buffer.alloc(6 + 16);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // one image
  header.writeUInt8(32, 6); // width
  header.writeUInt8(32, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // colour planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png32.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  await writeFile(icoPath, Buffer.concat([header, png32]));

  return [
    { file: rel(iconPath), size: "32x32 vector", bytes: Buffer.byteLength(ICON_SVG) + 1 },
    { file: rel(applePath), size: `${info.width}x${info.height}`, bytes: info.size },
    { file: rel(icoPath), size: "32x32 ico", bytes: 22 + png32.length },
  ];
}

/* -------------------------------------------------------------------------- */
/* Runner                                                                      */
/* -------------------------------------------------------------------------- */

const STEPS = ["projects", "tints", "icons"];

function parseOnly(argv) {
  const arg = argv.find((a) => a.startsWith("--only="));
  if (!arg) return new Set(STEPS);
  const wanted = new Set(arg.slice("--only=".length).split(",").map((s) => s.trim()).filter(Boolean));
  for (const step of wanted) {
    if (!STEPS.includes(step)) throw new Error(`Unknown step "${step}" — expected one of: ${STEPS.join(", ")}`);
  }
  return wanted;
}

function printRows(title, rows) {
  console.log(`\n${title}`);
  const width = Math.max(...rows.map((r) => r.file.length));
  for (const r of rows) console.log(`  ${r.file.padEnd(width)}  ${r.size.padEnd(13)} ${kb(r.bytes)}`);
}

export async function main(argv = process.argv.slice(2)) {
  const only = parseOnly(argv);
  const started = Date.now();

  if (only.has("projects")) printRows("Project artwork", await buildProjectImages());
  if (only.has("tints")) {
    const rows = await buildTints();
    console.log(`\nTints → ${rel(out("tints.json"))}`);
    for (const r of rows) console.log(`  ${r.slug.padEnd(10)} ${r.tint}  (${r.how})`);
  }
  if (only.has("icons")) printRows("Icons", await buildIcons());

  console.log(`\nDone in ${Date.now() - started} ms`);
}

// Run only when executed directly (node scripts/optimize-images.mjs / npm run images),
// so the builders can also be imported without side effects.
const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (invokedDirectly) {
  main().catch((error) => {
    console.error(`\noptimize-images failed: ${error.message}`);
    process.exit(1);
  });
}
