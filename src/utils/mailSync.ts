// src/utils/mailSync.ts - Cloud synchronization for GiftX Daily Mail
import { DailyMailEntry } from '../types';
import { DAILY_MAIL } from '../data/dailyMail';

const STORAGE_KEY = 'giftx_daily_mail_v1';
const DELETED_KEY = 'giftx_deleted_mail_ids';
const LAST_SYNC_KEY = 'giftx_last_cloud_sync';

const GITHUB_REPO = 'ankurmoran-aero/giftx';
const ISSUE_NUMBER = 1;

export function getLocalMails(): DailyMailEntry[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[MailSync] Error reading local mails:', err);
  }
  return DAILY_MAIL;
}

export function saveLocalMails(mails: DailyMailEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mails));
  } catch (err) {
    console.error('[MailSync] Error saving local mails:', err);
  }
}

export function getDeletedMailIds(): string[] {
  try {
    const saved = localStorage.getItem(DELETED_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function markMailAsDeleted(id: string): void {
  const deleted = getDeletedMailIds();
  if (!deleted.includes(id)) {
    const updated = [...deleted, id];
    try {
      localStorage.setItem(DELETED_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
}

/**
 * Fetch mails from cloud.
 * 1. Tries /api/mail
 * 2. Fallbacks to public GitHub Issue #1
 */
export async function fetchCloudMails(): Promise<DailyMailEntry[] | null> {
  // 1. Try serverless API
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch('/api/mail', { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data = await res.json();
      if (data?.success && Array.isArray(data.mails)) {
        return data.mails;
      }
    }
  } catch {
    // Failed or running locally without /api/mail serverless
  }

  // 2. Direct GitHub Issue #1 fallback (public read-only)
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues/${ISSUE_NUMBER}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.ok) {
      const issue = await res.json();
      if (issue.body) {
        const parsed = JSON.parse(issue.body);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn('[MailSync] Cloud fetch failed:', err);
  }

  return null;
}

/**
 * Push mails to cloud via /api/mail serverless endpoint
 */
export async function pushCloudMails(mails: DailyMailEntry[]): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch('/api/mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mails }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (res.ok) {
      localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
      return true;
    }
  } catch (err) {
    console.warn('[MailSync] Cloud push error:', err);
  }

  return false;
}

/**
 * Merge local and cloud mails smartly:
 * - Omits any mails in deletedIds
 * - Retains any offline mails present in local
 * - Resolves conflicts by updatedAt
 */
export function mergeMails(
  localMails: DailyMailEntry[],
  cloudMails: DailyMailEntry[],
  deletedIds: string[]
): { merged: DailyMailEntry[]; needsCloudPush: boolean } {
  const deletedSet = new Set(deletedIds);
  const map = new Map<string, DailyMailEntry>();

  // Add all non-deleted cloud mails
  for (const m of cloudMails) {
    if (!deletedSet.has(m.id)) {
      map.set(m.id, m);
    }
  }

  let needsCloudPush = false;

  // Merge in local mails
  for (const local of localMails) {
    if (deletedSet.has(local.id)) continue;

    if (!map.has(local.id)) {
      // Local has a mail that cloud doesn't have yet (e.g. Arti typed it offline!)
      map.set(local.id, local);
      needsCloudPush = true;
    } else {
      const cloud = map.get(local.id)!;
      // If local version was modified more recently, use local
      const localTime = local.updatedAt || local.createdAt || 0;
      const cloudTime = cloud.updatedAt || cloud.createdAt || 0;
      if (localTime > cloudTime) {
        map.set(local.id, local);
        needsCloudPush = true;
      }
    }
  }

  // If cloud had any deleted mails that were in deletedSet, we also need to push clean cloud
  if (cloudMails.some((m) => deletedSet.has(m.id))) {
    needsCloudPush = true;
  }

  const merged = Array.from(map.values()).sort((a, b) => {
    return new Date(b.deployAt).getTime() - new Date(a.deployAt).getTime();
  });

  return { merged, needsCloudPush };
}

/**
 * High-level sync function to be called on mount, interval, or manual refresh
 */
export async function syncMailbox(
  currentMails: DailyMailEntry[]
): Promise<{ mails: DailyMailEntry[]; updated: boolean }> {
  const deletedIds = getDeletedMailIds();
  const cloudMails = await fetchCloudMails();

  if (!cloudMails) {
    return { mails: currentMails, updated: false };
  }

  const { merged, needsCloudPush } = mergeMails(currentMails, cloudMails, deletedIds);

  // Check if merged is different from current
  const isDifferent = JSON.stringify(merged) !== JSON.stringify(currentMails);

  if (isDifferent) {
    saveLocalMails(merged);
  }

  if (needsCloudPush) {
    // Push updated set in background
    pushCloudMails(merged).catch((e) => console.warn('[MailSync] Background push error:', e));
  }

  return { mails: merged, updated: isDifferent };
}
