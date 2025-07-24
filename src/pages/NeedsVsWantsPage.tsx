import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const allItems = [
  { label: 'Rent', type: 'needs' },
  { label: 'Groceries', type: 'needs' },
  { label: 'Electricity Bill', type: 'needs' },
  { label: 'Movie Tickets', type: 'wants' },
  { label: 'New Phone', type: 'wants' },
  { label: 'Ice Cream', type: 'wants' },
];

export default function NeedsVsWantsGame() {
  const { t } = useTranslation();
  const [unassignedItems, setUnassignedItems] = useState(allItems);
  const [needs, setNeeds] = useState<string[]>([]);
  const [wants, setWants] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);

  const handleDragStart = (e: any, label: string) => {
    e.dataTransfer.setData('text/plain', label);
  };

  const handleDrop = (e: React.DragEvent, target: 'needs' | 'wants') => {
    e.preventDefault();
    const itemLabel = e.dataTransfer.getData('text/plain');
    if (needs.includes(itemLabel) || wants.includes(itemLabel)) return;

    const item = allItems.find(i => i.label === itemLabel);
    if (!item) return;

    if (target === 'needs') {
      setNeeds(prev => [...prev, itemLabel]);
    } else {
      setWants(prev => [...prev, itemLabel]);
    }

    setUnassignedItems(prev => prev.filter(i => i.label !== itemLabel));

    if (item.type === target) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const allowDrop = (e: React.DragEvent) => e.preventDefault();

  const resetGame = () => {
    setUnassignedItems(allItems);
    setNeeds([]);
    setWants([]);
    setCorrectCount(0);
  };

  return (
    <div className="min-h-screen p-6 bg-[#f0f4ff] text-[#001A70] flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2 text-[#001A70]">🎯 {t('need.gameTitle')}</h1>
      <p className="mb-4 text-lg">{t('need.gameInstructions')}</p>
      <div className="text-xl font-semibold mb-6">
        {t('need.score')}: {correctCount} / {allItems.length}
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <AnimatePresence>
          {unassignedItems.map(item => (
            <motion.div
              key={item.label}
              draggable
              onDragStart={e => handleDragStart(e, item.label)}
              className="bg-white text-[#001A70] border border-[#0018A8] shadow-md rounded px-4 py-2 cursor-move hover:bg-[#e6ecff] transition"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {t(`need.items.${item.label}`)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div
          onDragOver={allowDrop}
          onDrop={e => handleDrop(e, 'needs')}
          className="bg-white rounded-lg p-6 min-h-[150px] border-2 border-[#0066CC] shadow"
        >
          <h2 className="text-xl font-bold mb-2 text-[#0066CC]">✅ {t('need.needs')}</h2>
          {needs.map(item => (
            <div
              key={item}
              className="bg-[#f5f9ff] border border-[#0066CC] rounded px-4 py-2 mb-2 shadow-sm"
            >
              {t(`items.${item}`)}
            </div>
          ))}
        </div>

        <div
          onDragOver={allowDrop}
          onDrop={e => handleDrop(e, 'wants')}
          className="bg-white rounded-lg p-6 min-h-[150px] border-2 border-[#9999CC] shadow"
        >
          <h2 className="text-xl font-bold mb-2 text-[#9999CC]">🎁 {t('need.wants')}</h2>
          {wants.map(item => (
            <div
              key={item}
              className="bg-[#f5f7fb] border border-[#9999CC] rounded px-4 py-2 mb-2 shadow-sm"
            >
              {t(`need.items.${item}`)}
            </div>
          ))}
        </div>
      </div>

      {correctCount === allItems.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-[#DFF0D8] border border-[#4CAF50] text-[#3C763D] px-6 py-3 rounded shadow-lg text-lg"
        >
          🥳 {t('need.completionMessage')}
        </motion.div>
      )}

      <button
        onClick={resetGame}
        className="mt-6 bg-[#0018A8] text-white px-6 py-2 rounded hover:bg-[#001070] transition"
      >
        {t('need.restart')}
      </button>
    </div>
  );
}
