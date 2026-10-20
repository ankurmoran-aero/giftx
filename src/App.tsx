import { useState, useEffect, useMemo } from 'react';
import { Letter, MoodCategory } from './types';
import { INITIAL_LETTERS, PARTNER_CONFIG } from './data/initialLetters';
import { Header } from './components/Header';
import { EnvelopeCard } from './components/EnvelopeCard';
import { LetterModal } from './components/LetterModal';
import { FloatingHearts } from './components/FloatingHearts';
import { AddLetterModal } from './components/AddLetterModal';
import { Heart, Plus, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
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

  return (
    <div className="min-h-screen bg-[#F4C2C2] text-black font-sans relative overflow-x-hidden selection:bg-black selection:text-[#F4C2C2]">
      {/* Floating Ambient Hearts & Petals */}
      <FloatingHearts />

      {/* Top Cute Navbar Bar */}
      <header className="sticky top-0 z-40 bg-[#F4C2C2]/90 backdrop-blur-md border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={handleSpawnLove}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-[#F4C2C2] shadow-md group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-[#F4C2C2]" />
            </div>
            <div>
              <span className="font-serif font-black text-lg sm:text-xl text-black tracking-tight">
                Open When<span className="text-black">...</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-black text-[#F4C2C2] hover:bg-zinc-900 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-[#F4C2C2]" />
              <span className="hidden sm:inline">Add Letter</span>
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        {/* Banner with Anniversary/Love Days Counter & Mood Filter Tabs */}
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
