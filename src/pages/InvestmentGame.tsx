import { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend
} from 'recharts';

const baseReturns = {
  FD: 0.065,
  SIP: 0.15,
  'Gold Bonds': 0.10,
  Stocks: 0.20,
  PPF: 0.071,
  RD: 0.065,
  'Real Estate': 0.12,
  'Corp Bonds': 0.10,
  'Govt Bonds': 0.07,
  NSC: 0.07,
};

function calculateCompound(amount: number, rate: number, years: number): number {
  return Math.round(amount * Math.pow(1 + rate, years) - amount);
}

export default function InvestmentGraph() {
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(1);

  const data = useMemo(() => {
    return Object.entries(baseReturns).map(([name, rate]) => ({
      name,
      returns: calculateCompound(amount, rate, years),
    }));
  }, [amount, years]);

  return (
    <div className="w-full bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-bold text-center mb-4">📊 Investment Return Simulator</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <label className="flex flex-col">
          💰 Amount (₹)
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2 rounded text-center"
            min={1000}
            step={1000}
          />
        </label>
        <label className="flex flex-col">
          📅 Duration (Years)
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="border p-2 rounded text-center"
            min={1}
            max={30}
          />
        </label>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="₹" />
          <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="returns" fill="#10b981" name="Return (Profit)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
