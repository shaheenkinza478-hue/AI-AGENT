"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "Is the chat free?",
    a: "Yes, you can use the chat for free. No sign‑up required.",
  },
  {
    q: "Can it understand Hindi / Urdu?",
    a: "Absolutely! Just ask in your preferred language and the AI will reply accordingly.",
  },
  {
    q: "Is my data safe?",
    a: "We don't store any conversations permanently. Your privacy is respected.",
  },
  {
    q: "How accurate are the AI answers?",
    a: "Our AI is trained on a vast knowledge base and provides highly accurate, up‑to‑date responses. For critical matters, we recommend double‑checking with additional sources.",
  },
  {
    q: "What topics can I ask about?",
    a: "You can ask about programming, science, history, general knowledge, creative writing, study tips, business ideas, and much more. If it's a safe, knowledge‑based question, we can help.",
  },
  {
    q: "Is there a limit on how many messages I can send?",
    a: "No, there is no message limit. Chat as much as you want, any time of the day.",
  },
  {
    q: "Does the AI remember our previous conversations?",
    a: "During a session, it keeps track of recent messages for context. Once you close the page, that session data is cleared.",
  },
  {
    q: "Can I use the AI for commercial projects?",
    a: "Yes, you can use the generated responses and code for personal or commercial projects without any restrictions.",
  },
  {
    q: "What languages are supported?",
    a: "We support 50+ languages including English, Urdu, Hindi, Spanish, Arabic, French, German, and more. Just type in your language.",
  },
  {
    q: "How can I give feedback or report a problem?",
    a: "Simply visit our Contact page and send us a message. We appreciate your feedback!",
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* ─── Hero Heading ─── */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Questions
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Here are answers to the most common questions we receive.
        </p>
      </section>

      {/* ─── FAQ Accordion ─── */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="group">
              {/* Animated gradient border around each FAQ card */}
              <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                <div className="relative bg-white rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl text-gray-400 transition-transform duration-300">
                      {open === i ? "−" : "+"}
                    </span>
                  </button>
                  {open === i && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { number: "10K+", label: "Questions Answered" },
            { number: "50+", label: "Languages Supported" },
            { number: "1.2s", label: "Avg. Response Time" },
            { number: "24/7", label: "Availability" },
          ].map((s, i) => (
            <div key={i} className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <div className="text-4xl font-bold mb-2">{s.number}</div>
              <div className="text-blue-100">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-gray-50 py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Still have questions?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Our team is here to help. Reach out or start building for free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-400 hover:text-blue-600 transition-all"
          >
            Contact Us
          </Link>
          <Link
            href="/builder"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
          >
            Try AI Builder
          </Link>
        </div>
      </section>
    </div>
  );
}