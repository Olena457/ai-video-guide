import React from "react";
import { UploadCloud } from "lucide-react";

interface UploadSectionProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export const UploadSection = ({ onUpload, isLoading }: UploadSectionProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--surface-color)] hover:border-red-900/60 transition-colors">
      <UploadCloud className="w-12 h-12 text-accent mb-4" />
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">
        Upload your video to generate a step-by-step guide
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mt-2 text-center max-w-md">
        Supported formats: MP4, MOV, WEBM. Maximum duration: 2 minutes.
      </p>
      <label className="mt-6">
        <span className="btn-gradient px-6 py-2.5 rounded-xl cursor-pointer font-medium inline-block shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
          {isLoading ? "Processing..." : "Select File"}
        </span>
        <input
          type="file"
          accept="video/mp4,video/webm,video/quicktime"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </label>
    </div>
  );
};
