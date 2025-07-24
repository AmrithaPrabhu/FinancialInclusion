import React, { useState } from "react";
import { VoiceBot } from "./VoiceBot";
import { mockApiResponse } from "../utils/mockApi";

export const LaxmiBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const userMessage = { sender: "user" as const, text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = mockApiResponse(userInput);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleVoiceInput = (text: string) => {
    setUserInput(text);
    handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-full z-50">
      {isOpen ? (
        <div className="w-80 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col h-[500px]">
          <div className="bg-[#0018A8] text-white px-4 py-2 rounded-t-lg flex justify-between">
            <span className="font-semibold">LaxmiBot</span>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto text-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-[#6786ff] text-white" : "bg-gray-200 text-black"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {isTyping && <p className="text-gray-500 italic">Typing...</p>}
          </div>
          <div className="flex items-center p-2 border-t gap-2">
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
              placeholder="Ask me..."
            />
            <button
              onClick={handleSend}
              className="bg-[#0018A8] text-white px-3 py-1 rounded text-sm hover:bg-[#002ecf]"
            >
              Send
            </button>
            <VoiceBot onVoiceComplete={handleVoiceInput} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0018A8] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:bg-[#002ecf]"
        >
          💬
        </button>
      )}
    </div>
  );
};
