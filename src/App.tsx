import { useState, useEffect } from 'react';
import { Letter, DailyMailEntry } from './types';
import { INITIAL_LETTERS, PARTNER_CONFIG } from './data/initialLetters';
import { DAILY_MAIL } from './data/dailyMail';
import { CuteDashboard } from './components/CuteDashboard';
import { LetterScrollView } from './components/LetterScrollView';
import { DailyMailbox } from './components/DailyMailbox';
import { ShakeToOpenModal } from './components/ShakeToOpenModal';
import { LetterModal } from './components/LetterModal';
import { FloatingHearts } from './components/FloatingHearts';
import { ChevronLeft, LayoutList, X, Sparkles, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

type View = 'dashboard' | 'letters' | 'mail';

export function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [showAllDrawer, setShowAllDrawer] = useState<boolean>(false);

  // Versioned to guarantee user's 4 custom letters immediately replace old cache
  const [letters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem('giftx_letters_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_LETTERS; }
    }
    localStorage.removeItem('giftx_letters');
    localStorage.removeItem('giftx_letters_v2');
    localStorage.setItem('giftx_letters_v3', JSON.stringify(INITIAL_LETTERS));
    return INITIAL_LETTERS;
  });

  const [openedLetterIds, setOpenedLetterIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('giftx_opened_letters');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  // Daily mail state with persistence
  const [mails, setMails] = useState<DailyMailEntry[]>(() => {
    const saved = localStorage.getItem('giftx_daily_mail_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DAILY_MAIL; }
    }
    return DAILY_MAIL;
  });

  useEffect(() => {
    localStorage.setItem('giftx_daily_mail_v1', JSON.stringify(mails));
  }, [mails]);

  const handleAddMail = (newMail: DailyMailEntry) => {
    setMails((prev) => [newMail, ...prev]);
  };

  const [shakeLetter, setShakeLetter] = useState<Letter | null>(null);
  const [readLetter, setReadLetter] = useState<Letter | null>(null);

  useEffect(() => {
    localStorage.setItem('giftx_opened_letters', JSON.stringify(openedLetterIds));
  }, [openedLetterIds]);

  const handleInitiateOpen = (letter: Letter) => {
    setShowAllDrawer(false);
    setShakeLetter(letter);
  };

  const handleShakeComplete = (letter: Letter) => {
    setShakeLetter(null);
    setReadLetter(letter);
    if (!openedLetterIds.includes(letter.id)) {
      setOpenedLetterIds((prev) => [...prev, letter.id]);
    }
  };

  const handleSpawnLove = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.3 },
      colors: ['#F4C2C2', '#000000', '#ffffff', '#fb7185'],
    });
  };

  return (
    <div className="min-h-screen bg-[#F4C2C2] text-black font-sans relative overflow-x-hidden selection:bg-black selection:text-[#F4C2C2]">
      <FloatingHearts />

      {/* ── DASHBOARD VIEW ───────────────────────────────── */}
      {activeView === 'dashboard' && (
        <>
          <header className="sticky top-0 z-40 bg-[#F4C2C2]/95 border-b border-black/10 backdrop-blur-sm">
            <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
              <div onClick={handleSpawnLove} className="flex items-center gap-2 cursor-pointer select-none">
                <div className="w-7 h-7 rounded-lg bg-black overflow-hidden p-0.5">
                  <img src="/assets/images/cat-love-letter.jpg" alt="Cat" className="w-full h-full object-cover rounded" />
                </div>
                <span className="font-serif font-black text-base text-black tracking-tight">Hey Love :)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveView('mail')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-black/10 text-black active:scale-95 transition-transform"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Mail</span>
                </button>
                <button
                  onClick={() => setActiveView('letters')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-black text-[#F4C2C2] active:scale-95 transition-transform shadow-md"
                >
                  <span>Letters</span>
                  <span className="text-[10px] bg-[#F4C2C2] text-black px-1.5 rounded-full">{letters.length}</span>
                </button>
                <button onClick={handleSpawnLove} className="p-1.5 rounded-full bg-black/10 text-black active:scale-90 transition-transform">
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </header>
          <main className="relative z-10 max-w-md mx-auto">
            <CuteDashboard
              partnerName={PARTNER_CONFIG.partnerName}
              senderName={PARTNER_CONFIG.senderName}
              totalLetters={letters.length}
              onEnterVault={() => setActiveView('letters')}
              onOpenMail={() => setActiveView('mail')}
            />
          </main>
        </>
      )}

      {/* ── LETTERS VIEW (fullscreen snap-scroll) ────────── */}
      {activeView === 'letters' && (
        <div className="fixed inset-0 bg-[#F4C2C2] z-20 flex flex-col">
          <header className="shrink-0 z-30 bg-[#F4C2C2]/95 border-b border-black/10 backdrop-blur-sm">
            <div className="max-w-md mx-auto px-4 h-12 flex items-center justify-between">
              <button
                onClick={() => setActiveView('dashboard')}
                className="inline-flex items-center gap-1 text-xs font-bold text-black py-1 px-2.5 rounded-full bg-black/10 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Home
              </button>
              <span className="font-serif font-black text-sm text-black tracking-tight">Open When... 💌</span>
              <button
                onClick={() => setShowAllDrawer(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black text-[#F4C2C2] active:scale-95 transition-transform"
              >
                <LayoutList className="w-3.5 h-3.5" />
                All
              </button>
            </div>
          </header>
          <div className="flex-1 overflow-y-scroll letter-scroll-container">
            <LetterScrollView
              letters={letters}
              openedLetterIds={openedLetterIds}
              onOpenLetter={handleInitiateOpen}
              onViewAll={() => setShowAllDrawer(true)}
            />
          </div>
        </div>
      )}

      {/* ── DAILY MAIL VIEW ──────────────────────────────── */}
      {activeView === 'mail' && (
        <div className="fixed inset-0 bg-[#F4C2C2] z-20 flex flex-col">
          <header className="shrink-0 z-30 bg-[#F4C2C2]/95 border-b border-black/10 backdrop-blur-sm">
            <div className="max-w-md mx-auto px-4 h-12 flex items-center justify-between">
              <button
                onClick={() => setActiveView('dashboard')}
                className="inline-flex items-center gap-1 text-xs font-bold text-black py-1 px-2.5 rounded-full bg-black/10 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Home
              </button>
              <span className="font-serif font-black text-sm text-black tracking-tight">Daily Mail 📬</span>
              <button onClick={handleSpawnLove} className="p-1.5 rounded-full bg-black/10 text-black active:scale-90 transition-transform">
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto">
            <DailyMailbox mails={mails} onAddMail={handleAddMail} />
          </div>
        </div>
      )}

      {/* ── ALL LETTERS DRAWER ───────────────────────────── */}
      {showAllDrawer && (
        <div className="fixed inset-0 z-50 bg-black/85 flex flex-col justify-end backdrop-blur-sm animate-fade-in">
          <div className="bg-gradient-to-b from-[#181417] via-[#120f12] to-[#0c0a0c] text-white rounded-t-[32px] border-t-2 border-[#F4C2C2]/50 max-h-[85vh] flex flex-col p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div>
                <h3 className="font-serif font-black text-lg text-white">All Letters</h3>
                <p className="text-xs text-[#F4C2C2]">{openedLetterIds.length} of {letters.length} unsealed</p>
              </div>
              <button
                onClick={() => setShowAllDrawer(false)}
                className="p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-zinc-800 active:scale-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto py-4 space-y-2.5 flex-1">
              {letters.map((letter, idx) => {
                const isOpened = openedLetterIds.includes(letter.id);
                return (
                  <div
                    key={letter.id}
                    onClick={() => handleInitiateOpen(letter)}
                    className="p-3.5 rounded-2xl bg-black/60 border border-[#F4C2C2]/20 hover:border-[#F4C2C2]/60 active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-full bg-[#F4C2C2] text-black font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
                        {letter.sealEmoji || '💌'}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#F4C2C2] uppercase font-bold tracking-wider block">Letter {idx + 1}</span>
                        <h4 className="font-serif font-bold text-white text-sm truncate">{letter.title}</h4>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ml-2 ${
                      isOpened
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                        : 'bg-zinc-900 text-[#F4C2C2] border border-[#F4C2C2]/30'
                    }`}>
                      {isOpened ? 'Read' : 'Sealed'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── MODALS ───────────────────────────────────────── */}
      <ShakeToOpenModal
        letter={shakeLetter}
        isOpen={Boolean(shakeLetter)}
        onClose={() => setShakeLetter(null)}
        onFullyOpened={handleShakeComplete}
      />
      <LetterModal
        letter={readLetter}
        onClose={() => setReadLetter(null)}
      />
    </div>
  );
}

export default App;
