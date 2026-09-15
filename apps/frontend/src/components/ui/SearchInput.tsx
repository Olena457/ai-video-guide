"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
      />

      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full pl-10 pr-10 p-3 border border-border rounded-xl bg-background text-primary focus:ring-2 focus:ring-accent outline-none transition-all"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />

      {localValue && (
        <button
          onClick={() => {
            setLocalValue("");
            onChange("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-surface rounded-full transition-colors text-secondary hover:text-primary"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
