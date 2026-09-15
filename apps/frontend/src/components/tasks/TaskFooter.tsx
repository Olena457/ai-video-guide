import { Calendar } from "lucide-react";

interface TaskFooterProps {
  priority: number;
  dueDate?: string | null;
}

export default function TaskFooter({ priority, dueDate }: TaskFooterProps) {
  return (
    <div className="mt-auto pt-4 flex flex-wrap items-center gap-3 text-xs font-bold text-secondary">
      <span className="bg-background border border-border px-2 py-1 rounded-sm">
        Priority: {priority}
      </span>

      {dueDate && (
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {dueDate}
        </span>
      )}
    </div>
  );
}
