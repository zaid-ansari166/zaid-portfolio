// Project data — edit freely. Order = display order. `layout` drives the gallery composition.
//
// Notes for component authors:
//   - `year`, `client`, `metric`, `status`, `videoId`, `detailCover`, `detail.problem`, `detail.process`,
//     `detail.outcomes` and `detail.finalWork` may be null/undefined — hide the element when they are.
//   - `cover` may be null (AI Trading OS has no artwork): render a typographic frame instead of an <Image>;
//     `coverAlt` is null with it. `detailCover` + `detailCoverAspect` override the top media on the case-study page only.
//   - `coverAspect` is a CSS aspect-ratio string that matches the artwork file (no CLS).
//   - `tint` values marked `// TINT` are placeholders — the lead replaces them with sampled colors.
//   - Source of truth is the Sept 2026 resume. Store facts (listing names, download counts, live/dead links) were
//     checked on 2026-09-28; product details come from the live sites and store listings read the same day.
//     Anything not verifiable from those carries an `// EDIT:` comment; `// ALT:` marks provisional alt text.

import pixoCover from "@/assets/projects/pixo-cover.webp";
import eazytalksCover from "@/assets/projects/eazytalks-cover.webp";
import replyaiCover from "@/assets/projects/replyai-cover.webp";
import msparkCover from "@/assets/projects/mspark-cover.webp";
import glofiNarrow from "@/assets/projects/glofi-narrow.webp";
import glofiCover from "@/assets/projects/glofi-cover.webp";
import mataafposCover from "@/assets/projects/mataafpos-cover.webp";
import bestbybitesCover from "@/assets/projects/bestbybites-cover.webp";
import hireprossCover from "@/assets/projects/hirepross-cover.webp";
import mataafhrFull from "@/assets/projects/mataafhr-full.webp";
import aichatbotCover from "@/assets/projects/aichatbot-cover.webp";
import aidetectorCover from "@/assets/projects/aidetector-cover.webp";

