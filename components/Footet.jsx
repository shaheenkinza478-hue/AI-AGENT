"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Inline keyframes for gradient animation (same as hero) */}
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

      <footer className="relative bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        {/* Animated gradient line */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />

        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left – Brand & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-0.5">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Builder
              </span>
              <span className="text-gray-400 text-xs">
                © {currentYear} All rights reserved.
              </span>
            </div>

            {/* Center – Tagline */}
            <p className="text-gray-500 text-xs text-center max-w-xs md:max-w-sm leading-relaxed">
              Build stunning websites with AI — fast, reliable, and free.
            </p>

            {/* Right – Quick Links + Back to Top */}
            <div className="flex items-center gap-4">
              <nav className="flex gap-4 text-xs font-medium text-gray-600">
                <a href="/about" className="hover:text-blue-600 transition-colors">
                  About
                </a>
                <a href="/faq" className="hover:text-blue-600 transition-colors">
                  FAQ
                </a>
                <a href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </nav>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="ml-1 p-1.5 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all duration-300 shadow-sm"
                aria-label="Back to top"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}