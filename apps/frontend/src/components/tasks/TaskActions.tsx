"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Task } from "../../types/task";
import TaskReader from "./TaskReader";

interface TaskActionsProps {
  task: Task;
  onDeleteClick: () => void;
}

export default function TaskActions({ task, onDeleteClick }: TaskActionsProps) {
  return (
    <div className="flex items-center justify-end h-6">
      {task.description && (
        <div className="mr-1">
          <TaskReader text={task.description} />
        </div>
      )}

      <Link
        href={`/tasks/${task.id}`}
        className="text-secondary hover:text-blue-600 transition-colors p-1"
      >
        <Pencil size={16} />
      </Link>

      <button
        onClick={onDeleteClick}
        className="text-red-400 hover:text-red-600 transition-colors p-1 ml-1"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
