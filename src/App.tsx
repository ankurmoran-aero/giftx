import { useState, useEffect, useMemo, useRef } from 'react';
import { Letter, MoodCategory } from './types';
import { INITIAL_LETTERS, PARTNER_CONFIG } from './data/initialLetters';
import { CuteDashboard } from './components/CuteDashboard';
import { Header } from './components/Header';
import { EnvelopeCard } from './components/EnvelopeCard';
import { LetterModal } from './components/LetterModal';
import { FloatingHearts } from './components/FloatingHearts';
import { AddLetterModal } from './components/AddLetterModal';
import { Plus, Sparkles, Mail, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'letters'>('dashboard');

  const [letters, setLetters] = useState<Letter[]>(() => {
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

  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MoodCategory>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const vaultRef = useRef<HTMLDivElement>(null);

  // Compute days together
  const daysLoved = useMemo(() => {
    const start = new Date(PARTNER_CONFIG.anniversaryDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - start.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  // Persist opened status
  useEffect(() => {
    localStorage.setItem('giftx_opened_letters', JSON.stringify(openedLetterIds));
  }, [openedLetterIds]);

  // Persist custom letters if added
  useEffect(() => {
    localStorage.setItem('giftx_letters', JSON.stringify(letters));
  }, [letters]);

  // Filter letters by selected mood category
  const filteredLetters = useMemo(() => {
    if (selectedCategory === 'all') return letters;
    return letters.filter((l) => l.category === selectedCategory);
  }, [letters, selectedCategory]);

  const handleOpenLetter = (letter: Letter) => {
    setSelectedLetter(letter);
    if (!openedLetterIds.includes(letter.id)) {
      setOpenedLetterIds((prev) => [...prev, letter.id]);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F4C2C2', '#ffffff', '#000000', '#f43f5e'],
      });
    }
  };

  const handleAddLetter = (newLetter: Letter) => {
    setLetters((prev) => [newLetter, ...prev]);
  };

  const handleSpawnLove = () => {
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#F4C2C2', '#000000', '#ffffff', '#fb7185'],
    });
  };

  const handleEnterVault = () => {
    setActiveView('letters');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4C2C2] text-black font-sans relative overflow-x-hidden selection:bg-black selection:text-[#F4C2C2]">
      {/* Floating Ambient Hearts & Petals */}
      <FloatingHearts />

      {/* Top Glassmorphic Navbar */}
      <header className="sticky top-0 z-40 bg-[#F4C2C2]/80 backdrop-blur-md border-b border-black/10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo / Switch to Dashboard */}
          <div 
            onClick={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-[#F4C2C2] shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/assets/images/cat-love-letter.jpg"
                alt="Cat Love"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-serif font-black text-lg text-black tracking-tight">
                Hey Love :)
              </span>
            </div>
          </div>

          {/* Navigation Pill Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => {
                setActiveView('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeView === 'dashboard'
                  ? 'bg-black text-[#F4C2C2] shadow-md'
                  : 'bg-black/10 hover:bg-black/20 text-black'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setActiveView('letters');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeView === 'letters'
                  ? 'bg-black text-[#F4C2C2] shadow-md'
                  : 'bg-black/10 hover:bg-black/20 text-black'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Letters ({letters.length})</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-black text-[#F4C2C2] hover:bg-zinc-900 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Letter</span>
            </button>

            <button
              onClick={handleSpawnLove}
              className="p-2 rounded-xl bg-black text-[#F4C2C2] hover:scale-105 transition-all shadow-md active:scale-95"
              title="Shower with love"
              aria-label="Shower with love"
            >
              <Sparkles className="w-4 h-4 text-[#F4C2C2]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="relative z-10">
        {activeView === 'dashboard' ? (
          /* First Page: Cute Dashboard with "Hey Love :)" and info button */
          <CuteDashboard
            partnerName={PARTNER_CONFIG.partnerName}
            senderName={PARTNER_CONFIG.senderName}
            daysLoved={daysLoved}
            totalLetters={letters.length}
            onEnterVault={handleEnterVault}
          />
        ) : (
          /* Second Page: Full Letters Collection */
          <div ref={vaultRef} className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 animate-fade-in">
            {/* Header & Mood Filter Tabs */}
            <Header
              partnerName={PARTNER_CONFIG.partnerName}
              senderName={PARTNER_CONFIG.senderName}
              anniversaryDate={PARTNER_CONFIG.anniversaryDate}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              lettersCount={letters.length}
              openedCount={openedLetterIds.length}
            />

            {/* Letters Grid: Black Cards on Baby Pink Background */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-4">
              {filteredLetters.map((letter) => (
                <EnvelopeCard
                  key={letter.id}
                  letter={letter}
                  isOpened={openedLetterIds.includes(letter.id)}
                  onOpen={handleOpenLetter}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredLetters.length === 0 && (
              <div className="text-center py-16 bg-black text-white rounded-3xl border border-black max-w-md mx-auto my-8 p-8 shadow-xl">
                <span className="text-3xl">💌</span>
                <h3 className="font-serif font-bold text-white text-base mt-2">No letters in this mood</h3>
                <p className="text-xs text-zinc-400 mt-1">Try switching to "All Letters" or add one for this moment.</p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 px-4 py-2 bg-[#F4C2C2] text-black rounded-xl text-xs font-bold hover:bg-white transition-colors"
                >
                  View All Letters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8 text-center text-xs text-black/70 font-serif">
        <p>Made with all my heart for {PARTNER_CONFIG.partnerName} • Always only a letter away</p>
      </footer>

      {/* Modal: Opened Letter Reader */}
      <LetterModal
        letter={selectedLetter}
        onClose={() => setSelectedLetter(null)}
      />

      {/* Modal: Add New Letter */}
      <AddLetterModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddLetter}
      />
    </div>
  );
}

export default App;
