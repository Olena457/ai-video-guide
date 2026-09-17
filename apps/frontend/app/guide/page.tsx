
"use client";

import { FileVideo, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";

import { UploadSection } from "../../src/components/UploadSection";
import { MetricsSidebar } from "../../src/components/MetricsSidebar";
import { StepTimelineItem } from "../../src/components/StepTimelineItem";
import { useGuideGenerator } from "../../src/hooks/useGuideGenerator";
import { LoadingProcess } from "../../src/components/common/LoadingProcess";

export default function GuideGeneratorPage() {
  const { isLoading, error, guideData, handleFileUpload, resetGuide } =
    useGuideGenerator();

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-[var(--border-color)]">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileVideo className="text-accent w-8 h-8 shrink-0" />
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity text-gradient"
            >
              Video-to-Guide AI
            </Link>
          </h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Upload a screen recording to automatically generate a step-by-step
            guide.
          </p>
        </header>

        {!guideData && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
            <div className="bg-[var(--surface-color)] p-8 rounded-2xl border border-[var(--border-color)] shadow-xl text-[var(--text-secondary)] text-sm flex flex-col justify-between h-full">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-4 text-lg">
                  How it works:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold text-base">•</span>
                    <span>Upload a single-take screen recording.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold text-base">•</span>
                    <span>AI will automatically extract key frames.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold text-base">•</span>
                    <span>
                      Step-by-step textual instructions will be generated.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold text-base">•</span>
                    <span>
                      Processing metrics (speed & cost) will appear here after
                      completion.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-full">
              <UploadSection
                onUpload={handleFileUpload}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {(isLoading || error) && (
          <div className="max-w-2xl mx-auto space-y-6">
            {isLoading && (
              <div className="p-12 text-center bg-[var(--surface-color)] rounded-2xl border border-[var(--border-color)] shadow-xl flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
                <div className="text-xl font-medium text-[var(--text-primary)] h-8 flex items-center justify-center">
                  <LoadingProcess />
                </div>
                <p className="text-[var(--text-secondary)] mt-4 text-sm">
                  This might take 30–50 seconds. Please do not close this page.
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start gap-3 text-red-200">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                <div>
                  <h4 className="font-semibold text-red-300">
                    Generation Error
                  </h4>
                  <p className="text-sm mt-1 text-red-200/80">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-3 text-sm font-medium text-red-400 underline hover:text-red-300 transition-colors"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {guideData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  {guideData.title}
                </h2>
                <button
                  onClick={resetGuide}
                  className="text-sm font-medium text-accent hover:underline transition-all"
                >
                  Upload new video
                </button>
              </div>

              {guideData.warnings && guideData.warnings.length > 0 && (
                <div className="p-4 bg-amber-950/30 border border-amber-800/50 rounded-xl">
                  <h4 className="font-semibold flex items-center gap-2 text-amber-400 mb-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" /> Please note:
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-amber-200/80 space-y-1">
                    {guideData.warnings.map((warn, idx) => (
                      <li key={idx}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="relative mt-8">
                {guideData.steps.map((step) => (
                  <StepTimelineItem key={step.step_number} step={step} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <MetricsSidebar metrics={guideData.metrics} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}