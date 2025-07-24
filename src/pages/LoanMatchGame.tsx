import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Scenario {
  id: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const allScenarios: Scenario[] = [
  {
    id: 1,
    question: 'You receive a message saying your loan will be cancelled unless you click a link in 5 minutes.',
    options: ['Click the link', 'Ignore and report', 'Forward to friends'],
    correct: 'Ignore and report',
    explanation: 'Scammers create urgency. Never click suspicious links.',
  },
  {
    id: 2,
    question: 'Which loan is best for buying a house?',
    options: ['Car loan', 'Personal loan', 'Home loan'],
    correct: 'Home loan',
    explanation: 'Home loans have lower interest and longer tenure for property purchase.',
  },
  {
    id: 3,
    question: 'You are offered a ₹1 lakh loan instantly without any documents. What should you do?',
    options: ['Take the loan', 'Ask for details', 'Reject and report'],
    correct: 'Reject and report',
    explanation: 'Legitimate loans require verification. Instant, no-doc loans are often scams.',
  },
  {
    id: 4,
    question: 'You want to buy a laptop but don’t have savings. What should you consider first?',
    options: ['Take a personal loan', 'Check if it’s urgent or can wait', 'Swipe credit card'],
    correct: 'Check if it’s urgent or can wait',
    explanation: 'Avoid unnecessary debt. If not urgent, save and buy later.',
  },
  {
    id: 5,
    question: 'What is EMI?',
    options: ['Emergency Money Insurance', 'Equated Monthly Installment', 'Early Money Investment'],
    correct: 'Equated Monthly Installment',
    explanation: 'EMI means fixed monthly payment made towards a loan.',
  },
  {
    id: 6,
    question: 'A loan agent calls asking for OTP to approve your application. What should you do?',
    options: ['Share OTP', 'Hang up and report', 'Call back later'],
    correct: 'Hang up and report',
    explanation: 'Never share OTPs. Genuine lenders don’t ask for OTPs on calls.',
  },
  {
    id: 7,
    question: 'You plan to buy a bike. Which loan suits best?',
    options: ['Home loan', 'Education loan', 'Two-wheeler loan'],
    correct: 'Two-wheeler loan',
    explanation: 'Two-wheeler loans are designed specifically for purchasing bikes.',
  }
];

const LoanEducationGame = () => {
  const [showTutorial, setShowTutorial] = useState(true);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [current, setCurrent] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const randomScenarios = [...allScenarios].sort(() => 0.5 - Math.random()).slice(0, 5);
    setScenarios(randomScenarios);
  }, []);

  const handleStart = () => {
    setShowTutorial(false);
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;

    setSelectedOption(option);

    const isCorrect = option === scenarios[current].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (current + 1 < scenarios.length) {
        setCurrent(current + 1);
      } else {
        setShowResult(true);
      }
    }, 1800);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrent(0);
    setShowResult(false);
    const reshuffled = [...allScenarios].sort(() => 0.5 - Math.random()).slice(0, 5);
    setScenarios(reshuffled);
  };

  if (showTutorial) {
    return (
      <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">💡 Learn About Loans</h1>
        <p className="text-gray-700 text-lg max-w-xl mb-6 text-center">
          In this game, you’ll learn about good borrowing habits, identify scams, and understand different loan types. 
          Choose wisely to score points and become financially smarter!
        </p>
        <button
          className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition"
          onClick={handleStart}
        >
          Start Game 🚀
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-green-50">
        <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 Game Over!</h2>
        <p className="text-lg mb-6 text-gray-700">Your Score: <strong>{score}</strong> / {scenarios.length}</p>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleRestart}
        >
          Restart
        </button>
        <button
          className="mt-3 text-sm text-gray-600 underline"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const scenario = scenarios[current];

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Q{current + 1}: {scenario.question}</h2>
        <div className="space-y-3">
          {scenario.options.map((opt) => {
            const isCorrect = selectedOption && opt === scenario.correct;
            const isWrong = selectedOption === opt && opt !== scenario.correct;

            return (
              <div
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className={`cursor-pointer border px-4 py-2 rounded-lg transition ${
                  selectedOption
                    ? isCorrect
                      ? 'bg-green-200 border-green-500'
                      : isWrong
                      ? 'bg-red-200 border-red-500'
                      : 'bg-gray-100'
                    : 'hover:bg-blue-100'
                }`}
              >
                {opt}
              </div>
            );
          })}
        </div>

        {selectedOption && (
          <div className="mt-4 text-sm text-gray-700">
            <strong>Explanation:</strong> {scenario.explanation}
          </div>
        )}

        <div className="mt-6 text-gray-600 text-sm">
          Progress: {current + 1} / {scenarios.length} | Score: {score}
        </div>
      </div>
    </div>
  );
};

export default LoanEducationGame;
