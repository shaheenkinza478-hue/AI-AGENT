"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
// ────────────────────────────────────────────────────
//  Live Typing Terminal (continuous loop + original formatting)
// ────────────────────────────────────────────────────
const TerminalTyping = () => {
  const fullText = `> AI-Builder generate --type landing-page\n\n Generating responsive landing page...\n\n✅ HTML structure created\n✅ Tailwind CSS applied\n✅ Mobile menu added\n✅ Hero section with CTA\n✅ Live preview ready\n\n✔ Build complete! Ready to launch.`;
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);
  const typingIntervalRef = useRef(null);
  const restartTimeoutRef = useRef(null);

  const startTyping = () => {
    indexRef.current = 0;
    setDisplayedText("");

    typingIntervalRef.current = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(typingIntervalRef.current);
        restartTimeoutRef.current = setTimeout(() => {
          startTyping();
        }, 1500);
      }
    }, 35);
  };

  useEffect(() => {
    startTyping();

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => {
      clearInterval(typingIntervalRef.current);
      clearTimeout(restartTimeoutRef.current);
      clearInterval(cursorInterval);
    };
  }, []);

  // Split the displayed text into lines so we can style prefixes again
  const lines = displayedText.split("\n");

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative p-[3px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
        <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/60">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200 rounded-t-2xl">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 bg-red-400 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-green-400 rounded-full" />
            </div>
            <span className="text-xs text-gray-500 ml-4 font-mono">ai-builder ~ generate</span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px] bg-gray-50 rounded-b-2xl">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="text-emerald-600 font-semibold mr-2 shrink-0">
                  {line.startsWith(">") || line.startsWith("✅") || line.startsWith("✔")
                    ? line.split(" ")[0]
                    : ""}
                </span>
                <span className="text-gray-800">{line}</span>
              </div>
            ))}
            {indexRef.current < fullText.length && (
              <span
                className={`inline-block w-2 h-5 bg-gray-800 ml-0.5 ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </div>
      </div>
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-[2.5rem] blur-2xl opacity-60 -z-10" />
    </div>
  );
};
// ────────────────────────────────────────────────────
//  Main HeroSection (unchanged except TerminalTyping)
// ────────────────────────────────────────────────────
export default function HeroSection() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>

      {/* ─── Hero Split Layout ─── */}
      <section className="relative bg-white min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            <div className="flex-1 text-center lg:text-left pt-20 lg:pt-0 lg:pl-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                Build with AI,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>
              <p className="max-w-xl text-lg text-gray-600 mb-8">
                Chat with an intelligent assistant or describe the website you need – our AI
                generates the code and shows you a live preview.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/chat"
                  className="group px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Start Chat
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                </Link>
                <Link
                  href="/builder"
                  className="px-8 py-3.5 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  Start Building
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end lg:pr-8">
              <TerminalTyping />
            </div>
          </div>
        </div>
      </section>

{/* ─── Features (Equal Height Mini Terminal Cards) ─── */}
<section className="relative bg-gray-50 py-28 px-4 overflow-hidden">
  {/* Background blobs (unchanged) */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-48 -left-48 w-[700px] h-[700px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
    <div className="absolute top-1/2 -right-48 w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-2000" />
    <div className="absolute -bottom-48 left-1/3 w-[600px] h-[600px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000" />
  </div>
  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,_#3b82f6_1px,_transparent_1px)] bg-[length:32px_32px]" />

  <div className="relative max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-md font-semibold tracking-wide shadow-sm mb-6">
         Powerful Features
      </span>
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
        Everything you need to{" "}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          build with AI
        </span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-4">
        From intelligent chat to code generation — one platform, endless possibilities.
      </p>
    </div>

    {/* Grid with equal height cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((item, idx) => (
        <div
          key={idx}
          className="group cursor-pointer h-full"
          onClick={() => setSelectedFeature(item)}
        >
          {/* Outer animated gradient border (identical to hero terminal) */}
          <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            {/* Moving gradient (the border) */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
            
            {/* White inner box – now full height and flex-col for content stretching */}
            <div className="relative bg-white rounded-2xl shadow-md h-full flex flex-col">
              {/* Title bar (gray header with dots) */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200 rounded-t-2xl">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 bg-red-400 rounded-full" />
                  <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <span className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <span className="text-xs text-gray-500 ml-4 font-mono">ai-builder ~ feature</span>
              </div>

              {/* Content area – flex-1 to fill remaining space */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-1 mt-auto">
                  <span className="block h-0.5 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-16 transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Modal (unchanged) */}
  {selectedFeature && (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-200 animate-fadeIn">
        <button
          onClick={() => setSelectedFeature(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg mb-6">
          {selectedFeature.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedFeature.title}</h3>
        <p className="text-gray-600 mb-4">{selectedFeature.desc}</p>
        <ul className="text-sm text-gray-500 space-y-2">
          {selectedFeature.details?.map((d, i) => (
            <li key={i} className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {d}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setSelectedFeature(null)}
          className="mt-6 w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  )}
</section>
      {/* ─── How it Works ─── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to turn your ideas into reality.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-md mb-6">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Statistics ─── */}
      <section className="bg-blue-600 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors duration-300">
              <div className="text-4xl font-bold mb-2">{s.number}</div>
              <div className="text-blue-100">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of developers using AI to accelerate their projects.
          </p>
          <Link
            href="/builder"
            className="inline-block px-10 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:shadow-blue-500/50 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── Data Arrays ── (unchanged)
const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    title: "AI Chat",
    desc: "Real‑time conversational assistant that understands natural language and context.",
    details: ["Powered by advanced NLP models", "Context aware conversations", "Pre‑trained on vast knowledge base"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "AI Builder",
    desc: "Turn a text prompt into a fully functional website with clean code.",
    details: ["Instant HTML/CSS generation", "Tailwind CSS ready", "Supports complex layouts"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Live Preview",
    desc: "See instant live previews and copy the generated code.",
    details: ["Real‑time rendering", "Code view with syntax highlighting", "One‑click copy to clipboard"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Export Code",
    desc: "Download clean HTML, CSS, and JS files with a single click.",
    details: ["ZIP archive download", "Minified or pretty version", "No dependencies"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Responsive Design",
    desc: "Every page adapts perfectly to mobile, tablet, and desktop.",
    details: ["Flexbox & Grid layouts", "Mobile‑first approach", "Cross‑browser tested"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "API Access",
    desc: "Integrate the power of our AI into your own apps seamlessly.",
    details: ["RESTful API", "Webhook support", "Comprehensive documentation"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure & Safe",
    desc: "Your data is encrypted and never shared with third parties.",
    details: ["End‑to‑end encryption", "GDPR compliant", "Self‑destructing sessions"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
    title: "Blazing Fast",
    desc: "AI generation completes in seconds — no delays, no waiting.",
    details: ["Sub‑500ms response times", "Edge network caching", "99.9% uptime SLA"]
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    title: "Custom Templates",
    desc: "Pre‑built templates for landing pages, blogs, portfolios, and more.",
    details: ["Blog, portfolio, landing page", "E‑commerce ready", "Fully customizable"]
  },
];

const steps = [
  {
    title: "Describe your idea",
    desc: "Type what you need in plain English – no coding required.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=400&fit=crop&auto=format",
  },
  {
    title: "AI generates the code",
    desc: "Our powerful engine creates clean, responsive HTML/CSS instantly.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop&auto=format",
  },
  {
    title: "Preview & publish",
    desc: "View the live preview, copy the code, or deploy directly.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&auto=format",
  },
];

const stats = [
  { number: "10K+", label: "Projects Generated" },
  { number: "98%", label: "Satisfaction Rate" },
  { number: "3s", label: "Avg. Generation Time" },
  { number: "24/7", label: "AI Support" },
];