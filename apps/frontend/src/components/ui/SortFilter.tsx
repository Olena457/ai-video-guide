
"use client";

interface SortFilterProps {
  status: string;
  category?: string;
  sort: string;
  onFilterChange: (filters: {
    status?: string;
    category?: string;
    sort?: string;
  }) => void;
}

export default function SortFilter({
  status,
  category,
  sort,
  onFilterChange,
}: SortFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Status Filter */}
      <select
        value={status || "all"}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className="bg-background border border-border rounded-lg p-2 text-sm text-primary outline-none focus:ring-2 focus:ring-accent transition-all"
      >
        <option value="all">All Statuses</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </select>

      {/* 2. Category Filter (Values matched to DB seed) */}
      <select
        value={category || ""}
        onChange={(e) => onFilterChange({ category: e.target.value })}
        className="bg-background border border-border rounded-lg p-2 text-sm text-primary outline-none focus:ring-2 focus:ring-accent transition-all"
      >
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Home">Home</option>
        <option value="Personal">Personal</option>
        <option value="Health">Health</option>
      </select>

      {/* 3. Sorting */}
      <select
        value={sort || ""}
        onChange={(e) => onFilterChange({ sort: e.target.value })}
        className="bg-background border border-border rounded-lg p-2 text-sm text-primary outline-none focus:ring-2 focus:ring-accent transition-all"
      >
        <option value="">No Sorting</option>
        <option value="priority_desc">Priority (High → Low)</option>
        <option value="priority_asc">Priority (Low → High)</option>
        <option value="date_asc">Due Date (Nearest)</option>
        <option value="date_desc">Due Date (Furthest)</option>
        <option value="title_asc">Title (A to Z)</option>
      </select>
    </div>
  );
}