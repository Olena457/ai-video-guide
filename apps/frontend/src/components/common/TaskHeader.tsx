
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { ClipboardList } from "lucide-react";

interface TaskHeaderProps {
  showBackLink?: boolean;
  actions?: React.ReactNode;
}

export default function TaskHeader({
  showBackLink = true,
  actions,
}: TaskHeaderProps) {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;

    return `px-2 min-[475px]:px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? "text-accent bg-accent/10"
        : "text-secondary hover:text-accent hover:bg-secondary/15"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-3 min-[475px]:px-6 py-3 bg-background/96 border-b border-border/50 transition-colors">
      <Link
        href="/"
        className="flex items-center hover:opacity-80 transition-opacity"
      >
        <ClipboardList className="text-accent min-[475px]:mr-2" size={28} />

        <h1 className="hidden min-[475px]:block text-2xl font-extrabold tracking-tight text-gradient">
          TaskFlow
        </h1>
      </Link>

      <div className="flex items-center gap-1 min-[475px]:gap-2">
        {showBackLink && (
          <Link href="/" className={getLinkClass("/")}>
            Home
          </Link>
        )}

        <Link href="/tasks" className={getLinkClass("/tasks")}>
          Tasks
        </Link>

        <Link href="/board" className={getLinkClass("/board")}>
          Board
        </Link>

        <div className="ml-1 min-[475px]:ml-2 flex items-center gap-2 min-[475px]:gap-3">
          {actions}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}