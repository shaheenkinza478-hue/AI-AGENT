"use client";
import { useState } from "react";
import Link from "next/link";

const missions = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Our Mission",
    desc: "Empower everyone to create stunning websites without writing a single line of code, using the power of AI.",
    extra: "We believe that web development should be accessible to all, regardless of technical background. Our AI tools remove complexity and let creativity flourish.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Our Vision",
    desc: "A world where anyone can bring their ideas to life instantly, with AI as their creative partner.",
    extra: "We envision a future where AI and human creativity work hand-in-hand to build the web, making the impossible trivial.",
  },
];

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: "AI Chat",
    desc: "Conversational assistant that understands context and answers in any language.",
    extra: "Supports 50+ languages, remembers recent chats, and is always available for quick help.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "AI Builder",
    desc: "Turn a text prompt into a fully responsive website with clean HTML & Tailwind CSS.",
    extra: "Generates complete landing pages, portfolios, blogs, dashboards, and more – instantly.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Instant Preview",
    desc: "See a live preview of your generated website and export the code instantly.",
    extra: "Toggle between live preview and code view, then copy or download the HTML with one click.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Responsive Design",
    desc: "Every generated page works perfectly on mobile, tablet, and desktop.",
    extra: "Built with Tailwind CSS mobile-first approach, ensuring a flawless experience everywhere.",
  },
];

const team = [
  { name: "Alex Johnson", role: "Founder & Lead Developer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { name: "Sarah Chen", role: "AI Research Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
  { name: "Michael Brown", role: "Full‑Stack Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
  { name: "Emma Wilson", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
];

const statsData = [
  { number: "10K+", label: "Projects Generated" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "3s", label: "Avg. Generation Time" },
  { number: "24/7", label: "AI Support" },
];

export default function AboutPage() {
  const [expandedMission, setExpandedMission] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [copiedTeam, setCopiedTeam] = useState(null);
  const [copiedStat, setCopiedStat] = useState(null);

  const copyText = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(text);
    setTimeout(() => setter(null), 1500);
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          About{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Builder
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          We’re on a mission to make web development effortless, using the latest AI technology.
        </p>
      </section>

      {/* Mission / Vision – items-start so one expanding doesn't shift the other */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {missions.map((m, i) => (
            <div
              key={i}
              onClick={() => setExpandedMission(expandedMission === i ? null : i)}
              className="group relative cursor-pointer"
            >
              <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                <div className="relative bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform">
                    {m.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{m.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{m.desc}</p>
                  {expandedMission === i && (
                    <p className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 leading-relaxed">
                      {m.extra}
                    </p>
                  )}
                  <span className="mt-3 text-xs font-medium text-blue-600">
                    {expandedMission === i ? "Show less ↑" : "Learn more ↓"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we do – now with items-start so cards stay put */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What we do
          </h2>
          <p className="text-gray-500 mb-14 max-w-xl mx-auto">
            Our platform combines a powerful AI chat with a code generator to help you build anything.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {features.map((f, idx) => (
              <div
                key={idx}
                onClick={() => setExpandedFeature(expandedFeature === idx ? null : idx)}
                className="group cursor-pointer"
              >
                <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm flex flex-col">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform">
                      {f.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                    {expandedFeature === idx && (
                      <p className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 leading-relaxed">
                        {f.extra}
                      </p>
                    )}
                    <span className="mt-3 text-xs font-medium text-blue-600">
                      {expandedFeature === idx ? "Show less ↑" : "Learn more ↓"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Meet the team
          </h2>
          <p className="text-gray-500 mb-14 max-w-xl mx-auto">
            We’re a small team of passionate developers, designers, and AI enthusiasts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                onClick={() => copyText(member.name, setCopiedTeam)}
                className="group cursor-pointer"
              >
                <div className="relative p-[3px] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm text-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-20 h-20 mx-auto rounded-full object-cover mb-4 ring-2 ring-gray-100"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    {copiedTeam === member.name && (
                      <span className="text-xs text-green-600 mt-1 block">✓ Copied</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {statsData.map((s, i) => (
            <div
              key={i}
              onClick={() => copyText(s.number, setCopiedStat)}
              className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors cursor-pointer relative"
            >
              <div className="text-4xl font-bold mb-2">{s.number}</div>
              <div className="text-blue-100">{s.label}</div>
              {copiedStat === s.number && (
                <span className="absolute top-2 right-2 text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">✓</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ready to build something amazing?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Try our AI Builder now and see how easy it is to create a professional website.
        </p>
        <Link
          href="/builder"
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
        >
          Start Building Free
        </Link>
      </section>
    </div>
  );
}