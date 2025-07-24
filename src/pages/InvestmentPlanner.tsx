import React, { useState } from "react";
import InvestmentGraph from "../components/InvestmentGraph";
import { useTranslation } from "react-i18next";
import "../i18n"; // Ensure i18n is loaded

interface InvestmentOption {
    name: string;
    rate: number; // in %
    risk: "Low" | "Medium" | "High";
    lockInYears: number;
    isMarketLinked: boolean;
    taxFree: boolean;
}

const investmentOptions: InvestmentOption[] = [
    { name: "Fixed Deposit (FD)", rate: 6.5, risk: "Low", lockInYears: 1, isMarketLinked: false, taxFree: false },
    { name: "SIP in Mutual Funds", rate: 12, risk: "Medium", lockInYears: 0, isMarketLinked: true, taxFree: false },
    { name: "Gold Bonds", rate: 5, risk: "Low", lockInYears: 8, isMarketLinked: true, taxFree: true },
    { name: "Stock Market (Direct)", rate: 15, risk: "High", lockInYears: 0, isMarketLinked: true, taxFree: false },
    { name: "Public Provident Fund (PPF)", rate: 7.1, risk: "Low", lockInYears: 15, isMarketLinked: false, taxFree: true },
    { name: "Recurring Deposit (RD)", rate: 6.5, risk: "Low", lockInYears: 1, isMarketLinked: false, taxFree: false },
    { name: "Real Estate", rate: 10, risk: "Medium", lockInYears: 5, isMarketLinked: true, taxFree: false },
    { name: "Corporate Bonds", rate: 8.5, risk: "Medium", lockInYears: 1, isMarketLinked: false, taxFree: false },
    { name: "Government Bonds", rate: 6.8, risk: "Low", lockInYears: 5, isMarketLinked: false, taxFree: false },
    { name: "National Savings Certificate (NSC)", rate: 7, risk: "Low", lockInYears: 5, isMarketLinked: false, taxFree: false },
];

const calculateReturns = (amount: number, rate: number, years: number): number => {
    return +(amount * Math.pow(1 + rate / 100, years)).toFixed(2);
};

const InvestmentPlanner = () => {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState(10000);
  const [years, setYears] = useState(1);
  const [risk, setRisk] = useState("Medium");
  const [results, setResults] = useState<any[]>([]);

  const handleSubmit = () => {
    const filtered = investmentOptions.filter((opt) => {
      if (risk === "Low") return opt.risk === "Low";
      if (risk === "Medium") return opt.risk !== "High";
      return true;
    });

    const calculated = filtered.map((option) => ({
      ...option,
      finalAmount: calculateReturns(amount, option.rate, years),
    }));

    setResults(calculated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#f4f7fb] rounded-lg shadow-md">
      {/* Language Switch */}
      {/* <div className="flex justify-end mb-4 gap-2">
        <button onClick={() => i18n.changeLanguage("en")} className="text-[#0018A8]">EN</button>
        <button onClick={() => i18n.changeLanguage("hi")} className="text-[#0018A8]">हिंदी</button>
        <button onClick={() => i18n.changeLanguage("mr")} className="text-[#0018A8]">मराठी</button>
      </div> */}

      <h2 className="text-3xl font-bold text-[#0018A8] mb-6">{t("planner.investmentPlanner")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 text-[#0018A8] font-medium">{t("planner.amountLabel")}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full border border-[#0018A8] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0018A8]"
          />
        </div>

        <div>
          <label className="block mb-1 text-[#0018A8] font-medium">{t("planner.durationLabel")}</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            className="w-full border border-[#0018A8] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0018A8]"
          />
        </div>

        <div>
          <label className="block mb-1 text-[#0018A8] font-medium">{t("planner.riskLabel")}</label>
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="w-full border border-[#0018A8] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#0018A8]"
          >
            <option value="Low">{t("planner.low")}</option>
            <option value="Medium">{t("planner.medium")}</option>
            <option value="High">{t("planner.high")}</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-[#0018A8] text-white px-6 py-2 rounded hover:bg-[#001090] transition"
      >
        {t("planner.compareButton")}
      </button>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#0018A8] mb-4">{t("planner.comparisonResults")}</h3>
          <table className="w-full text-sm border border-[#0018A8]">
            <thead>
              <tr className="bg-[#e0e8f9] text-[#0018A8]">
                <th className="p-2 border">{t("planner.type")}</th>
                <th className="p-2 border">{t("planner.return")}</th>
                <th className="p-2 border">{t("planner.risk")}</th>
                <th className="p-2 border">{t("planner.finalAmount")}</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res.name} className="border-t">
                  <td className="p-2 border">{res.name}</td>
                  <td className="p-2 border">{res.rate}%</td>
                  <td className="p-2 border">{t(res.risk.toLowerCase())}</td>
                  <td className="p-2 border font-medium text-[#0018A8]">₹{res.finalAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <InvestmentGraph amount={amount} years={years} investmentOptions={results} />
        </div>
      )}
    </div>
  );
}
export default InvestmentPlanner;
