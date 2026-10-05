# WANDER — Premium Travel Portfolio Website

A cinematic, fully animated travel portfolio built with **HTML5 · CSS3 · Vanilla JavaScript** — no frameworks, no dependencies.

---

## 🚀 How to Run

### Option 1 — VS Code Live Server (Recommended)
1. Open the project folder in **VS Code**
2. Install the **Live Server** extension (if not installed)
3. Right-click `index.html` → **Open with Live Server**
4. Your browser opens at `http://127.0.0.1:5500`

### Option 2 — Any Local HTTP Server
```bash
# Python 3
python -m http.server 5500

# Node.js (npx)
npx serve .
```
Then open `http://localhost:5500` in your browser.

> ⚠️ **Do NOT** open `index.html` directly as a `file://` URL — some browser security policies may block Unsplash images. Always use a local server.

---

## 📁 File Structure

```
travel-portfolio/
│
├── index.html        ← All sections & markup
├── style.css         ← Design system & all styles
├── script.js         ← All interactive behaviour
│
├── assets/
│   ├── images/       ← Drop your own photos here
│   └── icons/        ← Custom icons (optional)
│
└── README.md
```

---

## 🖼️ Where to Replace Images

All images are currently loaded from **Unsplash CDN** (no account needed, works offline once cached).

To use your **own photos**, replace the `src` attributes in `index.html`:

| Section | What to look for | Replace with |
|---|---|---|
| Hero | `class="hero__img"` | Your landscape photo (16:9) |
| Destinations | `class="dest-card__img"` | Portrait photos (3:4 ratio) |
| Timeline | `class="timeline__img"` | Any travel photo |
| Stories | `class="story-card__img"` | Editorial-style photos |
| Gallery | `class="gallery-item__img"` | Mixed sizes welcome |
| About | `class="about__img"` | Your profile photo |
| Quote | `class="quote-section__img"` | Dramatic landscape |

Also update the `galleryImages` array in **`script.js`** (line ~128) to point to your local image paths for the **lightbox** full-resolution version.

```js
// script.js — galleryImages array
const galleryImages = [
  { src: 'assets/images/madurai.jpg', alt: 'Madurai Temple' },
  // ...
];
```

---

## 📍 Where to Change Destination Names & Content

All destination content is in **`index.html`**:

- **Destination Cards** → Section `id="destinations"`, look for `.dest-card` articles
- **Timeline** → Section `id="journey"`, look for `.timeline__item` divs
- **Travel Stories** → Section `id="stories"`, look for `.story-card` articles
- **Map Markers** → Look for `.map-marker` buttons; update `data-dest` attribute

Also update the **map popup data** in **`script.js`**:

```js
// script.js — destinationData object (line ~190)
const destinationData = {
  madurai: {
    name: 'Madurai',
    date: 'October 2024',
    desc: 'Your custom description here.',
    img:  'assets/images/madurai.jpg',
  },
  // ...
};
```

---

## 🎨 Where to Change Colors

All colors are **CSS variables** in `style.css` at the very top:

```css
:root {
  --bg-dark:      #08110f;   /* Main dark background */
  --bg-light:     #f5f2ea;   /* Light sections */
  --accent:       #d6a85f;   /* Gold accent color — change this! */
  --accent-dark:  #b8893e;   /* Darker accent */
  --accent-light: #e8c080;   /* Lighter accent */
  --text-light:   #ffffff;   /* Primary text */
  --text-dim:     #c8c4b8;   /* Secondary text */
  --text-muted:   #6b7a74;   /* Muted text */
}
```

> 💡 To change the accent from gold to a different color (e.g., teal `#4ecdc4`), just update `--accent`, `--accent-dark` and `--accent-light`.

---

## ✨ Where to Change Animations

### CSS Animations (`style.css`)
| Effect | Where |
|---|---|
| Floating hero elements | `.float` + `@keyframes floatAnim` |
| Scroll indicator bounce | `@keyframes scrollBounce` |
| Map marker pulse | `@keyframes markerPulse` |
| Loader circle draw | `@keyframes circleDraw` |
| Card hover tilt speed | `.dest-card` transition values |
| Scroll reveal speed | `.reveal-up` transition duration |

### JavaScript Animations (`script.js`)
| Function | Controls |
|---|---|
| `initializeParallax()` | Parallax intensity (`* 0.35`) |
| `initializeCardTilt()` | Tilt angle (`* -6`, `* 6`) |
| `initializeCounters()` | Counter duration (`duration = 2000`) |
| `initializeTimeline()` | Timeline progress scroll speed |
| `initializeCustomCursor()` | Follower lag (`* 0.15`) |

---

## 🧩 Sections Overview

| # | Section | ID |
|---|---|---|
| 1 | Loading Screen | — |
| 2 | Navbar | `#navbar` |
| 3 | Hero | `#home` |
| 4 | Destinations | `#destinations` |
| 5 | Journey / Timeline | `#journey` |
| 6 | Travel Stories | `#stories` |
| 7 | Statistics | — |
| 8 | Travel Map | `#map` |
| 9 | Photo Gallery | `#gallery` |
| 10 | Travel Quote | — |
| 11 | About | `#about` |
| 12 | Contact | `#contact` |
| 13 | Footer | — |

---

## ♿ Accessibility

- Semantic HTML5 elements throughout
- All images have descriptive `alt` text
- Interactive elements have `aria-label` attributes
- Focus states visible for keyboard navigation
- `aria-live` regions for dynamic content (form success, lightbox counter)
- Respects `prefers-reduced-motion` — all animations are disabled for users who prefer it

---

## 📱 Responsive Breakpoints

| Device | Width |
|---|---|
| Desktop | 1200px+ |
| Tablet | 768px – 1199px |
| Mobile | Below 768px |
| Small Mobile | Below 420px |

---

## 🌐 Fonts Used

- **Cormorant Garamond** — Elegant serif for headings & hero
- **Space Grotesk** — Modern sans-serif for UI & labels
- **Inter** — Clean sans-serif for body text

Loaded via Google Fonts. For offline use, download and host locally, then update the `<link>` tag in `index.html`.

---

## 📝 License

Free to use for personal and portfolio projects.

---

*Built with passion for travel and clean code. — WANDER 2026*
