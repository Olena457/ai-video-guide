
"use client";

import { useState } from "react";
import { Task } from "../../types/task";
import { getStatusConfig } from "../../utils/task-utils";

import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import TaskBadges from "./TaskBadges";
import TaskActions from "./TaskActions";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskFooter from "./TaskFooter";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onDelete }: TaskItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const config = getStatusConfig(task.status);

  return (
    <>
      <div
        className={`p-4 mb-4 bg-surface rounded-xl shadow-sm border-l-4 border-[0.5px] flex flex-col min-h-[120px] bg-gradient-to-br from-transparent to-transparent to-50% transition-all duration-300 hover:shadow-md ${
          config.borderColor
        } ${config.gradientClass} ${task.status === "done" ? "opacity-75" : ""}`}
      >
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex items-start justify-between">
            <TaskBadges config={config} category={task.category} />
            <TaskActions
              task={task}
              onDeleteClick={() => setIsDeleteDialogOpen(true)}
            />
          </div>
        </div>

        <TaskTitle title={task.title} status={task.status} />
        <TaskDescription description={task.description} />

        <TaskFooter priority={task.priority} dueDate={task.due_date} />
      </div>

      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(task.id);
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
}