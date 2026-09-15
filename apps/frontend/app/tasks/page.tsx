
"use client";

import { Toaster } from "react-hot-toast";
import TaskForm from "../../src/components/tasks/TaskForm";
import { TaskList } from "../../src/components/tasks/TaskList";
import TaskHeader from "../../src/components/common/TaskHeader";
import SearchInput from "../../src/components/ui/SearchInput";
import SortFilter from "../../src/components/ui/SortFilter";
import { useTasks } from "../../src/hooks/useTasks";

export default function TasksPage() {
  const { tasks, loading, error, filters, setFilters, addTask, removeTask } =
    useTasks();

  return (
    <main className="min-h-screen bg-background text-primary transition-colors duration-300">
      <Toaster position="bottom-right" />

      <TaskHeader showBackLink={true} />

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div className="space-y-6">
            <TaskForm onSubmit={addTask} />
          </div>

          <div className="flex flex-col h-[calc(100vh-140px)] space-y-2">
            <div className="space-y-4 flex-shrink-0">
              <SearchInput
                value={filters.search}
                onChange={(val) =>
                  setFilters((prev) => ({ ...prev, search: val }))
                }
              />
              <SortFilter
                status={filters.status}
                category={filters.category}
                sort={filters.sort}
                onFilterChange={(newFilters) =>
                  setFilters((prev) => ({ ...prev, ...newFilters }))
                }
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <TaskList
                tasks={tasks}
                loading={loading}
                error={error}
                onDelete={removeTask}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}