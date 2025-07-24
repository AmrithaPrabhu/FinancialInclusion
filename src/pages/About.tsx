import React from "react";

const features = [
  {
    title: "🧺 Needs vs Wants",
    description:
      "Learn to distinguish between essential needs and lifestyle wants through an interactive drag-and-drop game. This foundational level builds budgeting awareness and spending discipline.",
  },
  {
    title: "📈 Investment Planner",
    description:
      "Explore and compare various investment options like SIPs, FDs, Bonds, and Real Estate. Use our interactive tool to simulate returns and assess risk levels based on your preferences.",
  },
  {
    title: "🕵️ Scam Buster",
    description:
      "Test your ability to spot financial scams! Read real-world scenarios and identify red flags to stay safe from frauds like phishing, Ponzi schemes, and fake investment apps.",
  },
  {
    title: "🤖 LaxmiBot Chatbot",
    description:
      "Have questions about budgeting, saving, or investments? Ask LaxmiBot! Our AI-powered assistant is here to guide you with trusted financial literacy insights anytime.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-700">About Digi-Laxmi</h1>
      <p className="text-lg text-gray-700 mb-10 text-center">
        Digi-Laxmi is your interactive guide to mastering personal finance! Learn through gamified levels, real-world simulations, and smart tools designed for young adults and learners of all ages.
      </p>

      <div className="space-y-8">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{feature.title}</h2>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
