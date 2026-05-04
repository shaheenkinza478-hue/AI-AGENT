"use client";
import { useState } from "react";

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Multilingual",
    desc: "Speak in any language – our AI replies in the same language.",
    extra: "Supports 50+ languages including Urdu, Hindi, Spanish, Arabic, and more. Just type naturally!",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Instant Answers",
    desc: "Get detailed, accurate responses in seconds.",
    extra: "Our AI processes requests quickly, delivering answers almost instantly.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Context Aware",
    desc: "Remembers recent conversation for smarter replies.",
    extra: "The AI keeps track of your last messages, so you never have to repeat yourself.",
  },
];

export default function ChatFeaturesSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Why you’ll love chatting
        </h2>
        <p className="text-gray-500 mb-14 max-w-xl mx-auto">
          Smart, fast, and multilingual – built for real conversations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="group cursor-pointer"
            >
              {/* Fixed height card – equal for all */}
              <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                <div className="relative bg-white rounded-2xl p-6 h-full flex flex-col">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-shrink-0">
                    {f.desc}
                  </p>

                  {/* Expandable area with scroll */}
                  <div
                    className={`mt-2 flex-1 overflow-hidden transition-all duration-300 ${
                      expanded === i ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-100 pt-2 text-sm text-gray-500 leading-relaxed overflow-y-auto max-h-20">
                      {f.extra}
                    </div>
                  </div>

                  <span className="inline-block mt-auto text-xs font-medium text-blue-600 pt-2">
                    {expanded === i ? "Show less ↑" : "Learn more ↓"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}