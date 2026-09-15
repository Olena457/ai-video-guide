"use client";

import { useState } from "react";

interface TaskDescriptionProps {
  description?: string | null;
}

export default function TaskDescription({ description }: TaskDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="mt-2">
      <p
        className={`text-secondary text-sm transition-all duration-300 ${
          isExpanded ? "line-clamp-none" : "line-clamp-1"
        } max-w-[85%]`}
      >
        {description}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-accent font-bold text-xs mt-2 hover:underline focus:outline-none"
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
