

"use client";

import { use, Suspense } from "react";
import { useTask } from "../../../src/hooks/useTask";
import TaskForm from "../../../src/components/tasks/TaskForm";
import { Spinner } from "../../../src/components/ui/Spinner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Toaster } from "react-hot-toast";

function EditTaskContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { task, loading, handleUpdate, router } = useTask(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8 text-primary">
      <Toaster position="bottom-right" />
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/tasks"
            className="text-accent hover:underline flex items-center gap-1 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Tasks
          </Link>
          <h1 className="text-2xl font-bold mt-4">Edit Task</h1>
        </div>

        {task ? (
          <TaskForm
            initialData={task}
            onSubmit={handleUpdate}
            onCancel={() => router.push("/tasks")}
          />
        ) : (
          <p className="text-red-500">Task not found.</p>
        )}
      </div>
    </main>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <EditTaskContent params={params} />
    </Suspense>
  );
}