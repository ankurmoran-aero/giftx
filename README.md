# 💌 Open When... — Digital Love Letters for Her

A romantic, intimate web sanctuary designed with **Baby Pink (`#F4C2C2`)** background and sleek **Black (`#000000`)** luxury envelope cards, containing sealed letters to be opened during specific moments, moods, and feelings.

Built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, optimized for instant, zero-config deployment on **Vercel**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fankurmoran-aero%2Fgiftx)

---

## 🎨 Theme & Palette

- **Background:** Baby Pink (`#F4C2C2`)
- **Envelope Cards & Buttons:** Luxury Jet Black (`#000000`)
- **Seals & Accents:** Baby Pink (`#F4C2C2`) with wax seal stamps & delicate floating particles

---

## ✨ Features

- 💌 **Sealed Envelope Collection:** Interactive 3D physical envelope aesthetics with top flaps, custom wax seal stamps, and status badges (*Read First*, *Sealed*, *Read*).
- 📜 **Stationery Letter Reader:** Unseals into a modal with romantic serif typography, personalized sign-off, and scratch-off secret P.S. note reveal.
- 📸 **Polaroid Photo Moments:** Taped polaroid picture attachments with captions and rotation angles.
- ⏳ **Days Loved Counter:** Automatically computes days together from your anniversary date with love shower confetti.
- 🫂 **Virtual Hug Sender:** One-tap action that triggers a floating heart burst across the screen.
- 🌸 **Ambient Floating Hearts:** Soft drifting particles across the baby pink canvas.
- ➕ **Add Custom Letters:** Built-in modal allowing you to add and seal new letters anytime, saved directly to localStorage.

---

## 🛠️ How to Customize (Before or After Deploy)

### 1. Partner Name & Anniversary Date
Edit [`src/data/initialLetters.ts`](src/data/initialLetters.ts):
```ts
export const PARTNER_CONFIG = {
  partnerName: 'Her Name',          // Replace with her real name or nickname
  senderName: 'Your Name',          // Your name
  anniversaryDate: '2024-01-01',    // Your anniversary or date you met (YYYY-MM-DD)
  welcomeMessage: 'A special sanctuary of letters written just for you...',
};
```

### 2. Letters & Polaroid Photos
All initial letters and photos are organized in [`src/data/initialLetters.ts`](src/data/initialLetters.ts). You can add, edit, or remove paragraphs, P.S. notes, and photos at any time.

---

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/ankurmoran-aero/giftx.git
cd giftx

# Install
npm install

# Run dev server
npm run dev
```

---

## 🌐 Deploy to Vercel

1. Push your changes to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import `ankurmoran-aero/giftx`.
3. Vercel automatically detects the Vite framework preset.
4. Click **Deploy** — your site will be live on an edge CDN in under 1 minute.
