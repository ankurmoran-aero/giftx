import React, { useState } from 'react';
import { DailyMailEntry, DailyMailAuthor } from '../types';
import { Mail, Lock, ChevronDown, ChevronUp, Pen, Plus, X, Calendar, Clock, Sparkles, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyMailboxProps {
  mails: DailyMailEntry[];
  onAddMail: (mail: DailyMailEntry) => void;
  onDeleteMail: (id: string) => void;
}

function isUnlocked(deployAt: string): boolean {
  return new Date() >= new Date(deployAt);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

// Format local datetime for datetime-local input
function getLocalDateTimeString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

const EMOJI_OPTIONS = ['💌', '💖', '🌸', '🌙', '☕', '✨', '🌹', '🕊️'];

export const DailyMailbox: React.FC<DailyMailboxProps> = ({ mails, onAddMail, onDeleteMail }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [author, setAuthor] = useState<DailyMailAuthor>('ankur');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('💌');
  const [deployAt, setDeployAt] = useState<string>(() => {
    // Default to current time
    return getLocalDateTimeString(new Date());
  });

  const unlocked = mails.filter((m) => isUnlocked(m.deployAt));
  const upcoming = mails.filter((m) => !isUnlocked(m.deployAt));

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  // Quick Preset Handlers
  const handleSetPreset = (preset: 'now' | 'tonight' | 'tomorrow') => {
    const d = new Date();
    if (preset === 'now') {
      setDeployAt(getLocalDateTimeString(d));
    } else if (preset === 'tonight') {
      d.setHours(22, 0, 0, 0);
      setDeployAt(getLocalDateTimeString(d));
    } else if (preset === 'tomorrow') {
      d.setDate(d.getDate() + 1);
      d.setHours(9, 0, 0, 0);
      setDeployAt(getLocalDateTimeString(d));
    }
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const paras = message
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const newMail: DailyMailEntry = {
      id: `mail-${Date.now()}`,
      author,
      authorLabel: author === 'ankur' ? 'From Ankur' : 'From Her',
      subject: subject.trim(),
      body: paras.length > 0 ? paras : [message.trim()],
      deployAt: new Date(deployAt).toISOString(),
      emoji: selectedEmoji,
    };

    onAddMail(newMail);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F4C2C2', '#000000', '#ffffff', '#fb7185'],
    });

    // Reset Form
    setSubject('');
    setMessage('');
    setShowCompose(false);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 space-y-6 select-none">

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#F4C2C2] text-[11px] font-bold mb-3 shadow">
          <Mail className="w-3 h-3" />
          Daily Mailbox 📬
        </div>
        <h2 className="font-serif font-black text-2xl text-black">Our Letters to Each Other</h2>
        <p className="text-xs font-serif italic text-black/60 mt-1 max-w-xs mx-auto">
          Write letters to each other anytime. Choose the exact date & time for it to unlock!
        </p>

        {/* Primary Compose Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowCompose(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-black text-[#F4C2C2] font-black text-xs sm:text-sm shadow-xl active:scale-95 transition-all border border-[#F4C2C2]/40"
          >
            <Pen className="w-3.5 h-3.5 text-[#F4C2C2]" />
            <span>Write a New Letter</span>
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Unlocked / Delivered Letters */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-black/70">
            Delivered Letters ({unlocked.length})
          </span>
          <span className="text-[10px] text-black/50 font-serif italic">Tap to read</span>
        </div>

        {unlocked.length === 0 ? (
          <div className="text-center py-10 rounded-[28px] bg-black/5 border border-black/10">
            <Lock className="w-8 h-8 text-black/30 mx-auto mb-2" />
            <p className="text-sm font-serif italic text-black/50">
              No letters delivered yet. Be the first to write one!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {unlocked.map((mail) => {
              const isOpen = openId === mail.id;
              const isHers = mail.author === 'her';

              return (
                <div
                  key={mail.id}
                  className={`rounded-[26px] border overflow-hidden transition-all duration-300 shadow-md ${
                    isHers
                      ? 'border-[#F4C2C2]/60 bg-gradient-to-br from-[#1e1720] via-[#14101a] to-[#0d0b10]'
                      : 'border-[#F4C2C2]/50 bg-gradient-to-br from-[#1e1720] via-[#14101a] to-[#0d0b10]'
                  }`}
                >
                  {/* Mail header row */}
                  <button
                    onClick={() => toggle(mail.id)}
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#F4C2C2] flex items-center justify-center text-lg shadow-sm shrink-0">
                        {mail.emoji || '💌'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isHers ? 'bg-pink-950 text-pink-300 border border-pink-800' : 'bg-black text-[#F4C2C2] border border-[#F4C2C2]/30'
                          }`}>
                            {mail.authorLabel}
                          </span>
                        </div>
                        <h4 className="font-serif font-black text-white text-sm sm:text-base leading-snug truncate mt-0.5">
                          {mail.subject}
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-zinc-500" />
                          <span>Delivered {formatDate(mail.deployAt)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2 text-[#F4C2C2] p-1 rounded-full bg-zinc-900">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded letter body */}
                  {isOpen && (
                    <div className="px-5 pb-6 border-t border-zinc-800/80 bg-black/40">
                      <div className="h-0.5 bg-[#F4C2C2]/40 rounded-full my-3" />

                      <div className="space-y-3 font-serif text-zinc-200 text-sm leading-relaxed">
                        {mail.body.map((para, i) => (
                          <p key={i} className={i === 0 ? 'text-white font-semibold' : ''}>
                            {para}
                          </p>
                        ))}
                      </div>

                      <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] text-[#F4C2C2]">
                        <span className="font-cursive text-sm">With love & care ❤️</span>
                        <div className="flex items-center gap-3">
                          <span className="text-zinc-500">{formatDate(mail.deployAt)}</span>
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this letter from mailbox?')) {
                                onDeleteMail(mail.id);
                              }
                            }}
                            className="p-1 text-zinc-500 hover:text-red-400 active:scale-90 transition-all"
                            title="Delete letter"
                            aria-label="Delete letter"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upcoming / Scheduled Letters (Locked until deployAt) */}
      {upcoming.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center gap-1.5 mb-2.5 px-1">
            <Lock className="w-3.5 h-3.5 text-black/60" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-black/70">
              Upcoming Scheduled Letters ({upcoming.length})
            </span>
          </div>

          <div className="space-y-2.5">
            {upcoming.map((mail) => (
              <div
                key={mail.id}
                className="flex items-center gap-3 p-3.5 rounded-[22px] bg-black/10 border border-black/15 shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4 text-black/60" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-black/60 uppercase tracking-wider">
                      {mail.authorLabel}
                    </span>
                    <span className="text-[9px] font-mono text-black/50 bg-black/10 px-2 py-0.5 rounded-full">
                      Locked 🔒
                    </span>
                  </div>
                  <p className="text-xs font-serif font-black text-black/80 truncate mt-0.5">
                    {mail.subject}
                  </p>
                  <p className="text-[10px] text-black/60 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" />
                    <span>Unlocks on {formatDate(mail.deployAt)}</span>
                  </p>
                </div>

                {/* Cancel & Delete Scheduled Mail */}
                <div className="shrink-0 flex items-center">
                  {deleteConfirmId === mail.id ? (
                    <div className="flex items-center gap-1 animate-pop-in">
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteMail(mail.id);
                          setDeleteConfirmId(null);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-red-600 text-white font-bold text-[10px] active:scale-95 transition-transform shadow-sm"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 rounded-xl bg-black/20 text-black/70 hover:text-black"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(mail.id)}
                      className="p-2 rounded-xl text-black/40 hover:text-red-600 hover:bg-black/10 active:scale-90 transition-all"
                      title="Cancel & delete scheduled letter"
                      aria-label="Delete scheduled letter"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 
        ==================================================
        COMPOSE LETTER MODAL
        ==================================================
      */}
      {showCompose && (
        <div className="fixed inset-0 z-50 bg-black/85 flex flex-col justify-end sm:items-center sm:justify-center p-0 sm:p-4 animate-fade-in backdrop-blur-sm">
          <div className="w-full max-w-lg bg-gradient-to-br from-[#181417] via-[#120f12] to-[#0c0a0c] text-white rounded-t-[32px] sm:rounded-[32px] border-t-2 sm:border border-[#F4C2C2]/50 max-h-[92vh] flex flex-col p-5 sm:p-6 shadow-2xl overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#F4C2C2] text-black flex items-center justify-center font-bold text-xs">
                  💌
                </span>
                <div>
                  <h3 className="font-serif font-black text-base text-white">Write Daily Mail</h3>
                  <p className="text-[10px] text-[#F4C2C2]">Send a surprise message to each other</p>
                </div>
              </div>
              <button
                onClick={() => setShowCompose(false)}
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Compose Form */}
            <form onSubmit={handleComposeSubmit} className="mt-4 space-y-4">
              
              {/* 1. Who is writing? */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Who is writing this?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthor('ankur')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      author === 'ankur'
                        ? 'bg-[#F4C2C2] text-black shadow-md border-2 border-white'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    <span>From Ankur 💌</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthor('her')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      author === 'her'
                        ? 'bg-pink-400 text-black shadow-md border-2 border-white'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    <span>From Her 🌸</span>
                  </button>
                </div>
              </div>

              {/* 2. Emoji Icon Selection */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Stamp Emoji
                </label>
                <div className="flex gap-2 overflow-x-auto py-1">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all shrink-0 ${
                        selectedEmoji === emoji
                          ? 'bg-[#F4C2C2] text-black ring-2 ring-white scale-105'
                          : 'bg-zinc-900 text-white border border-zinc-800'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Subject Line */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Subject / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thinking of your smile right now..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#F4C2C2]"
                />
              </div>

              {/* 4. Message Body */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Your Letter Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Write your heart out... (Paragraphs are supported)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#F4C2C2] font-serif leading-relaxed"
                />
              </div>

              {/* 5. When to Deploy / Unlock */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    When should this unlock? ⏰
                  </label>
                  <span className="text-[9px] text-[#F4C2C2]">Deploy date & time</span>
                </div>

                <input
                  type="datetime-local"
                  required
                  value={deployAt}
                  onChange={(e) => setDeployAt(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#F4C2C2]"
                />

                {/* Quick Presets */}
                <div className="flex gap-1.5 pt-2">
                  <button
                    type="button"
                    onClick={() => handleSetPreset('now')}
                    className="text-[9px] font-bold px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                  >
                    ⚡ Unlock Now
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetPreset('tonight')}
                    className="text-[9px] font-bold px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                  >
                    🌙 Tonight 10 PM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetPreset('tomorrow')}
                    className="text-[9px] font-bold px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                  >
                    ☀️ Tomorrow 9 AM
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#F4C2C2] text-black font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Seal & Schedule Letter 💌</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
