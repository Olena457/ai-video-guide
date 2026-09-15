
"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import TaskHeader from "../../src/components/common/TaskHeader";
import BoardColumn from "../../src/components/tasks/BoardColumn";
import { useBoard } from "../../src/hooks/useBoard"; 
import { BoardSkeleton } from "../../src/components/ui/BoardSkeleton";

export default function BoardPage() {
  const { tasks, loading, error, onDragEnd, handleDelete } = useBoard();

  if (loading)
    return (
      <main className="h-screen bg-background text-primary flex flex-col overflow-hidden">
        <div className="shrink-0 z-50 bg-background/95 border-b border-border/50">
          <TaskHeader showBackLink={true} />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <BoardSkeleton />
        </div>
      </main>
    );

  if (error)
    return (
      <main className="h-screen bg-background text-primary flex flex-col overflow-hidden">
        <div className="shrink-0 z-50 bg-background/95 border-b border-border/50">
          <TaskHeader showBackLink={true} />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-4 text-center">
          <div className="text-red-500 font-semibold text-xl mb-2">
            Oops! Something went wrong.
          </div>
          <p className="text-secondary">{error}</p>
        </div>
      </main>
    );

  return (
    <main className="h-screen bg-background text-primary flex flex-col overflow-hidden">
      <div className="shrink-0 z-50 bg-background/95 border-b border-border/50">
        <TaskHeader showBackLink={true} />
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar p-4 md:p-8">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2 pb-12">
            <BoardColumn
              id="todo"
              title="To Do"
              tasks={tasks.filter((t) => t.status === "todo")}
              onDelete={handleDelete}
            />
            <BoardColumn
              id="in_progress"
              title="In Progress"
              tasks={tasks.filter((t) => t.status === "in_progress")}
              onDelete={handleDelete}
            />
            <BoardColumn
              id="done"
              title="Done"
              tasks={tasks.filter((t) => t.status === "done")}
              onDelete={handleDelete}
            />
            <BoardColumn
              id="undone"
              title="Undone"
              tasks={tasks.filter((t) => t.status === "undone")}
              onDelete={handleDelete}
            />
          </div>
        </DragDropContext>
      </div>
    </main>
  );
}