"use client";
import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-700 rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left font-medium"
      >
        {question}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-gray-400">{answer}</div>}
    </div>
  );
}