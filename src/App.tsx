import { useState, useEffect } from 'react';
import { Letter } from './types';
import { INITIAL_LETTERS, PARTNER_CONFIG } from './data/initialLetters';
import { CuteDashboard } from './components/CuteDashboard';
import { FocusedLetterView } from './components/FocusedLetterView';
import { ShakeToOpenModal } from './components/ShakeToOpenModal';
import { LetterModal } from './components/LetterModal';
import { FloatingHearts } from './components/FloatingHearts';
import { ChevronLeft, LayoutList, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'letters'>('dashboard');
  const [showAllDrawer, setShowAllDrawer] = useState<boolean>(false);

  const [letters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem('giftx_letters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_LETTERS;
      }
    }
    return INITIAL_LETTERS;
  });

  const [openedLetterIds, setOpenedLetterIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('giftx_opened_letters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // State for the shake-to-open interaction
  const [shakeLetter, setShakeLetter] = useState<Letter | null>(null);
  // State for reading the fully opened letter
  const [readLetter, setReadLetter] = useState<Letter | null>(null);

  // Persist opened status
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
      {/* Lightweight 60fps Floating Ambient Hearts */}
      <FloatingHearts />

      {/* Clean Mobile-First Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#F4C2C2]/95 border-b border-black/10">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          
          {activeView === 'letters' ? (
            /* Left: Clean Back to Home button on Letters page */
            <button
              onClick={() => {
                setActiveView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-black py-1 px-2.5 rounded-full bg-black/10 active:bg-black/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
          ) : (
            /* Left: Cute Avatar & Greeting on Dashboard */
            <div 
              onClick={handleSpawnLove}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center text-[#F4C2C2] shadow-sm overflow-hidden p-0.5">
                <img
                  src="/assets/images/cat-love-letter.jpg"
                  alt="Cat Love"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <span className="font-serif font-black text-base text-black tracking-tight">
                Hey Love :)
              </span>
            </div>
          )}

          {/* Center Title on Letters Page */}
          {activeView === 'letters' && (
            <span className="font-serif font-black text-sm text-black tracking-tight">
              Open When... 💌
            </span>
          )}

          {/* Right Action */}
          <div className="flex items-center gap-1.5">
            {activeView === 'dashboard' ? (
              <button
                onClick={() => {
                  setActiveView('letters');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-black text-[#F4C2C2] active:scale-95 transition-transform shadow-md"
              >
                <span>Letters</span>
                <span className="text-[10px] bg-[#F4C2C2] text-black px-1.5 rounded-full">
                  {letters.length}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setShowAllDrawer(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black text-[#F4C2C2] active:scale-95 transition-transform"
                title="All Letters"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>All ({letters.length})</span>
              </button>
            )}

            <button
              onClick={handleSpawnLove}
              className="p-1.5 rounded-full bg-black/10 text-black active:scale-90 transition-transform"
              aria-label="Love Shower"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Views */}
      <main className="relative z-10 max-w-md mx-auto">
        {activeView === 'dashboard' ? (
          /* PAGE 1: CUTE DASHBOARD */
          <CuteDashboard
            partnerName={PARTNER_CONFIG.partnerName}
            senderName={PARTNER_CONFIG.senderName}
            totalLetters={letters.length}
            onEnterVault={() => {
              setActiveView('letters');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          /* PAGE 2: CLEAN ONE-BY-ONE LETTER FLOW */
          <div className="px-3 pt-2 pb-16">
            <FocusedLetterView
              letters={letters}
              openedLetterIds={openedLetterIds}
              onOpenLetter={handleInitiateOpen}
              onViewAllLetters={() => setShowAllDrawer(true)}
            />
          </div>
        )}
      </main>

      {/* Drawer: All Letters Vault (Opens only when she taps "All") */}
      {showAllDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-end animate-fade-in">
          <div className="bg-[#09090b] text-white rounded-t-3xl border-t-2 border-[#F4C2C2]/50 max-h-[85vh] flex flex-col p-5 shadow-2xl">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h3 className="font-serif font-black text-lg text-white">All Letters</h3>
                <p className="text-xs text-[#F4C2C2]">{openedLetterIds.length} of {letters.length} unsealed</p>
              </div>
              <button
                onClick={() => setShowAllDrawer(false)}
                className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable List of Letters */}
            <div className="overflow-y-auto py-4 space-y-3 flex-1">
              {letters.map((letter, idx) => {
                const isOpened = openedLetterIds.includes(letter.id);
                return (
                  <div
                    key={letter.id}
                    onClick={() => handleInitiateOpen(letter)}
                    className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#F4C2C2]/60 active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-8 h-8 rounded-full bg-[#F4C2C2] text-black font-bold flex items-center justify-center text-xs shrink-0">
                        {letter.sealEmoji || '💌'}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#F4C2C2] uppercase font-bold tracking-wider block">
                          Letter {idx + 1}
                        </span>
                        <h4 className="font-serif font-bold text-white text-sm truncate">
                          {letter.title}
                        </h4>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                      isOpened 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
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

      {/* Modal 1: 3-Stage Shake-To-Open Interactive Envelope */}
      <ShakeToOpenModal
        letter={shakeLetter}
        isOpen={Boolean(shakeLetter)}
        onClose={() => setShakeLetter(null)}
        onFullyOpened={handleShakeComplete}
      />

      {/* Modal 2: Opened Letter Reader (Black Stationery with Baby Pink Fonts) */}
      <LetterModal
        letter={readLetter}
        onClose={() => setReadLetter(null)}
      />
    </div>
  );
}

export default App;
