"use client";
import { useState } from "react";

const examples = [
  {
    question: "How do I create a React component?",
    answer: "Use a function that returns JSX, e.g. `function Welcome() { return <h1>Hello</h1>; }`.",
  },
  {
    question: "What is `useState` in React?",
    answer: "`useState` is a Hook that lets you add state to functional components. Example: `const [count, setCount] = useState(0);`",
  },
  {
    question: "How do I fetch data in Next.js?",
    answer: "Use `getServerSideProps` (or `getStaticProps`) in a page component, or use `fetch` inside `useEffect` for client‑side fetching.",
  },
  {
    question: "How do I reverse a string in Java?",
    answer: "You can use `new StringBuilder(str).reverse().toString();` to reverse a string in Java.",
  },
  {
    question: "What is JSX in React?",
    answer: "JSX is a syntax extension that looks like HTML but is compiled to `React.createElement` calls. It makes writing React components easier.",
  },
  {
    question: "How do I deploy a Next.js app?",
    answer: "The easiest way is to use Vercel. Connect your GitHub repo, and Vercel automatically deploys on every push. You can also export as static files.",
  },
];

export default function ChatExampleSection() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
          Coding Conversations
        </h2>
        <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
          Tap any card to copy the answer — perfect for quick coding help.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((ex, i) => (
            <div
              key={i}
              onClick={() => handleCopy(ex.answer, i)}
              className="group cursor-pointer h-full"
            >
              {/* Animated gradient border */}
              <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />

                {/* Inner white card */}
                <div className="relative bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-sm mt-0.5">Q:</span>
                    <p className="text-gray-800 font-medium text-sm">{ex.question}</p>
                  </div>

                  <div className="flex items-start gap-3 mt-4">
                    <span className="text-purple-600 font-bold text-sm mt-0.5">AI:</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{ex.answer}</p>
                  </div>

                  <div className="mt-auto pt-3 text-right">
                    {copiedIndex === i ? (
                      <span className="text-xs text-green-600">✓ Copied</span>
                    ) : (
                      <span className="text-xs text-transparent">—</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}