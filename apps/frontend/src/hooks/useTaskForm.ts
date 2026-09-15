
"use client";

import { useState } from "react";
import { Task } from "../../src/types/task";
import toast from "react-hot-toast";

export const useTaskForm = (initialData?: Task) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [priority, setPriority] = useState(initialData?.priority || 1);
  const [category, setCategory] = useState(initialData?.category || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    initialData?.due_date ? new Date(initialData.due_date) : null,
  );

  const validateAndFormat = () => {
    if (!title.trim() || !category || priority < 1) return null;

    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (
        dueDate < today &&
        initialData?.due_date !== dueDate.toISOString().split("T")[0]
      ) {
        toast.error("You cannot set a due date in the past!");
        return null;
      }
    }

    return {
      title,
      description: description || undefined,
      priority,
      category,
      due_date: dueDate ? dueDate.toISOString().split("T")[0] : undefined,
    };
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority(1);
    setCategory("");
    setDueDate(null);
  };

  return {
    state: { title, description, priority, category, dueDate },
    setters: { setTitle, setDescription, setPriority, setCategory, setDueDate },
    validateAndFormat,
    resetForm,
  };
};
