"use client";

import { useState } from "react";

interface TaskTitleProps {
  title: string;
  status: string;
}

export default function TaskTitle({ title, status }: TaskTitleProps) {
  const [isTitleExpanded, setIsTitleExpanded] = useState(false);

  return (
    <h3
      onClick={() => setIsTitleExpanded(!isTitleExpanded)}
      className={`font-bold leading-tight mb-2 cursor-pointer ease-out ${
        isTitleExpanded
          ? 
            "max-w-full line-clamp-none opacity-100 transition-opacity duration-300"
          : 
            "transition-opacity duration-[1500ms] delay-200 line-clamp-1 max-w-[68%] hover:max-w-full hover:line-clamp-2 opacity-60 hover:opacity-100"
      } ${status === "done" ? "line-through text-secondary" : "text-primary"}`}
    >
      {title}
    </h3>
  );
}
