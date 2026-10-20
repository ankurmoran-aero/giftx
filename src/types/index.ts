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
  title: string;
  subtitle: string;
  category: MoodCategory;
  categoryLabel: string;
  themeColor: 'rose' | 'amber' | 'purple' | 'emerald' | 'sky' | 'indigo';
  sealEmoji?: string;
  unlockDate?: string;
  isSpecial?: boolean;
  previewSnippet: string;
  content: string[];
  signOff?: string;
  senderName?: string;
  polaroid?: PolaroidPhoto;
  musicTrack?: {
    title: string;
    artist: string;
    url?: string;
  };
  secretNote?: string;
}

export interface PartnerConfig {
  partnerName: string;
  senderName: string;
  anniversaryDate: string;
  customPasscode?: string;
  welcomeMessage: string;
}

// ── Daily Mail ──────────────────────────────────────────────
export type DailyMailAuthor = 'ankur' | 'her';

export interface DailyMailEntry {
  id: string;
  author: DailyMailAuthor;
  authorLabel: string;          // "From Ankur" / "From Her"
  subject: string;              // Like an email subject line
  body: string[];               // Paragraphs
  deployAt: string;             // ISO 8601 datetime — revealed only after this moment
  emoji?: string;
}
