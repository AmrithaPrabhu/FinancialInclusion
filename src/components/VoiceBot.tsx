// components/VoiceBot.tsx
import React, { useState } from "react";

interface VoiceBotProps {
  onVoiceComplete: (transcript: string) => void;
}

export const VoiceBot: React.FC<VoiceBotProps> = ({ onVoiceComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleStartListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setTranscript("");

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      onVoiceComplete(result); // Send transcript back to parent
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex inline items-center gap-3">
      <button
        onClick={handleStartListening}
        className={`text-sm px-2 py-1 text-white rounded ${isListening ? "bg-red-500" : "bg-blue-600"}`}
      >
        {isListening ? "..." : "Speak"}
      </button>

      {/* {transcript && !isListening && (
        <div className="text-green-700 font-medium animate-fade-in">
          ✅ "{transcript}"
        </div>
      )} */}
    </div>
  );
};
