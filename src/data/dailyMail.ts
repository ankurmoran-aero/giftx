import { DailyMailEntry } from '../types';

// ─────────────────────────────────────────────────────────────
// DAILY MAIL ARCHIVE
// Each entry has a `deployAt` ISO timestamp.
// The mail is INVISIBLE until that moment passes.
// Add new entries here with future timestamps to schedule them.
// ─────────────────────────────────────────────────────────────

export const DAILY_MAIL: DailyMailEntry[] = [
  {
    id: 'mail-001',
    author: 'ankur',
    authorLabel: 'From Ankur',
    subject: 'Good morning, just thinking of you ☀️',
    deployAt: '2026-10-20T06:00:00+05:30',
    emoji: '☀️',
    body: [
      'Good morning love,',
      'I woke up thinking about you — which honestly is not unusual at all.',
      "I don't have anything grand to say today. I just wanted you to see this and know that the first thought I had this morning had your name on it.",
      'Have the best day. Drink water. Eat properly. Text me when you can. 💌',
    ],
  },
  {
    id: 'mail-002',
    author: 'ankur',
    authorLabel: 'From Ankur',
    subject: 'Random appreciation post 💖',
    deployAt: '2026-10-21T20:00:00+05:30',
    emoji: '💖',
    body: [
      'Hey you,',
      'I just wanted to randomly appreciate you for being exactly who you are.',
      'You never have to change a single thing about yourself for me. I like all the parts — the loud ones, the quiet ones, the ones you try to hide.',
      'That is all. Carry on being wonderful.',
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// HOW TO ADD A NEW DAILY MAIL:
//
// 1. Copy the block below and paste it into the DAILY_MAIL array.
// 2. Set `deployAt` to whenever you want it to appear.
//    Format: 'YYYY-MM-DDTHH:MM:SS+05:30'  (IST)
// 3. Set author to 'ankur' or 'her'.
// 4. Push to GitHub — it goes live automatically at that time.
//
// {
//   id: 'mail-003',
//   author: 'ankur',
//   authorLabel: 'From Ankur',
//   subject: 'Your subject here',
//   deployAt: '2026-10-22T09:00:00+05:30',
//   emoji: '💌',
//   body: [
//     'First paragraph...',
//     'Second paragraph...',
//   ],
// },
// ─────────────────────────────────────────────────────────────
