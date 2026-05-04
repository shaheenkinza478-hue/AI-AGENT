import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="relative bg-white text-gray-900 min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-xl w-full mx-auto text-center">
        {/* Animated gradient border card */}
        <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
          <div className="relative bg-white rounded-2xl p-10 border border-gray-200">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg mb-6">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Something{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Amazing
              </span>{" "}
              is Coming
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              We’re working hard to bring you a revolutionary AI experience. Get ready to build, chat, and create like never before.
            </p>

            {/* Visual email subscription (no functionality) */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1.5">
              <input
                type="email"
                placeholder="Your email address..."
                className="flex-1 bg-transparent px-4 py-2.5 outline-none text-sm text-gray-700"
                disabled
              />
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm shadow-md">
                Notify Me
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">We’ll let you know when we launch ✨</p>
          </div>
        </div>

        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}