export const projects = [
  // ─── 01 · Pixo ─────────────────────────────────────────────────────────────
  {
    slug: "pixo", // URL: /work/pixo
    index: "01",
    name: "Pixo",
    tagline: "Private photo vault disguised as a calculator",
    summary:
      "A privacy-first vault for Android and iOS — calculator disguise, biometric unlock, end-to-end encrypted storage and encrypted cloud backup — built solo for a UK client.",
    role: "Sole developer — React Native app, encryption & cloud backup",
    client: "Freelance client, UK", // Google Play and the App Store list the publisher as RR TRADING GLOBAL LTD
    year: null,
    platforms: ["Android", "iOS"],
    tags: ["React Native", "Encryption", "Cloud Backup", "iOS + Android"],
    layout: "featured",
    cover: pixoCover,
    coverAlt:
      "Three Pixo store screenshots side by side: 'Hide anything in one tap' with the vault's photo grid and a 'Hidden securely' confirmation, 'Albums that stay private' with Travel, Pets and Nature albums, and 'Backed up. Protected.' showing the My Vault backup and lock settings",
    coverAspect: "16 / 9",
    tint: "#2A2460", // drawn from the artwork
    links: {
      website: null,
      playStore: "https://play.google.com/store/apps/details?id=com.pixovault.app",
      appStore: "https://apps.apple.com/us/app/photo-vault-by-pixo/id6796284257",
      github: null,
      video: null,
    },
    metric: { value: "10K+", label: "downloads on Google Play", verifiedOn: "2026-09-28" },
    status: "Live on Google Play & the App Store",
    detail: {
      overview: [
        "Pixo — listed as Photo Vault by Pixo on Google Play and the App Store — keeps personal photos, videos and files private. Everything sits behind a 6-digit passcode and biometrics, hidden from the gallery, file manager and other apps, and the app opens as a fully working calculator: typing the secret PIN on it reveals the real vault, and a second PIN can open a decoy vault instead.",
        "I designed, built and shipped it single-handedly, as the only developer, for a client in the UK: the React Native app for Android and iOS, the end-to-end encrypted storage and the encrypted cloud backup behind it, with email or Google sign-in. It has passed 10K+ downloads on Google Play and is growing by 100–200 new users a day. Its sibling app, Pixo AI Detector, followed in 2026 for the same publisher.",
      ],
      problem:
        "People keep photos and files on their phones that they don't want in the gallery or visible to whoever borrows the device. Pixo keeps that content private, keeps the fact that a vault exists private too, and — because everything is encrypted on the phone before it is backed up — keeps it private in the cloud as well.",
      contribution: [
        "React Native app for Android and iOS — the only developer on the product, from design to store release",
        "6-digit passcode, fingerprint and face unlock, auto-lock on leaving the app or turning the phone face down, and lockout protection against repeated wrong passcodes",
        "Calculator disguise with a PIN-revealed vault and a decoy vault, plus home-screen icons disguised as Calculator, Notes, Weather, Calendar or Files",
        "End-to-end encryption on the phone before backup, and an encrypted cloud backup that restores the vault on a new device, with email or Google sign-in",
        "Private albums with their own passwords, favorites, search and filters, secure sharing through expiring encrypted links, a private browser and one-tap clean-up of originals from the gallery",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "A calculator that actually works",
          text: "The disguise only holds if the calculator is real, so it is fully functional; the secret PIN typed on it is the only thing that reveals the vault, and a second PIN opens a decoy.",
        },
        {
          title: "Encrypt before it leaves the phone",
          text: "Files are encrypted on the device before they are backed up, so the cloud copy can restore the vault on a new phone while staying unreadable to anyone but the owner.",
        },
        {
          title: "Local-first, so the vault opens instantly",
          text: "The vault lives in the app's private storage and opens without a connection; backup and restore happen around it rather than in front of it.",
        },
        {
          title: "Discretion beyond the lock",
          text: "The app icon can be swapped for a Calculator, Notes, Weather, Calendar or Files look, break-in alerts log failed unlocks with an optional intruder photo that never leaves the phone, and originals can be cleaned out of the gallery in one tap.",
        },
      ],
      outcomes: ["Live on Google Play and the iOS App Store", "100–200 new users a day (per Sept 2026 resume)"],
      stack: ["React Native", "End-to-end encryption", "Encrypted cloud backup", "Biometric auth"],
      finalWork: null,
    },
  },

  // ─── 02 · Pixo AI Detector ─────────────────────────────────────────────────
  {
    slug: "pixo-ai-detector", // URL: /work/pixo-ai-detector
    index: "02",
    name: "Pixo AI Detector",
    tagline: "Is this photo or clip AI? A likelihood, not a verdict",
    summary:
      "An Android app that checks whether a photo or short clip was made with AI — or a face swapped in — and reports a likelihood plus the image quality it had to work with.",
    role: "Sole developer — React Native app, detection pipeline & store launch", // EDIT: confirm the stack (the sibling app, Pixo, is React Native)
    client: "Freelance client, UK", // EDIT: same Google Play publisher as Pixo (RR TRADING GLOBAL LTD) — confirm
    year: null,
    platforms: ["Android"], // iOS build submitted; add "iOS" once the App Store review clears
    tags: ["React Native", "AI detection", "Deepfake check", "Subscriptions"],
    layout: "narrow",
    cover: aidetectorCover,
    coverAlt:
      "Two Pixo AI Detector store screenshots side by side: 'See what's real' with a portrait scored 96% likely AI, and 'Check a clip, frame by frame' with a 67% likely-AI clip result and a bar chart of scored frames",
    coverAspect: "4 / 3",
    tint: "#2A1B3D", // drawn from the artwork
    links: {
      website: null,
      playStore: "https://play.google.com/store/apps/details?id=com.pixovault.aidetector",
      appStore: null, // in App Store review as of 2026-09-30 — add the link once it is live
      github: null,
      video: null,
    },
    metric: null,
    status: "Live on Google Play · App Store review in progress",
    detail: {
      overview: [
        "Pixo AI Detector tells you how likely it is that a photo or a short clip was made with AI — and how sure it is, instead of pretending to be certain. Every check returns a percentage and one of three plain answers: likely AI, likely a real photo, or not clear either way.",
        "It is the second app I built single-handedly for the publisher behind Pixo, from the React Native client and the analysis flow to the ads, the Pixo Pro subscription and the store launch. It is live on Google Play; the iOS build is in App Store review.",
      ],
      problem:
        "AI images and face swaps are now good enough that people can't tell by eye, and most detectors answer with false confidence. The app had to give an honest likelihood, explain when a result is unreliable, and never keep the user's photos.",
      contribution: [
        "React Native app with photo checks, clip checks of up to 15 seconds scored frame by frame, and a deep check for swapped or synthesised faces",
        "Three-way results (likely AI, likely real, not clear) with a percentage and an image-quality reading that explains unclear verdicts",
        "Unlock-by-ad flow for every check plus the Pixo Pro monthly subscription with per-type allowances, cancellable from Google Play",
        "Privacy by design: media is analysed and discarded, recent results stay on the device, and the account can be deleted in-app",
        "Google Play launch and App Store submission as the only developer",
      ],
      process: null,
      decisions: [
        {
          title: "Admit uncertainty",
          text: "Filters, screenshots and re-compression push real photos toward the middle, so the app has a deliberate 'not clear either way' answer instead of always picking a side.",
        },
        {
          title: "Report the quality it worked with",
          text: "Blur, noise and heavy compression are the usual reasons a result is unreliable, so every check also reports image quality next to the verdict.",
        },
        {
          title: "Clips scored frame by frame",
          text: "The headline for a clip is the average of its most suspicious frames, so one generated insert in otherwise real footage still registers.",
        },
        {
          title: "Nothing locked behind the paywall",
          text: "Any check can be unlocked by watching a short ad; the subscription only removes ads and adds a monthly allowance, which keeps the free path honest.",
        },
      ],
      outcomes: ["Live on Google Play", "iOS build submitted — in App Store review (September 2026)"],
      stack: ["React Native", "AI detection", "Deepfake check", "In-app subscriptions", "Rewarded ads"],
      finalWork: null,
    },
  },

  // ─── 03 · eazyTalks ────────────────────────────────────────────────────────
  {
    slug: "eazytalks", // URL: /work/eazytalks
    index: "03",
    name: "eazyTalks",
    tagline: "Voice AI agents, built and launched in minutes",
    summary:
      "A voice AI platform: a visual workflow builder to build, test and launch AI voice agents on a low-latency Pipecat pipeline, with swappable LLM, TTS and STT providers.",
    role: "Full-stack — Next.js front end & FastAPI/Pipecat backend",
    client: "Freelance client, Canada",
    year: null,
    platforms: ["Web"],
    tags: ["Python", "FastAPI", "Next.js", "Pipecat", "MCP"],
    layout: "wide",
    cover: eazytalksCover,
    coverAlt:
      "eazyTalks homepage: the headline 'Every lead gets a next action.' beside a Lead Command Center card showing a new venue enquiry, an AI fit score of 92, an AI call in progress and a booked tour",
    coverAspect: "16 / 10",
    tint: "#1F3A5F", // drawn from the artwork
    links: {
      website: "https://eazytalks.com",
      playStore: null,
      appStore: null,
      github: null,
      video: null,
    },
    metric: null,
    status: "Live at eazytalks.com",
    detail: {
      overview: [
        "eazyTalks is a production voice AI platform built for a client in Canada. A visual workflow builder lets a team build, test and launch AI voice agents in minutes; the agents run on a low-latency Pipecat pipeline with flexible LLM, TTS and STT integration, MCP support for AI coding assistants, and a one-command Docker deployment.",
        "The live product at eazytalks.com now presents itself as 'AI staff for every lead, call, and follow-up': it captures leads from forms, campaigns, phone and WhatsApp, researches and scores them, runs follow-up sequences across email, SMS, WhatsApp and AI voice calls, books meetings and writes every step back to a CRM timeline. I built it across the Next.js front end and the Python/FastAPI backend.",
      ],
      problem:
        "Voice agents are usually a developer project: wiring speech-to-text, an LLM and a text-to-speech voice into a pipeline that answers fast enough to feel like a conversation, then deploying it. eazyTalks packages that into a builder a team can use, while keeping every provider behind it swappable.",
      contribution: [
        "Next.js front end with the visual workflow builder for designing, testing and launching voice agents",
        "Python/FastAPI backend running the agents on a low-latency Pipecat pipeline",
        "Flexible LLM, TTS and STT integration — managed providers, or the ones a workspace already uses, with keys scoped per workspace",
        "MCP support so AI coding assistants can work with the platform",
        "One-command Docker deployment, including on-prem installs for compliance and data residency",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "A builder, not a prompt box",
          text: "Agents are assembled in a visual workflow, so the shape of a call — qualify, answer, book, hand off to a human — is something a team can see and change without touching code.",
        },
        {
          title: "Latency decides whether it feels like a call",
          text: "The speech pipeline runs on Pipecat, chosen for the short gap between hearing the caller and answering; everything else is built around not adding to that gap.",
        },
        {
          title: "Bring your own providers",
          text: "LLM, TTS and STT are integrations rather than hard-wired choices, so a workspace can use managed AI or its own accounts, with usage tracked per feature and model.",
        },
        {
          title: "Deploy with one command",
          text: "Docker packaging turns deployment into a single command, which is what makes self-hosted and on-prem installs practical instead of a support project.",
        },
      ],
      outcomes: ["Live in production at eazytalks.com"],
      stack: ["Python", "FastAPI", "Next.js", "Pipecat", "MCP", "Docker"],
      finalWork: null,
    },
  },

  // ─── 04 · ReplyAI ──────────────────────────────────────────────────────────
  {
    slug: "replyai", // URL: /work/replyai
    index: "04",
    name: "ReplyAI",
    tagline: "AI replies for any chat, from a floating overlay",
    summary:
      "An Android assistant that reads the chat on screen through a floating overlay, writes a smart, grammar-corrected reply in real time and pastes it into any chat app.",
    role: "Mobile — React Native app, OCR & LLM pipeline",
    client: "Mataaf Technology",
    year: null,
    platforms: ["Android"],
    tags: ["React Native", "OCR", "NLP", "LLM APIs"],
    layout: "narrow",
    cover: replyaiCover,
    coverAlt:
      "Two ReplyAI store screenshots side by side: a Voice to Text screen correcting 'Hey bro, how are you?' under the headline 'Upgrade your thinking', and a 'Select preferred tone' list under 'Smarter every day'",
    coverAspect: "4 / 3",
    tint: "#1E1E5A", // drawn from the artwork
    links: {
      website: null,
      playStore: "https://play.google.com/store/apps/details?id=com.mataaftech.replyai",
      appStore: null,
      github: null,
      video: null,
    },
    metric: null,
    status: "Live on Google Play",
    detail: {
      overview: [
        "ReplyAI — listed on Google Play as ReplyAI – Smart AI Replies — is a reply assistant that lives in a floating overlay. It reads the conversation on screen, generates a smart, grammar-corrected response in real time and pastes it straight back into whichever chat app is open.",
        "I built it in React Native at Mataaf Technology as an OCR + LLM pipeline running on the device. The listing covers suggested replies, English grammar correction, professional rewrites, short, polite, professional or friendly tones, personalized reply styles and an email reply assistant — for business, support and everyday chats.", // EDIT: the resume says the OCR + LLM pipeline runs on-device while the stack lists "LLM APIs" — confirm whether reply generation happens on the phone or through an API
      ],
      problem:
        "Typing a good reply on a phone means switching between the chat, a grammar tool and maybe a chatbot, then pasting the result back by hand. ReplyAI removes the switching: the overlay reads what is on screen and the reply arrives where the cursor already is.",
      contribution: [
        "React Native app with a floating overlay that works on top of any chat or email app",
        "OCR that reads the on-screen conversation, feeding an LLM pipeline that generates the reply in real time",
        "Grammar correction, professional rewrites and short, polite, professional or friendly reply tones, with personalized styles",
        "Instant paste-back into the active app",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "An overlay instead of a keyboard",
          text: "A floating overlay sits on top of any app without replacing the keyboard, so nothing about the user's chat setup has to change.",
        },
        {
          title: "Read the screen, don't integrate the apps",
          text: "OCR on the visible conversation means one pipeline serves every messaging and email app, with no per-app integration to build or maintain.",
        },
        {
          title: "Correct first, then reply",
          text: "Grammar correction is part of the pipeline rather than a separate tool, so every suggested reply is already clean English.",
        },
        {
          title: "Tone as a first-class choice",
          text: "Short, polite, professional and friendly variants let the same reply fit a customer, a colleague or a friend.",
        },
      ],
      outcomes: ["Live on Google Play"],
      stack: ["React Native", "OCR", "NLP", "LLM APIs"],
      finalWork: null,
    },
  },

  // ─── 05 · MSpark ───────────────────────────────────────────────────────────
  {
    slug: "mspark", // URL: /work/mspark
    index: "05",
    name: "MSpark",
    tagline: "Random chat & video calling, in real time",
    summary:
      "A real-time chat and video-calling app for random and private conversations — peer-to-peer audio and video over WebRTC, Socket.io messaging and matchmaking on NestJS.",
    role: "Full-stack — React Native app & NestJS backend",
    client: "Mataaf Technology",
    year: null,
    platforms: ["Android"],
    tags: ["React Native", "NestJS", "WebRTC", "Socket.io", "MongoDB"],
    layout: "wide",
    cover: msparkCover,
    coverAlt:
      "MSpark promo poster: 'Ignite Your Chats, Spark Up Connections' in bold black type on a pink-to-violet gradient, next to a phone showing the MSpark speech-bubble logo on blue",
    coverAspect: "16 / 9",
    tint: "#6A55BF", // sampled from the artwork (scripts/optimize-images.mjs → tints.json), hand-adjusted
    videoId: "Apx2H9lwRUo", // YouTube: "MSpark Ignite Your Chats Spark Up Connections"
    links: {
      website: null,
      playStore: "https://play.google.com/store/apps/details?id=com.mataaftech.mspark",
      appStore: null,
      github: null,
      video: "https://www.youtube.com/watch?v=Apx2H9lwRUo",
    },
    metric: null,
    status: "Live on Google Play",
    detail: {
      overview: [
        "MSpark is a real-time chat and video-calling platform for random and private conversations: get matched with someone new, or keep a private thread going with people you know. It's a Mataaf Technology product and is live on Google Play, where the listing adds group video calls, disappearing messages and end-to-end encrypted private chats.",
        "I built the mobile app in React Native and the backend in NestJS with MongoDB. Audio and video run peer-to-peer over WebRTC, while matchmaking and messaging run over Socket.io, so a new match and the first message both arrive without a wait.",
      ],
      problem: null,
      contribution: [
        "React Native app with matchmaking for random conversations and private one-to-one chats",
        "Secure peer-to-peer audio and video calling over WebRTC, including group video calls",
        "Instant messaging over Socket.io, with disappearing messages",
        "NestJS and MongoDB backend handling matchmaking, sessions and message delivery",
        "User authentication and privacy controls for safe interactions",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "Peer-to-peer media over WebRTC",
          text: "Audio and video travel directly between the two users over WebRTC rather than through the server, which is what keeps call quality high and the backend light.",
        },
        {
          title: "Socket.io for everything real-time",
          text: "Matchmaking and text messaging run over Socket.io, so connecting to a new person and sending the first message both feel instant.",
        },
        {
          title: "Privacy controls in the core flow",
          text: "Random matching only works if people feel safe, so authentication, privacy controls and disappearing messages are part of the core experience.",
        },
        {
          title: "A UI tuned for responsiveness",
          text: "The React Native interface is tuned for smooth animation and quick response, because a laggy screen would undercut the instant matching.",
        },
      ],
      outcomes: ["Live on Google Play"],
      stack: ["React Native", "NestJS", "MongoDB", "WebRTC", "Socket.io"],
      finalWork: null,
    },
  },

  // ─── 06 · GloFi ────────────────────────────────────────────────────────────
  {
    slug: "glofi", // URL: /work/glofi
    index: "06",
    name: "GloFi",
    tagline: "Multi-chain crypto wallet & Web3 super app",
    summary:
      "A cross-platform crypto wallet and Web3 super app: buy, sell and swap tokens, move assets across chains, browse DApps and track a live portfolio across networks.",
    role: "Full-stack — React Native app & NestJS backend", // EDIT: confirm exact role
    client: null, // EDIT: Google Play and the App Store list the publisher as "BHAI Finance, Inc." — set this if GloFi was client work
    year: null,
    platforms: ["Android", "iOS"],
    tags: ["React Native", "NestJS", "Web3", "Blockchain"],
    layout: "narrow",
    cover: glofiNarrow,
    coverAlt:
      "The full GloFi website hero, 'Everything you own, all in one place.', above five phone screens with token search and BNB charts and the Google Play, App Store and Product Demo buttons, framed on a blurred dark-green backdrop",
    coverAspect: "4 / 3",
    // Case-study page uses the full-width crop of the same hero
    detailCover: glofiCover,
    detailCoverAspect: "2 / 1",
    tint: "#0F3B2E", // sampled from the artwork (scripts/optimize-images.mjs → tints.json), hand-adjusted
    links: {
      website: "https://www.glofi.io",
      playStore: "https://play.google.com/store/apps/details?id=io.glofi.glofiapp",
      appStore: "https://apps.apple.com/us/app/glofi-wallet/id6752637153",
      github: null,
      video: null,
    },
    metric: null,
    status: "Live on Google Play & the App Store",
    detail: {
      overview: [
        "GloFi is a multi-chain crypto wallet and Web3 super app for iOS and Android — listed as GloFi Wallet on the App Store. People buy, sell and swap tokens, move assets across chains, open DApps from a built-in browser and watch a live portfolio across networks such as Ethereum, Polygon, BNB Smart Chain and Base, from one non-custodial wallet.",
        "I built it with React Native on the client and NestJS on the backend. The goal was to pair strong security — biometric-secured keys and encrypted storage — with an interface that works for a first-time buyer as well as an experienced investor.",
      ],
      // EDIT: the Play listing now leads with "GloFi AI", a plain-language assistant that prepares sends, swaps, buys and sells.
      // If you built that assistant, add it to `contribution` and `decisions` — it isn't claimed here.
      problem:
        "Holding assets on several chains usually means several wallets, manual bridging between them and no single view of what you own. GloFi set out to be one secure wallet for multiple chains, with swaps, cross-chain transfers and the portfolio built in.",
      contribution: [
        "React Native app for iOS and Android covering buying, selling, swapping and sending tokens",
        "NestJS backend behind the wallet, including live prices and portfolio data across networks",
        "Multi-chain support with cross-chain transfers, so assets move between networks without leaving the app",
        "Built-in DApp browser and Web3 discovery",
        "Biometric-secured keys and encrypted storage",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "Cross-chain without the bridging homework",
          text: "Moving assets between chains is the most error-prone part of using several networks, so cross-chain transfers and swaps are handled inside the wallet rather than left to the user.",
        },
        {
          title: "One gateway to Web3",
          text: "A built-in DApp browser lets users open Web3 apps without leaving the wallet or pasting keys anywhere else.",
        },
        {
          title: "Security that stays out of the way",
          text: "Keys are secured by biometrics and storage is encrypted, while the everyday flows — buying, swapping, checking the portfolio — stay short.",
        },
        {
          title: "Live portfolio across networks",
          text: "Real-time prices and portfolio tracking are built in, so holdings across chains are visible in one place instead of one app per network.",
        },
      ],
      outcomes: ["Live on Google Play and the iOS App Store", "Website live at glofi.io"],
      stack: ["React Native", "NestJS", "Web3", "Blockchain"],
      finalWork: null,
    },
  },

  // ─── 07 · MataafPOS ────────────────────────────────────────────────────────
  {
    slug: "mataafpos", // URL: /work/mataafpos
    index: "07",
    name: "MataafPOS",
    tagline: "Restaurant & café POS with KDS and thermal printing",
    summary:
      "A React Native POS for restaurants and cafés: dine-in, parcel and hold billing, a kitchen display with voice alerts, Bluetooth thermal printing and offline-first sync.",
    role: "Mobile — React Native app on a Firebase backend",
    client: "Mataaf Technology",
    year: null,
    platforms: ["Android"],
    tags: ["React Native", "Firebase", "Bluetooth Printing", "KDS"],
    layout: "wide",
    cover: mataafposCover,
    coverAlt:
      "MataafPOS banner on dark navy: a neon-outlined app icon of a receipt printer marked 'MP' beside the wordmark 'MataafPOS — Smart POS for Restaurants'",
    coverAspect: "16 / 9",
    tint: "#181838", // sampled from the artwork (scripts/optimize-images.mjs → tints.json), hand-adjusted
    links: {
      website: null,
      playStore: "https://play.google.com/store/apps/details?id=com.mataaftech.mataafpos",
      appStore: null,
      github: null,
      video: null,
    },
    metric: null,
    status: "Live on Google Play",
    detail: {
      overview: [
        "MataafPOS is a point of sale for restaurants and cafés, built at Mataaf Technology. Staff bill fast across dine-in, parcel and hold orders, the kitchen sees every order on a Kitchen Display System with voice alerts for new tickets, receipts print on Bluetooth thermal printers, and inventory syncs to the cloud.",
        "I built it in React Native on a Firebase backend. The app is offline-first: billing keeps working without a connection and changes sync in the background once it returns, so a dropped signal never stops the counter.",
      ],
      problem:
        "A restaurant needs to take orders of several kinds at once, get them to the kitchen without shouting, print receipts and keep stock counts honest — from a phone, and without stopping when the connection does.",
      contribution: [
        "React Native POS with fast billing and multiple order types — dine-in, parcel and hold",
        "Kitchen Display System with real-time order tracking and voice announcements for new orders",
        "Bluetooth thermal printer support for receipts",
        "Inventory management with cloud sync, plus customer and supplier management",
        "Offline-first with automatic background sync on a Firebase backend",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "Phone first",
          text: "The whole POS runs on a phone, so the only extra hardware a restaurant needs is a Bluetooth thermal printer.",
        },
        {
          title: "Offline by default",
          text: "Sales can't wait for a connection, so the app keeps working offline and syncs to Firebase in the background once it is back.",
        },
        {
          title: "The kitchen hears new orders",
          text: "The Kitchen Display System announces new orders by voice, so nobody has to watch a screen during a rush.",
        },
        {
          title: "Order types match the floor",
          text: "Dine-in, parcel and hold are distinct order types rather than notes on a bill, so the kitchen and the till stay in step.",
        },
      ],
      outcomes: ["Live on Google Play"],
      stack: ["React Native", "Firebase", "Bluetooth Printing"],
      finalWork: null,
    },
  },

  // ─── 08 · AI Trading OS ────────────────────────────────────────────────────
  {
    slug: "ai-trading-os", // URL: /work/ai-trading-os
    index: "08",
    name: "AI Trading OS",
    tagline: "Multi-agent trading decisions you can audit",
    summary:
      "Eight specialized agents produce explainable trading decisions through a risk engine with veto power, auditable decision chains and a reflection-plus-RAG memory loop.",
    role: "Full-stack — FastAPI multi-agent backend & Next.js front end",
    client: null,
    year: null,
    platforms: ["Web"],
    tags: ["Python", "FastAPI", "Claude API", "RAG", "Next.js"],
    layout: "narrow",
    cover: null, // no artwork exists — the card renders a typographic frame
    coverAlt: null,
    coverAspect: "4 / 3",
    tint: "#1B2A41", // drawn from the artwork
    links: {
      website: null,
      playStore: null,
      appStore: null,
      github: null,
      video: null,
    },
    metric: null,
    status: null,
    detail: {
      overview: [
        "The AI Trading Operating System is a multi-agent decision platform: eight specialized agents each contribute to a trading decision, a risk engine with veto power sits above them, and every decision leaves an auditable chain of reasoning behind it.",
        "I built the backend in Python and FastAPI on PostgreSQL, with Claude-powered reasoning and prompt caching, a reflection loop that feeds past outcomes back through a RAG memory, and a Next.js front end — all packaged with Docker.",
      ],
      problem:
        "A single model asked for a trade gives an answer with no way to see why, no independent check on risk and no memory of how its last call turned out. The platform separates those concerns into agents, gives risk the final say and keeps a record that can be audited afterwards.",
      contribution: [
        "FastAPI backend orchestrating eight specialized agents into one explainable decision",
        "Risk engine with veto power over any decision the agents produce",
        "Auditable decision chains stored in PostgreSQL",
        "Reflection + RAG memory loop, with Claude-powered reasoning and prompt caching",
        "Next.js front end and Docker packaging",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "Risk gets a veto",
          text: "The risk engine can overrule the agents outright, so no combination of confident agents can push a decision past a hard limit.",
        },
        {
          title: "Explainable by construction",
          text: "Each agent's contribution is recorded as part of a decision chain, so a decision can be audited step by step instead of reverse-engineered afterwards.",
        },
        {
          title: "Memory that learns from outcomes",
          text: "A reflection loop writes what happened back into a RAG memory, so later decisions can retrieve similar past situations and how they played out.",
        },
        {
          title: "Cache the standing context",
          text: "The agents share a lot of unchanging context per decision; prompt caching keeps that from being re-sent on every Claude call across eight agents.",
        },
      ],
      outcomes: null,
      stack: ["Python", "FastAPI", "Claude API", "RAG", "Next.js", "PostgreSQL", "Docker"],
      finalWork: null,
    },
  },

  // ─── 09 · Bestby Bites ─────────────────────────────────────────────────────
  {
    slug: "bestbybites", // URL: /work/bestbybites
    index: "09",
    name: "Bestby Bites", // EDIT: the resume writes "BestByBites"; the live site (Sept 2026) brands it "Bestby Bites" — pick one
    tagline: "Surplus-food marketplace for Canada",
    summary:
      "Canada's surplus-food marketplace: customer web, merchant portal, super-admin and an Expo app on one Firebase backend, where shoppers reserve Surprise Bags at 50–75% off.",
    role: "Full-stack — React web apps, Expo mobile app & Firebase backend",
    client: "Freelance client, Canada",
    year: null,
    platforms: ["Web"], // bestbybites.com says the iOS and Android apps are "coming soon" (2026-09-28) — add them once the store listings are live
    tags: ["React Native (Expo)", "React", "TypeScript", "Firebase", "Stripe"],
    layout: "narrow",
    cover: bestbybitesCover,
    coverAlt:
      "Bestby Bites homepage hero on dark green: 'Every good deal near you. One place to save.', a postal-code field with a 'Show deals' button, and three people sharing pizza at a table",
    coverAspect: "4 / 3",
    tint: "#0D3B2C", // drawn from the artwork
    links: {
      website: "https://bestbybites.com",
      playStore: null,
      appStore: null,
      github: null,
      video: null,
    },
    metric: null,
    status: "Live at bestbybites.com",
    detail: {
      overview: [
        "Bestby Bites is a surplus-food marketplace for Canada, built for a freelance client. Restaurants, cafés, bakeries and grocery stores post today's unsold food as Surprise Bags — and this week's specials as flyer deals — and shoppers reserve online at 50–75% off, then collect in store.",
        "I built four products on one Firebase backend: the customer web app, a merchant portal with Stripe payments and PDFKit invoices, a super-admin with PDF and Excel reporting, and an Expo mobile app shipped through EAS with Stripe, Google Maps and push notifications. The web app is live at bestbybites.com; the site lists the iOS and Android apps as coming soon.",
      ],
      problem:
        "Unsold food at closing time is a loss for the store and waste for everyone else. The marketplace gives merchants a free way to list it — they keep 90% of every sale and are paid weekly — and gives shoppers a nearby bag to reserve, pay for and pick up.",
      contribution: [
        "Customer web app in React and TypeScript: nearby Surprise Bags and flyer deals, reservation and online payment, pickup windows and free cancellation up to two hours before pickup",
        "Merchant portal with Stripe payments, listing management and PDFKit-generated invoices",
        "Super-admin console with PDF and Excel reporting across merchants and orders",
        "Expo mobile app shipped via EAS with Stripe, Google Maps and push notifications",
        "One shared Firebase backend behind all four products",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "One backend, four products",
          text: "Customer, merchant, admin and mobile all read and write the same Firebase backend, so a bag listed by a merchant is live on every surface at once.",
        },
        {
          title: "Reserve online, collect in store",
          text: "Payment happens at reservation and the pickup window is part of the order, so the store knows what is spoken for before it closes.",
        },
        {
          title: "Merchant economics that sell themselves",
          text: "Listing is free, merchants keep 90% of each sale, are verified within hours and are paid weekly — which is what makes signing up a small store realistic.",
        },
        {
          title: "Invoices and reports as files",
          text: "Merchants get PDFKit invoices and admins get PDF and Excel exports, because the people reconciling money want documents, not dashboards.",
        },
      ],
      outcomes: ["Live in production at bestbybites.com"],
      stack: ["React Native (Expo)", "React", "TypeScript", "Firebase", "Stripe", "Google Maps"],
      finalWork: null,
    },
  },

  // ─── 10 · HirePross ────────────────────────────────────────────────────────
  {
    slug: "hirepross", // URL: /work/hirepross
    index: "10",
    name: "HirePross", // the live site writes it "Hire Pross" in the title and "Hirepross" in the footer; the resume's spelling is used here
    tagline: "Two-sided services marketplace for Canada",
    summary:
      "A two-sided services marketplace where a customer posts a job once and verified providers quote it, with task and quote lifecycles run as state machines on Firebase.",
    role: "Full-stack — React front end, Firebase Cloud Functions & Nginx deployment",
    client: "Freelance client, Canada",
    year: null,
    platforms: ["Web"],
    tags: ["React", "Vite", "Firebase", "Cloud Functions", "SendGrid"],
    layout: "wide",
    cover: hireprossCover,
    coverAlt:
      "HirePross homepage: a bright open-plan kitchen and living room photo labelled Kitchen Cabinets, Windows, House Painting, Doors, Flooring and Staircase Painting, under the site navigation",
    coverAspect: "16 / 10",
    tint: "#2C3B4A", // drawn from the artwork
    links: {
      website: "https://hirepross.com",
      playStore: null,
      appStore: null,
      github: null,
      video: null,
    },
    metric: null,
    status: "Live at hirepross.com",
    detail: {
      overview: [
        "HirePross is a two-sided services marketplace for Canada, built for a freelance client. A customer posts a project once; verified local trades, merchants and hire yards quote their part of it — labor, building materials and equipment rental — and every quote lands in one project with a running total, the messages and the invoices.",
        "I built it in React with Vite on a fully serverless Firebase backend: Cloud Functions run the task and quote lifecycles as state machines, chat is real-time, ratings are tied to completed work, an admin panel oversees the marketplace and a SendGrid pipeline handles email. It is deployed in production behind Nginx.", // EDIT: on 2026-09-28 hirepross.com served a WordPress 7.1 site (custom "hirepross" theme) — confirm the React/Vite/Firebase build is what is live, or say which part of the product it powers
      ],
      problem:
        "Almost every build needs people, materials and equipment, and pricing them separately means three sets of phone calls and no idea what the whole job costs. HirePross takes one description and puts it out for pricing three ways, with verification, reviews and payment handled on the platform.",
      contribution: [
        "React + Vite front end for customers and providers: post a task, compare quotes, message in the thread, accept and pay",
        "Task and quote lifecycles modeled as state machines in Firebase Cloud Functions — offer, acceptance, completion, payment, invoice",
        "Real-time chat between customer and provider, and ratings that only customers who paid for completed work can leave",
        "Admin panel for the marketplace, plus a SendGrid email pipeline for notifications",
        "Production deployment behind Nginx",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "Lifecycles as state machines",
          text: "A task and each quote move through explicit states, so an offer can't be accepted twice, a job can't be paid before it is complete and every transition is visible to admin.",
        },
        {
          title: "Free to post, pay when it's done",
          text: "Nothing is charged when a quote is accepted; payment goes through the platform once the work is finished, which is the trust mechanism the marketplace runs on.",
        },
        {
          title: "Reviews only from paid, completed work",
          text: "Ratings are gated on a paid, completed job, so a provider's score can't be inflated and verification — ID, insurance, licence — shows on the profile.",
        },
        {
          title: "Serverless by default",
          text: "Cloud Functions and Firebase's managed services mean the client runs the marketplace without managing servers; Nginx fronts the production deployment.",
        },
      ],
      outcomes: ["Live in production at hirepross.com"],
      stack: ["React", "Vite", "Firebase", "Cloud Functions", "SendGrid", "Nginx"],
      finalWork: null,
    },
  },

  // ─── 11 · MataafHR ─────────────────────────────────────────────────────────
  {
    slug: "mataafhr", // URL: /work/mataafhr
    index: "11",
    name: "MataafHR",
    tagline: "HR platform for records, attendance & payroll",
    summary:
      "A full-stack HRM platform where HR teams manage employee records, attendance and payroll, with a real-time analytics dashboard, role-based access and automated reports.",
    role: "Full-stack — Angular front end & Node.js backend",
    client: "Mataaf Technology",
    year: null,
    platforms: ["Web"],
    tags: ["Angular", "Node.js", "MongoDB"],
    layout: "row",
    cover: mataafhrFull,
    coverAlt:
      "Full MataafHR landing page hero on dark navy: navigation with Sign In and Register, the headline 'Simplifying HR for a Seamless HR Experience', a 'Get started for free' banner and the 'Explore the powerful features of MataafHR' heading",
    coverAspect: "2 / 1",
    tint: "#081828", // sampled from the artwork (scripts/optimize-images.mjs → tints.json), hand-adjusted
    links: {
      website: null, // https://www.mataafhr.com/ was unreachable on 2026-09-28 — restore once the domain resolves again
      playStore: null,
      appStore: null,
      github: null,
      video: null,
    },
    metric: null,
    status: "Shipped — web app", // the resume lists it as live at mataafhr.com; the domain didn't resolve on 2026-09-28
    detail: {
      overview: [
        "MataafHR is a full-stack human resource management platform built at Mataaf Technology. It brings employee management, attendance, payroll and leave into one place, with a real-time analytics dashboard, role-based access and automated reports.",
        "I built the front end in Angular and the backend in Node.js with MongoDB. Access is role-based — admins, HR staff and employees each see what they need — and employees get a self-service portal for their own records and requests.",
      ],
      problem:
        "Employee data, attendance, payroll and HR workflows tend to live in separate spreadsheets and tools. MataafHR keeps them in one application that HR teams can use from any device, with reports generated instead of compiled.",
      contribution: [
        "Angular front end that stays usable across desktop and mobile",
        "Node.js and MongoDB backend with secure APIs",
        "Employee management with profiles, roles and detailed records",
        "Attendance tracking and payroll, with leave requests and approvals",
        "Role-based access (admin, HR, employee), an employee self-service portal, a real-time analytics dashboard and automated reports",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "Three roles, one system",
          text: "Admins, HR staff and employees use one application with role-based access control, so each group sees only the tools and records relevant to them.",
        },
        {
          title: "Self-service for employees",
          text: "Employees view their own information and submit requests through a self-service portal, so routine requests don't have to go through HR by hand.",
        },
        {
          title: "Attendance feeds payroll",
          text: "Attendance is recorded in the system and payroll and reports are generated from it, instead of being compiled by hand at month end.",
        },
        {
          title: "A dashboard for HR decisions",
          text: "A real-time analytics dashboard turns the records the system already holds into a view HR can act on.",
        },
      ],
      outcomes: null,
      stack: ["Angular", "Node.js", "MongoDB"],
      finalWork: null, // the cover already shows the full landing page; add a second image here when there is one
    },
  },

  // ─── 12 · AI Chatbot Builder ───────────────────────────────────────────────
  {
    slug: "ai-chatbot-builder", // URL: /work/ai-chatbot-builder
    index: "12",
    name: "AI Chatbot Builder",
    tagline: "No-code chatbots trained on your own content",
    summary:
      "A no-code platform where a business trains a website chatbot on its own content in a drag-and-drop builder, embeds it with one line and tracks conversations and leads.",
    role: "Full-stack — React front end & NestJS backend",
    client: null,
    year: null,
    platforms: ["Web"],
    tags: ["React", "NestJS", "AI APIs"],
    layout: "row",
    cover: aichatbotCover,
    coverAlt:
      "Illustration titled 'AI Chatbot Builder – Web Application': a laptop with a 'Customize your chatbot' panel, a small white robot, a brain-shaped network graphic and a website mock-up with a 'Chat with us' button",
    coverAspect: "2 / 1",
    tint: "#063675", // sampled from the artwork (scripts/optimize-images.mjs → tints.json), hand-adjusted
    links: {
      website: null,
      playStore: null,
      appStore: null,
      github: null, // the old link pointed at the GitHub profile, not a repository
      video: null,
    },
    metric: null,
    status: "Web application",
    detail: {
      overview: [
        "AI Chatbot Builder is a no-code platform for putting a custom chatbot on a website. A business trains the bot on its own content in a drag-and-drop builder, adds it to the site with a one-line embed widget, and follows conversations and leads in an analytics dashboard.",
        "I built the front end in React and the backend in NestJS, which integrates AI APIs to answer from the trained content.", // EDIT: the source material doesn't name the language-model provider(s) — add them to `stack` if you want them shown
      ],
      problem:
        "Putting a useful chatbot on a website normally takes setup and coding knowledge. The builder removes both requirements, so a business of any size can create, train and deploy its own bot.",
      contribution: [
        "React front end with a drag-and-drop builder for the bot's flow and appearance",
        "NestJS backend that integrates AI APIs and serves each trained bot",
        "Training on the business's own content for domain-specific answers",
        "One-line embed widget for any website",
        "Analytics dashboard for conversations and leads",
      ],
      process: null, // no source material — shape when available: [{ title: "Discovery", text: "…" }, …]
      decisions: [
        {
          title: "Ground answers in the business's own content",
          text: "Each bot is trained on the customer's content, so replies are specific to that business instead of generic model output.",
        },
        {
          title: "Embed code, not an integration project",
          text: "Deployment is one line of embed code, so the person setting it up doesn't need a developer.",
        },
        {
          title: "Leads, not just transcripts",
          text: "The analytics dashboard tracks leads alongside conversations, so the bot's value shows up as contacts rather than chat logs.",
        },
        {
          title: "Match the host site",
          text: "The widget's appearance is customizable, so it blends into the website it's embedded on.",
        },
      ],
      outcomes: null,
      stack: ["React", "NestJS", "AI APIs"],
      finalWork: null,
    },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getAdjacent = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};
