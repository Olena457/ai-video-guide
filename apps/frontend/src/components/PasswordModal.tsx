"use client";

import { useState } from "react";
import { ShieldCheck, Eye, EyeOff, X, Lock } from "lucide-react";

export default function PasswordModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [pwd, setPwd] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("appPassword") ?? "";
    }
    return "";
  });
  const [show, setShow] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPwd(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("appPassword", val);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-3 right-3 md:top-4 md:right-5 z-50 p-2 md:p-2.5 bg-[#18181b]/90 backdrop-blur-md border border-[#27272a] hover:border-red-900/60 rounded-xl shadow-lg text-[#a1a1aa] hover:text-[#ededed] transition-all cursor-pointer"
        title="Access Settings"
      >
        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#D9042B]" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#18181b] border border-[#27272a] rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#a1a1aa] hover:text-[#ededed] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-900/50 text-[#D9042B]">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#ededed]">
                  Access Settings
                </h3>
                <p className="text-xs text-[#a1a1aa]">
                  Enter administrator password to enable AI processing
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-[#a1a1aa] mb-2">
                Administrator Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={show ? "text" : "password"}
                  value={pwd}
                  onChange={handleChange}
                  placeholder="Owner password only..."
                  className="w-full bg-[#09090b] border border-[#27272a] focus:border-[#D9042B] rounded-xl px-4 py-2.5 text-sm text-[#ededed] placeholder-[#71717a] outline-none transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 text-[#a1a1aa] hover:text-[#ededed] cursor-pointer"
                >
                  {show ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="btn-gradient w-full py-2.5 px-4 rounded-xl font-semibold text-sm shadow-lg transition-all cursor-pointer"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
