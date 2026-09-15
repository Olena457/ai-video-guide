import { getStatusConfig } from "../../utils/task-utils";

interface TaskBadgesProps {
  config: ReturnType<typeof getStatusConfig>;
  category?: string | null;
}

export default function TaskBadges({ config, category }: TaskBadgesProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider ${config.color} shrink-0`}
      >
        <config.Icon size={22} />
        <span>{config.text}</span>
      </div>

      {category && (
        <span className="bg-accent/10 text-accent text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold shrink-0">
          {category}
        </span>
      )}
    </div>
  );
}
