const stats = [
  { value: "99%", label: "Accuracy" },
  { value: "50+", label: "Languages" },
  { value: "1.2s", label: "Avg. Response Time" },
  { value: "24/7", label: "Availability" },
];

export default function ChatStatsSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/10 rounded-2xl p-6 hover:bg-white/20 transition-colors">
            <div className="text-4xl font-bold mb-2">{s.value}</div>
            <div className="text-blue-100">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}