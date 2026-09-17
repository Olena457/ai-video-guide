
"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full mx-auto px-6 py-12 md:py-16 bg-[var(--surface-color)]/60 backdrop-blur-md border border-dashed border-[var(--border-color)]  hover:border-red-900/60 transition-colors rounded-3xl shadow-2xl flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium mb-8 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Next-Gen Video Processing</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gradient pb-1">
          Video-to-Guide AI
        </h1>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-8 max-w-lg leading-relaxed">
          The ultimate tool to convert your screen recordings into clean,
          step-by-step professional guides in seconds.
        </p>

        <div className="w-full max-w-xs h-px bg-[var(--border-color)] mb-8" />

        <Link
          href="/guide"
          className="btn-gradient group inline-flex items-center gap-2.5 font-semibold py-3.5 px-8 rounded-xl text-base shadow-lg shadow-red-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[var(--bg-color)]"
        >
          <span>Upload your video</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Instant
            Processing
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Auto
            Screenshots
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Export Ready
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> MP4, MOV,
            WEBM
          </span>
        </div>
      </div>
    </main>
  );
}