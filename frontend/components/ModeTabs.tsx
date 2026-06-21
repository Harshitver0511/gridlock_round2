"use client";

export type Mode = "live" | "risk" | "forecast";

const TABS: { id: Mode; label: string; tag: string }[] = [
  { id: "live", label: "Live Feed", tag: "React" },
  { id: "risk", label: "Risk Map", tag: "Prevent" },
  { id: "forecast", label: "Forecast", tag: "Prepare" },
];

export default function ModeTabs({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="glass-strong flex rounded-full p-1">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`relative whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
            mode === t.id ? "bg-accent text-white shadow-glow" : "text-white/55 hover:text-white"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
