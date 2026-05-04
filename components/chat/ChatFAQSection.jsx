"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Is the chat free?",
    a: "Yes, you can use the chat for free. No sign-up required.",
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
    a: "Our AI is trained on a vast knowledge base and provides highly accurate, up-to-date responses. For critical matters, we recommend double‑checking with additional sources.",
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

export default function ChatFAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
          Quick answers to common questions.
        </p>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {f.q}
                <span className="text-xl text-gray-400">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}