// MonthlyBudgetChallenge.tsx
import { useState } from 'react';

const expenses = [
    [
        { label: 'Eat out at restaurant', cost: 800 },
        { label: 'Cook at home', cost: 300 },
    ],
    [
        { label: 'Watch movie in theatre', cost: 600 },
        { label: 'Watch movie at home', cost: 100 },
    ],
    [
        { label: 'Buy new clothes', cost: 1000 },
        { label: 'Reuse clothes', cost: 0 },
    ],
    [
        { label: 'Order food online', cost: 700 },
        { label: 'Pack lunch from home', cost: 200 },
    ],
];

export default function MonthlyBudgetChallenge() {
    const totalBudget = 10000;
    const [selected, setSelected] = useState<Array<number | null>>([null, null, null, null]);

    const handleSelect = (weekIndex: number, optionIndex: number) => {
        const updated = [...selected];
        updated[weekIndex] = optionIndex;
        setSelected(updated);
    };

    const totalSpent = selected.reduce((sum, choice, weekIndex) => {
        return (sum ?? 0) + (choice != null ? expenses[weekIndex][choice].cost : 0);
    }, 0);

    const totalSaved = totalBudget - (totalSpent ?? 0);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-r from-yellow-50 to-orange-100 text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-8">📆 Monthly Budget Challenge</h1>
            <p className="text-center text-lg mb-4">You have ₹10,000 for the month. Make smart weekly choices to save!</p>

            <div className="space-y-6">
                {expenses.map((week, weekIndex) => (
                    <div key={weekIndex} className="p-4 bg-white rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Week {weekIndex + 1}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {week.map((option, optionIndex) => {
                                const isSelected = selected[weekIndex] === optionIndex;
                                return (
                                    <button
                                        key={optionIndex}
                                        onClick={() => handleSelect(weekIndex, optionIndex)}
                                        className={`border p-4 rounded-lg transition text-left w-full cursor-pointer shadow-sm transform hover:scale-[1.02] hover:shadow-md ${isSelected ? 'bg-green-200 border-green-600 ring-2 ring-green-400' : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span className="font-medium block mb-1">{option.label}</span>
                                        <div className="text-sm text-gray-600">Cost: ₹{option.cost}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {selected.every((s) => s != null) && (
                <div className="mt-10 text-center">
                    <h2 className="text-2xl font-bold text-green-700">🎉 You saved ₹{totalSaved} this month!</h2>
                </div>
            )}
        </div>
    );
}
