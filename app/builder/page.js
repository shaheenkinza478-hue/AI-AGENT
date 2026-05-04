"use client";
import { useState, useRef, useEffect } from "react";

/* ── Quick prompt chips ── */
const quickPrompts = [
  "A dark portfolio site",
  "A landing page for a SaaS product",
  "A blog with a navbar and footer",
  "An e‑commerce product card",
  "A Next.js hero section",
  "A responsive dashboard layout",
];

/* ── Builder features (unchanged) ── */
const builderFeatures = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "React / Next.js",
    desc: "Generates modern React components and Next.js pages instantly.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Tailwind CSS",
    desc: "Every design uses Tailwind CSS for beautiful, responsive styling.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Fully Responsive",
    desc: "All output works perfectly on mobile, tablet, and desktop.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    title: "Export Code",
    desc: "Download clean HTML, CSS, and JavaScript files with one click.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Instant Preview",
    desc: "See a live preview of your generated website immediately.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    title: "Multi‑Language",
    desc: "Describe your site in any language — our AI understands you.",
  },
];

/* ── How it works steps ── */
const steps = [
  { title: "Describe your idea", desc: "Type what you need in plain English." },
  { title: "AI generates the code", desc: "Our engine builds clean, ready‑to‑use code." },
  { title: "Preview & export", desc: "See the live result and copy the code." },
];

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { code, id, prompt }
  const [view, setView] = useState("preview");
  const [refineInput, setRefineInput] = useState("");
  const [refining, setRefining] = useState(false);
  const resultRef = useRef(null);

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.code) {
        setResult({ code: data.code, id: data.id, prompt });
        setView("preview");
        // scroll to result
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setError(data.error || "Generation failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!refineInput.trim() || !result) return;
    setRefining(true);
    setError("");
    try {
      const res = await fetch("/api/builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: refineInput, previousCode: result.code }),
      });
      const data = await res.json();
      if (data.code) {
        setResult({ code: data.code, id: data.id, prompt: result.prompt + " → " + refineInput });
        setRefineInput("");
        setView("preview");
      } else {
        setError(data.error || "Refinement failed.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setRefining(false);
    }
  };

  const downloadCode = () => {
    if (!result) return;
    const blob = new Blob([result.code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.code);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* ─── Hero Heading ─── */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Build Websites with AI,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Describe the website you want — our AI generates clean HTML, CSS, React, and Tailwind code in seconds.
        </p>
      </section>

      {/* ─── Quick Prompts ─── */}
      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickPrompts.map((text, i) => (
            <button
              key={i}
              onClick={() => setPrompt(text)}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm text-sm font-medium text-gray-700"
            >
              {text}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Main Builder Interface ─── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column – Input & Refine */}
          <div className="space-y-6">
            {/* Initial prompt card */}
            <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
              <div className="relative bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Describe your website</h2>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A modern portfolio with a hero section, projects grid, and contact form..."
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-gray-800"
                />
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-400">Supports HTML, Tailwind, React, Next.js & more</p>
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !prompt.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium disabled:opacity-50 transition-all shadow-md"
                  >
                    {loading ? "Generating..." : "Generate"}
                  </button>
                </div>
                {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
              </div>
            </div>

            {/* Refine input (appears after first generation) */}
            {result && (
              <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                <div className="relative bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Improve this design</h3>
                  <textarea
                    rows={3}
                    value={refineInput}
                    onChange={(e) => setRefineInput(e.target.value)}
                    placeholder='e.g. "Make it a dark theme" or "Add a navigation bar"'
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none text-gray-800"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleRefine}
                      disabled={refining || !refineInput.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-xl text-sm font-medium disabled:opacity-50 transition-all shadow-md"
                    >
                      {refining ? "Refining..." : "Refine"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column – Result */}
          <div ref={resultRef}>
            {result ? (
              <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                <div className="relative bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <button
                      onClick={() => setView("preview")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        view === "preview"
                          ? "bg-blue-600 text-white shadow"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setView("code")}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        view === "code"
                          ? "bg-blue-600 text-white shadow"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      View Code
                    </button>
                    <button
                      onClick={copyCode}
                      className="ml-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-all"
                    >
                      Copy Code
                    </button>
                    <button
                      onClick={downloadCode}
                      className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium shadow-md transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download HTML
                    </button>
                  </div>

                  {view === "preview" ? (
                    <iframe
                      srcDoc={result.code}
                      title="Generated Preview"
                      className="w-full h-[60vh] border border-gray-200 rounded-xl bg-white"
                      sandbox="allow-scripts"
                    />
                  ) : (
                    <pre className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-x-auto text-sm max-h-[60vh]">
                      {result.code}
                    </pre>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px] border border-dashed border-gray-300 rounded-2xl">
                <p className="text-gray-400">Your generated website will appear here ✨</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Builder Features ─── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Everything you can build
          </h2>
          <p className="text-gray-500 mb-14 max-w-xl mx-auto">
            From simple landing pages to complex React apps — all just from a prompt.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {builderFeatures.map((f, idx) => (
              <div key={idx} className="group cursor-pointer h-full">
                <div className="relative p-[3px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform">
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it Works ─── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            How it works
          </h2>
          <p className="text-gray-500 mb-14 max-w-xl mx-auto">
            Three simple steps to turn your idea into a real website.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to build something amazing?
        </h2>
        <p className="max-w-xl mx-auto opacity-90 mb-8">
          Join thousands of developers using AI to generate code in seconds.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-8 py-3 rounded-full bg-white text-blue-700 font-semibold shadow-lg hover:shadow-white/30 hover:-translate-y-0.5 transition-all"
        >
          Start Building Now
        </button>
      </section>
    </div>
  );
}