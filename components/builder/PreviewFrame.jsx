"use client";
import { useState, useEffect } from "react";

export default function PreviewFrame({ id }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("preview");

  useEffect(() => {
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
    alert("Code copied!");
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setView("preview")}
          className={`px-4 py-2 rounded-lg ${
            view === "preview" ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setView("code")}
          className={`px-4 py-2 rounded-lg ${
            view === "code" ? "bg-blue-600" : "bg-gray-800"
          }`}
        >
          View Code
        </button>
        <button
          onClick={copyToClipboard}
          className="ml-auto px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          Copy Code
        </button>
      </div>
      {view === "preview" ? (
        <iframe
          srcDoc={code}
          title="Generated Preview"
          className="w-full h-[70vh] border border-gray-700 rounded-xl bg-white"
          sandbox="allow-scripts"
        />
      ) : (
        <pre className="bg-gray-900 p-6 rounded-xl overflow-x-auto text-sm text-green-400 max-h-[70vh]">
          {code}
        </pre>
      )}
    </div>
  );
}
