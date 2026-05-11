"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    resetPassword(email);
    setSent(true);
    setError("");
  };

  return (
    <div className="relative p-[3px] rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-shift" />
      <div className="relative bg-white rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Reset{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Password
          </span>
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we’ll send you a reset link (demo).
        </p>
        {sent && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl">
            ✅ If an account exists for that email, you’ll receive a reset link shortly.
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}
        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition shadow-md"
            >
              Send Reset Link
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/auth/signin" className="text-blue-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}