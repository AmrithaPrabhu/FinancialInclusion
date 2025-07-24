import { useState } from 'react';
import { motion } from 'framer-motion';

const initialItems = [
    { id: '1', label: 'Groceries' },
    { id: '2', label: 'New Shoes' },
    { id: '3', label: 'Savings Deposit' },
    { id: '4', label: 'Movie Ticket' },
    { id: '5', label: 'Electricity Bill' },
    { id: '6', label: 'Dining Out' },
];

const correctMapping: Record<string, string> = {
    'Groceries': 'Needs',
    'New Shoes': 'Wants',
    'Savings Deposit': 'Savings',
    'Movie Ticket': 'Wants',
    'Electricity Bill': 'Needs',
    'Dining Out': 'Wants',
};

const BudgetingGame = () => {
    const [items, setItems] = useState(initialItems);
    const [zones, setZones] = useState({
        Needs: [] as string[],
        Wants: [] as string[],
        Savings: [] as string[],
    });
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [dragOverZone, setDragOverZone] = useState<string | null>(null);
    const [scoreHistory, setScoreHistory] = useState<number[]>([]);

    const handleDragStart = (e: any, id: string) => {
        setDraggedItem(id);
    };

    const handleDragEnter = (zone: string) => setDragOverZone(zone);
    const handleDragLeave = () => setDragOverZone(null);

    const handleDrop = (zone: keyof typeof zones) => {
        if (!draggedItem) return;
        const itemLabel = items.find(i => i.id === draggedItem)?.label;
        if (!itemLabel) return;

        setZones(prev => ({
            ...prev,
            [zone]: [...prev[zone], draggedItem],
        }));
        setItems(prev => prev.filter(i => i.id !== draggedItem));
        setDraggedItem(null);
        setDragOverZone(null);
    };

    const calculateScore = () => {
        let correct = 0;
        for (const zone in zones) {
            for (const itemId of zones[zone as keyof typeof zones]) {
                const label = initialItems.find(i => i.id === itemId)?.label;
                if (label && correctMapping[label] === zone) correct++;
            }
        }
        return Math.round((correct / initialItems.length) * 100);
    };

    const getFeedback = () => {
        const score = calculateScore();
        if (score === 100) return "🎉 Perfect! You're a budgeting master!";
        if (score >= 70) return "👍 Great job! You’re getting the hang of it!";
        if (score >= 40) return "🧐 Keep practicing to improve your budgeting skills!";
        return "💡 Try again and learn better spending habits!";
    };

    const resetGame = () => {
        setScoreHistory(prev => [...prev, calculateScore()]);
        setItems(initialItems);
        setZones({
            Needs: [],
            Wants: [],
            Savings: [],
        });
        setDraggedItem(null);
        setDragOverZone(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-pink-100 p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">💰 Level 2: Budgeting Challenge</h1>
            <p className="mb-6 text-sm text-gray-600">Drag each item to the correct budget category.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

                {items.map(item => (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragEnd={() => setDraggedItem(null)}
                        className={`cursor-pointer px-4 py-3 text-sm font-medium rounded-lg border 
                                    transition duration-200 text-gray-800 select-none
                                    ${draggedItem === item.id
                                ? 'bg-yellow-300 shadow-xl ring-2 ring-yellow-500 scale-105'
                                : 'bg-white shadow hover:shadow-md hover:bg-gray-50'}`}
                    >
                        {item.label}
                    </div>
                ))}

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
                {(['Needs', 'Wants', 'Savings'] as const).map((zone) => (
                    <div
                        key={zone}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={() => handleDragEnter(zone)}
                        onDragLeave={handleDragLeave}
                        onDrop={() => handleDrop(zone)}
                        className={`min-h-[120px] rounded-lg p-4 transition-all border-2 shadow-inner ${dragOverZone === zone
                            ? 'bg-yellow-50 border-yellow-400'
                            : 'bg-white border-dashed border-gray-400'
                            }`}
                    >
                        <h3 className="text-center font-semibold text-lg mb-2">{zone}</h3>
                        <div className="flex flex-wrap gap-3 gap-[8px]">
                            {zones[zone].map(id => {
                                const label = initialItems.find(i => i.id === id)?.label;
                                return (
                                    <div
                                        key={id}
                                        className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-xl text-sm font-medium shadow"
                                    >
                                        {label}
                                    </div>
                                );
                            })}
                        </div>


                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <>
                    <h2 className="text-xl font-semibold mt-6">
                        🧠 Your Budgeting Score: {calculateScore()}%
                    </h2>
                    <p className="mt-2 text-sm italic">{getFeedback()}</p>

                    {scoreHistory.length > 0 && (
                        <div className="mt-4 text-sm text-gray-700">
                            <h4 className="font-semibold">📈 Previous Scores:</h4>
                            <ul className="list-disc list-inside">
                                {scoreHistory.map((score, idx) => (
                                    <li key={idx}>Attempt {idx + 1}: {score}%</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <motion.button
                        onClick={resetGame}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        🔁 Restart Game
                    </motion.button>
                </>
            )}
        </div>
    );
};

export default BudgetingGame;
