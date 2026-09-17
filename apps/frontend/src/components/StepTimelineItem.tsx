import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { StepItem } from "../types/types";

export const StepTimelineItem = ({ step }: { step: StepItem }) => {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      <div className="hidden sm:flex flex-col items-center absolute left-14 top-0 h-full">
        <div className="h-6 w-px bg-[var(--border-color)]"></div>
        <div className="w-8 h-8 rounded-full bg-red-950/60 text-accent border border-red-800/50 flex items-center justify-center font-bold text-sm ring-4 ring-[var(--bg-color)] z-10">
          {step.step_number}
        </div>
        <div className="h-full w-px bg-[var(--border-color)] group-last:bg-transparent"></div>
      </div>

      <div className="hidden sm:block absolute left-0 top-7 font-mono text-sm text-[var(--text-secondary)]">
        {step.timestamp}
      </div>

      <div className="bg-[var(--surface-color)] border border-[var(--border-color)] rounded-2xl p-5 shadow-lg hover:border-zinc-700 transition">
        <div className="sm:hidden flex items-center gap-3 mb-3">
          <span className="w-7 h-7 rounded-full bg-red-950/60 text-accent border border-red-800/50 flex items-center justify-center font-bold text-xs">
            {step.step_number}
          </span>
          <span className="font-mono text-sm text-[var(--text-secondary)]">
            {step.timestamp}
          </span>
        </div>

        <p className="text-[var(--text-primary)] text-lg mb-4">
          {step.instruction}
        </p>

        {step.screenshot_base64 ? (
          <Image
            src={step.screenshot_base64}
            alt={`Step ${step.step_number}`}
            width={800}
            height={450}
            className="w-full h-auto rounded-xl border border-[var(--border-color)] object-cover"
          />
        ) : (
          <div className="w-full h-32 bg-zinc-900/50 rounded-xl flex items-center justify-center text-[var(--text-secondary)] border border-dashed border-[var(--border-color)]">
            <ImageIcon className="w-6 h-6 mr-2 opacity-60" /> No screenshot
            available
          </div>
        )}
      </div>
    </div>
  );
};
