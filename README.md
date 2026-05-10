# 🌟 Portfolio — ThreeJS Glass Edition

**Warm Alabaster (Day) × Amber Bronze (Night)**

Smooth, unique, animated portfolio with ThreeJS glass cosmos, liquid metal navbar, aurora particles, holographic project cards, and morphing blob contact section.

---

## 📦 npm Install

```bash
npm install
```

**Packages installed:**
| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.2.0 | Core UI |
| `react-dom` | ^18.2.0 | DOM rendering |
| `three` | ^0.165.0 | 3D glass cosmos (Hero) |
| `vite` | ^4.4.0 | Dev server & build |
| `@vitejs/plugin-react` | ^4.0.0 | React fast refresh |

> **Note:** Navbar, About aurora, Projects holo, Contact blob — Canvas 2D API use pannurom (ThreeJS install venum illa, built-in browser API).  
> Only Hero section ThreeJS use pannurom.

---

## 🚀 Dev Server Start

```bash
npm run dev
```

Browser-la `http://localhost:5173` open aagum.

---

## 🏗️ Build for Production

```bash
npm run build
```

Output: `dist/` folder

---

## 📁 File Structure

```
portfolio/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── about-photo.jpg
│   │       ├── logo.png
│   │       ├── project1.png → project6.png
│   ├── components/
│   │   ├── Hero.jsx          ← 🔮 ThreeJS Glass Cosmos (floating glass shards, mouse parallax)
│   │   ├── Navbar.jsx        ← 💧 Liquid Metal Bar (Canvas 2D shader, scroll-reactive)
│   │   ├── About.jsx         ← 🌅 Aurora Particle Field (Canvas 2D, warm aurora bands)
│   │   ├── Projects.jsx      ← ✨ Holographic Cards (3D CSS tilt + holo shine)
│   │   ├── Contact.jsx       ← 🫧 Morphing Blob Aura (Canvas 2D, form-reactive blob)
│   │   └── Footer.jsx        ← Standard footer (unchanged)
│   ├── App.jsx               ← Root: darkMode state passed to all components
│   ├── index.css             ← Tailwind + existing theme variables
│   └── main.jsx              ← React entry point
├── index.html
├── package.json              ← three added as dependency
├── vite.config.js
└── README.md                 ← This file
```

---

## 🎨 Animation Breakdown

### 🔮 Hero — ThreeJS Glass Cosmos
- **Library:** `three` (WebGL)
- **Effect:** 8 floating irregular glass polygon shards
- **Day mode:** Warm alabaster glass — cream white, warm light refraction
- **Night mode:** Amber bronze glass — dark golden, rich warm depth
- **Interaction:** Mouse parallax — scene tilts as you move cursor
- **Performance:** requestAnimationFrame, pixel ratio capped at 2x

### 💧 Navbar — Liquid Metal Bar
- **Library:** Canvas 2D (browser built-in)
- **Effect:** Flowing liquid waves + shimmer streak
- **Day mode:** Warm silver alabaster ripple
- **Night mode:** Amber bronze liquid mercury
- **Scroll reactive:** Blur + opacity increases on scroll

### 🌅 About — Aurora Particle Field
- **Library:** Canvas 2D
- **Effect:** 4 flowing aurora bands + 30 floating particles
- **Day mode:** Soft pastel warm cream aurora
- **Night mode:** Deep amber gold aurora
- **Badges:** Glassmorphism style with mode-reactive colors

### ✨ Projects — Holographic Cards
- **Library:** Vanilla JS + CSS transforms
- **Effect:** 3D perspective tilt on mouse move + radial holographic shine + glow dot
- **Day mode:** Cream white holographic sweep
- **Night mode:** Amber neon holographic edge glow
- **Tags:** Amber-tinted glassmorphism pills

### 🫧 Contact — Morphing Blob Aura
- **Library:** Canvas 2D
- **Effect:** Organic blob shape slowly morphs, reacts to focused input field
- **Day mode:** Warm peach/gold alabaster blob
- **Night mode:** Deep amber/bronze blob
- **Interaction:** Blob moves toward whichever form field you click

---

## 🌗 Day / Night Mode

Toggle button is in the Navbar (sun/moon icon).

| | ☀️ Day (Warm Alabaster) | 🌙 Night (Amber Bronze) |
|---|---|---|
| Hero glass | Cream frosted, warm light | Dark golden, rich warmth |
| Navbar | Silver warm liquid | Amber bronze mercury |
| About aurora | Pastel cream waves | Deep gold aurora |
| Project cards | Warm white holo shimmer | Bronze neon holo glow |
| Contact blob | Peach soft aura | Amber deep pulse |

---

## ⚡ Performance Notes

- ThreeJS canvas only in Hero — lazy cleanup on unmount
- Canvas 2D used for all other animations (much lighter than WebGL)
- All animations use `requestAnimationFrame` — auto-pauses when tab hidden
- Mobile: ThreeJS still runs but at lower complexity (8 shards, capped pixel ratio)
- Zero external animation libraries needed (no GSAP, no framer-motion)

---

## 🛠️ Customization

**Unoda name / info change pannanum:**
- `Hero.jsx` → `Valentin Gil` text replace pannunga
- `About.jsx` → bio, timeline, badges update pannunga
- `Projects.jsx` → `projects` array-la unoda projects add pannunga
- `Contact.jsx` → email, LinkedIn, GitHub links update pannunga
- `Footer.jsx` → name, links update pannunga

**Colors change pannanum:**  
Hero.jsx-la `DAY` and `NIGHT` objects-la color values change pannunga.

---

*Built with ❤️ — ThreeJS + Canvas 2D + React + Vite*
