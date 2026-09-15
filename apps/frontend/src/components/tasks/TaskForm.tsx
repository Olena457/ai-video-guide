
"use client";

import React from "react";
import { Task, TaskCreateInput } from "../../types/task";
import { useTaskForm } from "../../hooks/useTaskForm";
import {
  Plus,
  Save,
  X,
  Type,
  AlignLeft,
  Calendar as CalendarIcon,
  ArrowUpNarrowWide,
  Tags,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
  onSubmit: (task: TaskCreateInput) => void;
  initialData?: Task;
  onCancel?: () => void;
}

export default function TaskForm({
  onSubmit,
  initialData,
  onCancel,
}: TaskFormProps) {
  const { state, setters, validateAndFormat, resetForm } =
    useTaskForm(initialData);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = validateAndFormat();

    if (data) {
      onSubmit(data);
      if (!initialData) resetForm();
    }
  };

  const inputClass =
    "w-full px-3 py-2 bg-background border border-border text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors";

  const baseWrapperClass =
    "bg-surface p-6 rounded-lg shadow-sm border border-border w-full";

  const formWrapperClass = initialData
    ? `${baseWrapperClass} animate__animated animate__fadeIn`
    : `${baseWrapperClass} mb-8`;

  return (
    <form onSubmit={handleSubmit} className={formWrapperClass}>
      <div className="grid grid-cols-1 gap-4">
        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
            <Type size={16} />
            Task Title *
          </label>
          <input
            type="text"
            value={state.title}
            maxLength={100}
            onChange={(e) => setters.setTitle(e.target.value)}
            required
            className={inputClass}
            placeholder="What needs to be done?"
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
            <AlignLeft size={16} />
            Description
          </label>
          <textarea
            value={state.description}
            maxLength={450}
            onChange={(e) => setters.setDescription(e.target.value)}
            className={`${inputClass} min-h-[100px]`}
            placeholder="Add detailed notes here..."
          />
        </div>

        {/* Adaptive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
              <CalendarIcon size={16} />
              Due Date
            </label>
            <DatePicker
              selected={state.dueDate}
              onChange={(date: Date | null) => setters.setDueDate(date)}
              minDate={initialData ? undefined : new Date()}
              className={inputClass}
              placeholderText="Select date..."
              dateFormat="yyyy-MM-dd"
              wrapperClassName="w-full"
            />
          </div>
          
          {/* Priority Field - Fixed */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
              <ArrowUpNarrowWide size={16} />
              Priority
            </label>
            <input
              type="number"
              min="1"
              max="10"
              required
              value={state.priority === 0 ? "" : state.priority}
              onKeyDown={(e) => {
                if (["-", "+", "e", "E", ".", ","].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const val = e.target.value;
                
                if (val === "") {
                  setters.setPriority(0);
                  return;
                }
                
                const num = parseInt(val, 10);
                
                if (!isNaN(num)) {
                  setters.setPriority(num);
                }
              }}
              onBlur={() => {
                if (!state.priority || state.priority < 1) {
                  setters.setPriority(1);
                } else if (state.priority > 10) {
                  setters.setPriority(10);
                }
              }}
              className={inputClass}
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary mb-1">
              <Tags size={16} />
              Category *
            </label>
            <select
              value={state.category}
              onChange={(e) => setters.setCategory(e.target.value)}
              required
              className={`${inputClass} pr-8 h-[42px]`}
            >
              <option value="" disabled>
                Select...
              </option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Home">Home</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2 min-[375px]:gap-3">
          <button
            type="submit"
            className="flex-1 px-3 py-2 min-[375px]:px-6 min-[375px]:py-2.5 text-sm min-[375px]:text-base flex items-center justify-center gap-1.5 min-[375px]:gap-2 rounded-[12px] font-semibold shadow-md btn-gradient focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none active:scale-95 transition-transform"
          >
            {initialData ? (
              <>
                <Save size={18} /> Save
              </>
            ) : (
              <>
                <Plus size={18} /> Add Task
              </>
            )}
          </button>

          {initialData && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-2 min-[375px]:px-6 min-[375px]:py-2.5 text-sm min-[375px]:text-base bg-background border border-border text-secondary font-bold rounded-[12px] hover:text-red-500 hover:border-red-500 transition-colors flex items-center justify-center gap-1.5 min-[375px]:gap-2"
            >
              <X size={18} /> Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}