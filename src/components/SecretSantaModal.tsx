import React, { useState } from 'react';
import { Users, X, Plus, Trash2, Shuffle, Check, DollarSign } from 'lucide-react';
import { SecretSantaParticipant } from '../types';
import confetti from 'canvas-confetti';

interface SecretSantaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretSantaModal: React.FC<SecretSantaModalProps> = ({ isOpen, onClose }) => {
  const [participants, setParticipants] = useState<SecretSantaParticipant[]>([
    { id: '1', name: 'Alice', email: 'alice@example.com', wishlistHint: 'Books & Specialty Coffee' },
    { id: '2', name: 'Bob', email: 'bob@example.com', wishlistHint: 'Smart tech gadgets' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com', wishlistHint: 'Warm cozy throws' },
  ]);
  const [newName, setNewName] = useState('');
  const [newHint, setNewHint] = useState('');
  const [budget, setBudget] = useState('50');
  const [assignments, setAssignments] = useState<{ giver: string; receiver: string; hint?: string }[]>([]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleAddParticipant = () => {
    if (!newName.trim()) return;
    setParticipants([
      ...participants,
      {
        id: Date.now().toString(),
        name: newName.trim(),
        email: '',
        wishlistHint: newHint.trim() || undefined,
      },
    ]);
    setNewName('');
    setNewHint('');
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleGeneratePairs = () => {
    if (participants.length < 3) {
      alert('Please add at least 3 participants to run a Secret Santa exchange!');
      return;
    }

    // Shuffle algorithm avoiding self-pairing (Derangement)
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const pairs: { giver: string; receiver: string; hint?: string }[] = [];

    for (let i = 0; i < shuffled.length; i++) {
      const giver = shuffled[i];
      const receiver = shuffled[(i + 1) % shuffled.length];
      pairs.push({
        giver: giver.name,
        receiver: receiver.name,
        hint: receiver.wishlistHint,
      });
    }

    setAssignments(pairs);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleCopySummary = () => {
    const text = assignments
      .map((a) => `${a.giver} ➔ ${a.receiver} (Wish hint: ${a.hint || 'Open choice'})`)
      .join('\n');
    navigator.clipboard.writeText(`🎄 GiftX Secret Santa (Budget: $${budget}) 🎄\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Secret Santa Exchange</h3>
              <p className="text-xs text-slate-500">Fast, fair, and automated gift generator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Budget Setting */}
        <div className="mt-5 flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">Spending Cap / Target</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400">$</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 text-right focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Add Participant Input */}
        <div className="mt-4 space-y-2">
          <label className="text-xs font-bold text-slate-700">Add Participants ({participants.length})</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Name (e.g. Maya)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
            />
            <input
              type="text"
              placeholder="Wish hint (optional)"
              value={newHint}
              onChange={(e) => setNewHint(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
            />
            <button
              onClick={handleAddParticipant}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Participant Chips */}
        <div className="mt-4 max-h-36 overflow-y-auto space-y-1.5 pr-1">
          {participants.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs"
            >
              <div className="truncate">
                <span className="font-bold text-slate-800">{p.name}</span>
                {p.wishlistHint && (
                  <span className="ml-2 text-slate-500 italic">"{p.wishlistHint}"</span>
                )}
              </div>
              <button
                onClick={() => handleRemoveParticipant(p.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Draw Button */}
        <div className="mt-5">
          <button
            onClick={handleGeneratePairs}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            <span>Generate Secret Santa Pairings</span>
          </button>
        </div>

        {/* Assignments Result */}
        {assignments.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
                Pairings Generated 🎉
              </h4>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                <span>{copied ? 'Copied to Clipboard' : 'Copy All'}</span>
              </button>
            </div>

            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {assignments.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-xs flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-900">{item.giver}</span>
                  <span className="text-rose-500 font-bold">➔ buys for ➔</span>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">{item.receiver}</span>
                    {item.hint && (
                      <p className="text-[10px] text-slate-500 italic">Hint: {item.hint}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
