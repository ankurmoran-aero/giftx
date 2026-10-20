import React, { useState } from 'react';
import { Letter, MoodCategory } from '../types';
import { X, Plus, Sparkles } from 'lucide-react';

interface AddLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newLetter: Letter) => void;
}

export const AddLetterModal: React.FC<AddLetterModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('Open When... ');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<MoodCategory>('love');
  const [themeColor] = useState<'rose' | 'amber' | 'purple' | 'emerald' | 'sky'>('rose');
  const [sealEmoji, setSealEmoji] = useState('💌');
  const [content, setContent] = useState('');
  const [secretNote, setSecretNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newLetter: Letter = {
      id: `letter-custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'A personal letter just for you',
      category,
      categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
      themeColor,
      sealEmoji,
      previewSnippet: content.slice(0, 45) + '...',
      content: content.split('\n\n').filter(p => p.trim().length > 0),
      secretNote: secretNote.trim() || undefined,
      signOff: 'With all my love,',
      senderName: 'Ankur',
    };

    onAdd(newLetter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <h3 className="font-extrabold text-slate-900 text-lg">Add A New Letter</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Letter Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Open When... You Are Stressed"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 font-serif"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Subtitle / Moment</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="For when the to-do list feels endless"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MoodCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
              >
                <option value="love">Love & Romance</option>
                <option value="comfort">Warm Hugs & Comfort</option>
                <option value="fun">Laughter & Fun</option>
                <option value="celebration">Celebration</option>
                <option value="special">Special Occasion</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Seal Emoji</label>
              <input
                type="text"
                value={sealEmoji}
                onChange={(e) => setSealEmoji(e.target.value)}
                maxLength={2}
                className="w-full px-3 py-2 text-xs text-center rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Letter Content (separate paragraphs with empty line)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Write your heartfelt message here..."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 font-serif"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Secret P.S. Note (Optional)</label>
            <input
              type="text"
              value={secretNote}
              onChange={(e) => setSecretNote(e.target.value)}
              placeholder="P.S. You're cute."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 italic"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Seal Letter into Box</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
