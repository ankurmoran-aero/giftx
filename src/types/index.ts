export type MoodCategory = 
  | 'all'
  | 'comfort'
  | 'love'
  | 'celebration'
  | 'fun'
  | 'special';

export interface PolaroidPhoto {
  url: string;
  caption: string;
  rotationDeg?: number;
}

export interface Letter {
  id: string;
  title: string;              // e.g. "Open when you miss me"
  subtitle: string;           // e.g. "When distance feels a little too loud"
  category: MoodCategory;
  categoryLabel: string;
  themeColor: 'rose' | 'amber' | 'purple' | 'emerald' | 'sky' | 'indigo';
  sealEmoji?: string;         // e.g. "💌", "🌙", "✨", "🫂"
  unlockDate?: string;        // optional date lock: 'YYYY-MM-DD'
  isSpecial?: boolean;        // e.g. "Open First" letter
  previewSnippet: string;     // Little teaser on the envelope
  content: string[];          // Paragraphs of the letter
  signOff?: string;           // e.g. "Forever yours,"
  senderName?: string;        // e.g. "Ankur"
  polaroid?: PolaroidPhoto;
  musicTrack?: {
    title: string;
    artist: string;
    url?: string;
  };
  secretNote?: string;        // Little hidden PS or scratch card note
}

export interface PartnerConfig {
  partnerName: string;
  senderName: string;
  anniversaryDate: string;    // 'YYYY-MM-DD'
  customPasscode?: string;    // Optional private lock
  welcomeMessage: string;
}
