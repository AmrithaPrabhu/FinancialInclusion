import { useState } from 'react';
import { getRandomScenarios } from '../data/scamScenarios';
import { useTranslation } from 'react-i18next';

export default function ScamIdentificationGame({ ln }: { ln: string }) {
  const { t } = useTranslation();
  const scamOptions = getRandomScenarios(ln, 5);
  const [step, setStep] = useState<'tutorial' | 'game' | 'result'>('tutorial');
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChoice = (index: number) => {
    if (selected != null) return;
    const isCorrect = scamOptions[currentIndex].isScam === (index === 0);
    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback('✅ ' + t('scam.correct') + ' ' + scamOptions[currentIndex].reason);
    } else {
      setFeedback('❌ ' + t('scam.notQuite') + ' ' + scamOptions[currentIndex].reason);
    }
    setSelected(index);
  };

  const handleNext = () => {
    if (step === 'tutorial') {
      setStep('game');
      setSelected(null);
      setFeedback('');
      setScore(0);
      setCurrentIndex(0);
    } else if (step === 'game') {
      if (currentIndex < scamOptions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
        setFeedback('');
      } else {
        setStep('result');
      }
    } else {
      setStep('tutorial');
    }
  };

  return (
    <div
      className="w-full min-h-screen p-6 flex flex-col items-center"
      style={{ background: 'linear-gradient(to bottom right, #f5f8ff, #e6ecf8)' }}
    >
      <h1 className="text-3xl font-extrabold mb-6 text-[#0018A8]">🔍 {t('scam.title')}</h1>

      {step === 'tutorial' && (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl text-center border border-[#c7d2f4]">
          <h2 className="text-xl font-semibold mb-4 text-[#0018A8]">{t('scam.howToSpot')}</h2>
          <ul className="list-disc text-left mb-4 pl-5 text-gray-700">
            <li>{t('scam.tip1')}</li>
            <li>{t('scam.tip2')}</li>
            <li>{t('scam.tip3')}</li>
            <li>{t('scam.tip4')}</li>
          </ul>
          <div className="mt-4 text-left">
            <h3 className="font-semibold mb-2 text-[#0018A8]">{t('scam.summary')}</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>🚨 {t('scam.clue1')}</li>
              <li>🔗 {t('scam.clue2')}</li>
              <li>📞 {t('scam.clue3')}</li>
              <li>🏆 {t('scam.clue4')}</li>
            </ul>
          </div>
          <button
            onClick={handleNext}
            className="mt-6 px-5 py-2 bg-[#0018A8] text-white rounded-lg shadow hover:bg-[#002bc5]"
          >
            {t('scam.start')}
          </button>
        </div>
      )}

      {step === 'game' && (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl text-center border border-[#c7d2f4]">
          <h2 className="text-xl font-semibold mb-4 text-[#0018A8]">{t('scam.question')}</h2>
          <p className="text-gray-800 italic mb-4">{scamOptions[currentIndex].label}</p>
          <div className="grid gap-4">
            {[true, false].map((isScam, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className={`px-4 py-2 rounded-lg border text-left w-full text-lg font-medium transition-all duration-300
                ${selected === index
                    ? isScam === scamOptions[currentIndex].isScam
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-[#f2f5fc] border-[#cfdaf0] hover:bg-[#e6ecf8]'
                  }`}
              >
                {isScam ? '🚨 ' + t('scam.scam') : '✅ ' + t('scam.safe')}
              </button>
            ))}
          </div>

          {feedback && <p className="mt-4 text-sm font-medium text-gray-700">{feedback}</p>}

          {selected != null && (
            <button
              onClick={handleNext}
              className="mt-6 px-5 py-2 bg-[#0018A8] text-white rounded-lg shadow hover:bg-[#002bc5]"
            >
              {currentIndex < scamOptions.length - 1 ? t('scam.next') : t('scam.result')}
            </button>
          )}
        </div>
      )}

      {step === 'result' && (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-md text-center border border-[#c7d2f4]">
          <h2 className="text-xl font-semibold mb-4 text-[#0018A8]">{t('scam.score')}</h2>
          <p className="text-3xl font-bold text-gray-800 mb-4">
            {score} / {scamOptions.length}
          </p>
          <button
            onClick={handleNext}
            className="mt-4 px-5 py-2 bg-[#0018A8] text-white rounded-lg shadow hover:bg-[#002bc5]"
          >
            {t('scam.playAgain')}
          </button>
        </div>
      )}
    </div>
  );
}
