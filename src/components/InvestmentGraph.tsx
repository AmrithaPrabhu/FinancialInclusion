import { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from 'recharts';
import { useTranslation } from "react-i18next";

interface InvestmentGraphProps {
    amount: number;
    years: number;
    investmentOptions: {
        name: string;
        finalAmount: number;
    }[];
}

export default function InvestmentGraph({
    amount,
    years,
    investmentOptions,
}: InvestmentGraphProps) {
    const { t } = useTranslation();

    const data = useMemo(() => {
        return investmentOptions.map(({ name, finalAmount }) => ({
            name,
            returns: finalAmount,
        }));
    }, [investmentOptions]);

    return (
        <div className="w-full h-[500px] p-4 rounded-2xl shadow-lg bg-gradient-to-br from-[#E6EEFF] to-[#F5F8FF] border border-[#0018A8]/20">
            <h2 className="text-xl font-semibold mb-4 text-center text-[#0018A8]">
                📊 {t('investmentGraph.title', { amount: amount.toLocaleString() })}
            </h2>

            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
                    <XAxis
                        dataKey="name"
                        interval={0}
                        angle={-20}
                        textAnchor="end"
                        height={70}
                        tick={{ fontSize: 12, fill: '#1E293B' }}
                    />
                    <YAxis
                        unit="₹"
                        tick={{ fontSize: 12, fill: '#1E293B' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#f9fafb',
                            borderColor: '#cbd5e1',
                            borderRadius: '8px',
                        }}
                        cursor={{ fill: 'rgba(0, 24, 168, 0.1)' }}
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, t('investmentGraph.returns')]}
                    />
                    <Legend wrapperStyle={{ fontSize: 13, color: '#1E293B' }} />
                    <Bar
                        dataKey="returns"
                        fill="#0018A8"
                        name={`${t('investmentGraph.legend')} (${years} ${t('investmentGraph.years', { count: years })})`}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
