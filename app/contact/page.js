"use client";
import { useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Email",
    detail: "hello@aiagentbuilder.com",
    action: "copy",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Location",
    detail: "San Francisco, CA",
    action: "map",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Support Hours",
    detail: "24/7 – We're always here",
    action: "info",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  const handleCardClick = (card) => {
    if (card.action === "copy") {
      navigator.clipboard.writeText(card.detail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (card.action === "map") {
      window.open("https://maps.google.com/?q=San+Francisco+CA", "_blank");
    } else if (card.action === "info") {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* ─── Hero Heading ─── */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Get in{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Have a question or want to work with us? We’d love to hear from you.
        </p>
      </section>

      {/* ─── Contact Info Cards ─── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(info)}
              className="group cursor-pointer"
            >
              <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                <div className="relative bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                    <p className="text-gray-600 text-sm">{info.detail}</p>
                    {info.action === "copy" && copied && (
                      <span className="text-xs text-green-600 mt-1 block">✓ Copied</span>
                    )}
                    {info.action === "info" && showTooltip && (
                      <span className="text-xs text-blue-600 mt-1 block">We're online 24/7!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact Form (unchanged) ─── */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
          <div className="relative bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a message</h2>
            {sent && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl text-sm">
                ✅ Message sent! We’ll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <textarea
                name="message"
                rows={5}
                placeholder="How can we help?"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Final CTA (unchanged) ─── */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Prefer to start building?
        </h2>
        <p className="max-w-xl mx-auto opacity-90 mb-8">
          Jump into our AI Builder and create something amazing right now.
        </p>
        <a
          href="/builder"
          className="inline-block px-8 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:shadow-white/30 hover:-translate-y-0.5 transition-all"
        >
          Try AI Builder
        </a>
      </section>
    </div>
  );
}