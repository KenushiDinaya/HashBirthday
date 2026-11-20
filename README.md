# 🌻 Happy Birthday Hashy — ළමයෝට සුබ උපන්දිනයක් 💛

A cinematic, sunflower & butterfly themed **interactive birthday love letter** — built with
React 18 + Vite + Tailwind CSS + shadcn/ui-style components + Framer Motion.
Designed mobile-first, fully responsive, and ready for **Netlify** hosting.

---

## ✨ What's inside (5 chapters)

| # | Chapter | What it does |
|---|---------|--------------|
| 1 | **Welcome** | Sunflower welcome wish, falling petals, butterflies, shimmering gold typography, *"Open Your Surprise"* button (starts the background song) |
| 2 | **The Cake** | A 3-tier animated birthday cake — tap the candles to blow them out, triggering a full **fireworks + confetti show** (canvas-confetti) |
| 3 | **The Letter** | A sealed wax-heart envelope → opens into the handwritten-style Sinhala love letter (exact text you provided), floating over a blurred photo collage |
| 4 | **Our Memories** | 25-photo gallery: drifting floating polaroids (desktop), animated tilted polaroid grid, tap any photo → full-screen **lightbox** (keyboard ← → Esc supported) |
| 5 | **Forever** | Heart-touching finale — colossal beating heart, rising hearts, twinkling stars, the final Sinhala wish, *"Love You Forever"* in gold script, **Replay** button |

Plus: animated **butterflies** on every chapter, a floating **background-music player**
(play/pause · mute · volume slider — bottom-right), progress dots + swipe-style slide transitions,
and a thin golden progress bar on top.

---

## 🛠️ Quick start (VS Code)

```bash
# 1. Open this folder in VS Code
code .

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:5173

# 4. Production build + local preview
npm run build
npm run preview
```

Node.js **18+** (20 recommended).

---

## 🎵 Add your song (required for background music)

The site plays **`public/song.mp3`** — the file is intentionally **not** included
(you said you'll add it yourself):

1. Rename your track to **`song.mp3`**
2. Copy it into the **`public/`** folder → `public/song.mp3`
3. Rebuild (`npm run build`) and redeploy — that's it.

The player (bottom-right) gives you play/pause, mute and a volume slider, and it
starts automatically on the first tap of **"Open Your Surprise"** (browsers block
autoplay-with-sound before a user gesture, so this is the first allowed moment).

If `song.mp3` is missing, the site still works perfectly — the music button simply
shows a gentle reminder.

> **Netlify**: `song.mp3` is served as a normal static file with long-term caching
> (see `netlify.toml`), so it works everywhere, including after deploy. ✅

---

## 🖼️ Add / replace the images

All photos live in **`public/images/`** and are named exactly:

```
image1.png … image25.png
```

**To use your own photos:**
1. Drop your pictures into `public/images/` keeping the same names (or edit the list in `src/data/memories.js`)
2. Best results: **portrait 3:4 ratio** (e.g. 720×960 / 900×1200), ideally **< 300 KB each**

> Tip: compress free at [tinypng.com](https://tinypng.com) or [squoosh.app](https://squoosh.app).
> The shipped images were already resized (~5.6 MB total) and use `loading="lazy"` +
> `decoding="async"`, so Netlify loads them fast.

**Captions:** edit `src/data/memories.js` — every entry has `src` + `caption`.
The first 10 photos (image1–10) are AI-generated sunflower scenes; image11–25 are
hand-drawn sunflower placeholders labelled with their filename — simply overwrite
them with real memories and keep the names.

---

## ✏️ Customise the words & name

| What | Where |
|------|-------|
| Name **Hashy** & the welcome headline | `src/components/WelcomeScreen.jsx` |
| The cake candles, "Make a Wish" text, fireworks colors | `src/components/CakeScreen.jsx` |
| **The full Sinhala letter text** (paragraph array `LETTER_PARAGRAPHS`) | `src/components/LetterScreen.jsx` |
| **The final Sinhala wish** (`FINAL_PARAGRAPHS`) | `src/components/FinalScreen.jsx` |
| Photo list & captions | `src/data/memories.js` |
| Colors / fonts (sunflower theme) | `tailwind.config.js`, `src/index.css` |

Fonts used: Great Vibes (script), Playfair Display (headings), Nunito (UI),
Noto Serif Sinhala (Sinhala text) — all loaded from Google Fonts with graceful
fallbacks.

---

## 🚀 Deploy to Netlify (2 ways)

### Option A — GitHub + Netlify (recommended, auto-deploys on every push)
1. Push this folder to a GitHub repo
2. Netlify → **Add new site → Import an existing project** → pick the repo
3. Build settings are **auto-detected** via the included `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - `NODE_VERSION = 20`
4. Deploy 🎉 — done. HTTPS + CDN + fast image caching are handled for you.

### Option B — Drag & drop (no Git needed)
```bash
npm run build      # creates the dist/ folder
```
Then go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the
**`dist/`** folder onto the page. Live in ~30 seconds.

> SPA fallback redirects (`public/_redirects` + `netlify.toml`) are already configured,
> and `/images/*` + `/song.mp3` get `immutable` 1-year cache headers for speed.

---

## 📦 Tech stack

- **React 18** + **Vite 5** (fast HMR, hashed chunks: `vendor`, `motion`, `confetti`)
- **Tailwind CSS 3** + **shadcn/ui-style** Button & Slider components (`src/components/ui/`)
- **Framer Motion** — slide chapter transitions, floating polaroids, envelope open, heartbeat
- **canvas-confetti** — candle-blow fireworks show
- **Radix UI** slider primitive · **lucide-react** icons
- Performance: `loading="lazy"` + `decoding="async"` on all 25 photos, optimized PNGs,
  manual vendor chunking, CSS minification

## 📁 Folder structure

```
hashy-birthday/
├── index.html              # meta, fonts, title
├── netlify.toml            # build + cache headers + SPA redirect (Netlify-ready)
├── public/
│   ├── _redirects          # SPA fallback
│   ├── favicon.svg         # sunflower favicon
│   ├── images/             # image1.png … image25.png  ← YOUR PHOTOS
│   └── song.mp3            # ← YOU ADD THIS FILE
├── screenshots/            # previews of every chapter (desktop + mobile)
└── src/
    ├── App.jsx             # chapter state machine + slide transitions
    ├── index.css           # sunflower theme, keyframes, scrollbars
    ├── audio/AudioProvider.jsx   # background music context
    └── components/
        ├── WelcomeScreen.jsx  CakeScreen.jsx   LetterScreen.jsx
        ├── GalleryScreen.jsx  FinalScreen.jsx
        ├── AudioControl.jsx   (floating player: play/pause · mute · volume)
        ├── ChapterNav.jsx     Butterfly.jsx    Sunflower.jsx   PetalFall.jsx
        └── ui/                (shadcn/ui Button, Slider)
```

Made with 💛 — හිතේ තියෙන ආදරේ කවදාවත් අඩු වෙන්නේ නෑ.
