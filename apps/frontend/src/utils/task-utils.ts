
import { CircleAlert, Clock, CheckCircle2, XCircle } from "lucide-react";

export const getStatusConfig = (status: string) => {
  switch (status) {
    case "todo":
      return {
        color: "text-rose-400",
        borderColor: "border-rose-400",
        text: "TO DO",
        Icon: CircleAlert,
        gradientClass: "hover:from-rose-400/15 dark:hover:from-rose-400/20",
      };
    case "in_progress":
      return {
        color: "text-blue-500",
        borderColor: "border-blue-500",
        text: "IN PROGRESS",
        Icon: Clock,
        gradientClass: "hover:from-blue-500/15 dark:hover:from-blue-500/20",
      };
    case "done":
      return {
        color: "text-emerald-500",
        borderColor: "border-emerald-500",
        text: "DONE",
        Icon: CheckCircle2,
        gradientClass: "hover:from-green-500/15 dark:hover:from-green-500/20",
      };
    case "undone":
    default:
      return {
        color: "text-slate-800 dark:text-slate-400",
        borderColor: "border-gray-500 dark:border-gray-600",
        text: "UNDONE",
        Icon: XCircle,
        gradientClass: "hover:from-slate-500/15 dark:hover:from-slate-400/15",
      };
  }
};