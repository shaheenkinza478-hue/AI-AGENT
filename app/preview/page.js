"use client";
import { useSearchParams } from "next/navigation";
import PreviewFrame from "../../components/builder/PreviewFrame.jsx";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <section className="max-w-6xl mx-auto p-4 min-h-[80vh]">
      <h1 className="text-2xl font-bold mb-6">Generated Preview</h1>
      {id ? (
        <PreviewFrame id={id} />
      ) : (
        <p className="text-gray-400">
          No generation ID provided. Go back to the builder.
        </p>
      )}
    </section>
  );
}