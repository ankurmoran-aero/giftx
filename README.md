# 🎁 GiftX — Intelligent Gifting & Wishlist Platform

A modern, responsive, and edge-optimized web application built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, designed for zero-config, high-performance deployment on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fankurmoran-aero%2Fgiftx)

---

## ✨ Features

- 🧠 **AI Gift Recommendation Wizard:** 3-step personalized gift matcher evaluating recipient type, vibe, and budget tier.
- 🎅 **Automated Secret Santa Generator:** Instant fair derangement pair assignment with spending cap limits and instant clipboard sharing.
- 💖 **Wishlist & Gift Registry:** Instant client-side wishlisting with one-click shareable public links.
- 🛍️ **Interactive Gift Bag & Checkout:** Real-time quantity controls, optional premium gift wrapping selection, and custom handwritten note creator.
- ⚡ **Zero-Config Vercel Optimization:** Native SPA rewrites, security HTTP headers, and long-term asset caching configured in `vercel.json`.

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/ankurmoran-aero/giftx.git
cd giftx
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the template into `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Start local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

### Method 1: Instant 1-Click Import
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Click **Add New Project** and select `ankurmoran-aero/giftx`.
3. Vercel automatically detects **Vite** framework preset:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## ⚙️ Environment Variables

The project includes pre-configured environment templates:
- [`.env.example`](.env.example) — Reference template for local and production setups.
- [`.env`](.env) — Default variables for local dev.
- [`.env.production`](.env.production) — Default production variables.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_APP_NAME` | Title of the application | `GiftX` |
| `VITE_APP_URL` | Base canonical URL | `https://giftx.vercel.app` |
| `VITE_API_BASE_URL` | Backend API endpoint | `https://api.giftx.example.com/v1` |
| `VITE_ENABLE_AI_GIFT_FINDER` | Enable AI Recommendation engine | `true` |
| `VITE_ENABLE_SECRET_SANTA` | Enable Secret Santa feature | `true` |
| `VITE_ENABLE_WISHLIST_SHARING` | Enable public wishlist link copy | `true` |
| `VITE_VERCEL_ANALYTICS_ENABLED` | Enable Vercel analytics | `true` |

---

## 📁 Repository Structure

```
giftx/
├── .env.example            # Environment template for Vercel / team
├── .env                    # Local dev defaults
├── .env.production         # Production defaults
├── .gitignore              # Git ignore rules
├── index.html              # HTML entry point with fonts & meta
├── package.json            # Project dependencies & build scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS styling tokens
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # Vite Node TypeScript configuration
├── vercel.json             # Vercel deployment configuration
├── vite.config.ts          # Vite bundler configuration
└── src/
    ├── App.tsx             # Main application orchestrator
    ├── main.tsx            # React root mount
    ├── index.css           # Global Tailwind & aesthetic styles
    ├── types/
    │   └── index.ts        # TypeScript data interfaces
    ├── data/
    │   └── mockGifts.ts    # Curated initial gift items
    └── components/
        ├── Navbar.tsx      # Header with wishlist & cart counters
        ├── Hero.tsx        # Hero banner with feature quick-links
        ├── GiftCard.tsx    # Individual gift card component
        ├── GiftFilter.tsx  # Multi-category & price range filters
        ├── AiGiftFinderModal.tsx # Multi-step AI gift assistant
        ├── SecretSantaModal.tsx  # Secret Santa exchange pairing
        ├── WishlistDrawer.tsx    # Saved wishlist slide-over
        ├── CartDrawer.tsx        # Shopping bag & checkout drawer
        └── Footer.tsx      # Footer with brand & Vercel status
```

---

## 🛡️ License

MIT License. Created by [ankurmoran-aero](https://github.com/ankurmoran-aero).
