"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-[8px] rounded-lg bg-surface border border-border shadow-sm hover:bg-background transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <Sun
          size={20}
          className="text-accent hover:rotate-90 transition-transform duration-300"
        />
      ) : (
        <Moon
          size={20}
          className="text-accent hover:-rotate-12 transition-transform duration-300"
        />
      )}
    </button>
  );
}
