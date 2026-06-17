"use client";

import type { TimelineStep } from "@/lib/types";
import { fmtHour } from "@/lib/api";

export default function TimelineSlider({
  steps,
  index,
  onChange,
}: {
  steps: TimelineStep[];
  index: number;
  onChange: (i: number) => void;
}) {
  if (!steps.length) return null;
  const step = steps[index];
  return (
    <div className="glass-strong rounded-3xl p-5">
      <div className="mb-3 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-white/40">Projected risk</div>
          <div className="text-lg font-semibold tabular-nums text-white">{fmtHour(step.datetime)}</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-semibold tabular-nums text-accent-soft">{step.overall_risk}</div>
          <div className="text-[10px] text-white/40">overall risk</div>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={index}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />

      <div className="mt-2 flex justify-between text-[10px] text-white/30">
        <span>{fmtHour(steps[0].datetime)}</span>
        <span>{fmtHour(steps[Math.floor(steps.length / 2)].datetime)}</span>
        <span>{fmtHour(steps[steps.length - 1].datetime)}</span>
      </div>
    </div>
  );
}
