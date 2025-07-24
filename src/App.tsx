import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NeedsVsWantsPage from './pages/NeedsVsWantsPage';
import BudgetingGame from './pages/BudgetingGame';
import MonthlyBudgetChallenge from './pages/MonthlyBudgetChallenge';
import LoanEducationGame from './pages/LoanEducationGame';
import './app.css'
import InvestmentGame from './pages/InvestmentGame';
import InvestmentPlanner from './pages/InvestmentPlanner';
import './i18n'; // Add this
import { useState } from 'react';
import { Header } from './components/Header';
import { useTranslation } from 'react-i18next';
import { LaxmiBot } from './components/LaxmiBot';
import ScamIdentificationGame from './pages/ScamBusterGame';
import GovtSchemesFinder from './pages/GovtSchemesFinder';
export default function App() {
  const [language, setLanguage] = useState('en');
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };
  return (
    <>
      <Header onLanguageChange={changeLanguage} />
      <main className="pt-12 bg-[#f5f8ff]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/needs-vs-wants" element={<NeedsVsWantsPage />} />
          <Route path="/budgeting" element={<BudgetingGame />} />
          <Route path="/monthly-budgeting" element={<MonthlyBudgetChallenge />} />
          <Route path="/loan-education" element={<LoanEducationGame />} />
          <Route path="/scam-buster" element={<ScamIdentificationGame ln={language}/>} />
          <Route path="/loan-info" element={<LoanEducationGame />} />
          <Route path="/planner" element={<InvestmentPlanner />} />
          <Route path="/investment" element={<InvestmentGame />} />
          <Route path="/govt-schemes" element={<GovtSchemesFinder />} />
        </Routes>
      </main>
      <LaxmiBot />
    </>
  );
}
