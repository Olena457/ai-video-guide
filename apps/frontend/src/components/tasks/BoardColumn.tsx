
"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import { Task } from "../../types/task";

interface BoardColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onDelete: (id: number) => void;
}

export default function BoardColumn({
  id,
  title,
  tasks,
  onDelete,
}: BoardColumnProps) {
  return (
    <div className="flex flex-col h-full w-full">
      <h3 className="text-md font-bold mb-4 text-secondary uppercase tracking-wider text-center shrink-0">
        {title}
      </h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 p-2 rounded-xl transition-colors min-h-[200px] ${
              snapshot.isDraggingOver ? "bg-surface/50" : "bg-background/50"
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-4 ${
                      snapshot.isDragging ? "shadow-2xl opacity-80" : ""
                    }`}
                  >
                    <TaskItem task={task} onDelete={onDelete} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}