"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// ─── Component that uses useSearchParams (must be inside Suspense) ───
function PreviewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("preview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("No generation ID provided.");
      return;
    }
    const fetchCode = async () => {
      try {
        const res = await fetch(`/api/generate?id=${id}`);
        const data = await res.json();
        if (data.code) {
          setCode(data.code);
        } else {
          setError("Code not found for this ID.");
        }
      } catch {
        setError("Failed to load generated code.");
      } finally {
        setLoading(false);
      }
    };
    fetchCode();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 text-lg mb-4">No generation ID provided.</p>
        <Link
          href="/builder"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          ← Go to Builder
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-gray-500">
          <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg">Loading generated code…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-red-500 text-lg mb-4">⚠️ {error}</p>
        <Link
          href="/builder"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          ← Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab buttons & actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setView("preview")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${
            view === "preview"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </span>
        </button>
        <button
          onClick={() => setView("code")}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${
            view === "code"
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            View Code
          </span>
        </button>
        <button
          onClick={copyToClipboard}
          className="ml-auto px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
        >
          {copied ? "✓ Copied!" : "Copy Code"}
        </button>
        <button
          onClick={downloadCode}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium transition-all shadow-md flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download HTML
        </button>
      </div>

      {/* Preview / Code display with animated border */}
      {view === "preview" ? (
        <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
          <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200">
            <iframe
              srcDoc={code}
              title="Generated Preview"
              className="w-full h-[70vh] bg-white"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      ) : (
        <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-200">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700 rounded-t-2xl">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 bg-red-400 rounded-full" />
                <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                <span className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <span className="text-xs text-gray-400 ml-4 font-mono">generated.html</span>
            </div>
            <pre className="p-6 overflow-x-auto text-sm text-green-400 max-h-[70vh] font-mono leading-relaxed">
              {code}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page wrapper with Suspense ───
export default function PreviewPage() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Gradient heading */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Generated{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Preview
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Your AI‑generated website is ready. Preview it live, view the code, or download the HTML file.
        </p>
      </section>

      {/* Preview content */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-lg">Loading preview…</p>
          </div>
        }>
          <PreviewContent />
        </Suspense>
      </section>

      {/* Back to builder CTA */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Want to build something else?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Go back to the AI Builder and create another stunning website in seconds.
        </p>
        <Link
          href="/builder"
          className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
        >
          ← Back to Builder
        </Link>
      </section>
    </div>
  );
}