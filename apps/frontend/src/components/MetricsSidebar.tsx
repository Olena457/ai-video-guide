import { Zap, Clock, Coins } from "lucide-react";
import { MetricsData } from "../types/types";

export const MetricsSidebar = ({ metrics }: { metrics: MetricsData }) => {
  return (
    <div className="bg-[var(--surface-color)] p-6 rounded-2xl border border-[var(--border-color)] shadow-xl sticky top-6">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-400" />
        Metrics
      </h3>
      <div className="space-y-4 text-sm text-[var(--text-secondary)]">
        <div className="flex justify-between items-center pb-2 border-b border-[var(--border-color)]">
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" /> Speed
          </span>
          <span className="font-medium text-[var(--text-primary)]">
            {metrics.processing_time_seconds} sec
          </span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[var(--border-color)]">
          <span>Prompt tokens</span>
          <span className="font-medium text-[var(--text-primary)]">
            {metrics.prompt_tokens}
          </span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[var(--border-color)]">
          <span>Completion tokens</span>
          <span className="font-medium text-[var(--text-primary)]">
            {metrics.completion_tokens}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 p-2.5 rounded-xl">
          <span className="flex items-center gap-2">
            <Coins className="w-4 h-4" /> Cost
          </span>
          <span className="font-bold">${metrics.estimated_cost_usd}</span>
        </div>
      </div>
    </div>
  );
};
