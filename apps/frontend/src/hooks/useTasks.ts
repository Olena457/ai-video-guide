
"use client";

import { useState, useEffect } from "react";
import { Task, TaskCreateInput } from "../types/task";
import { fetchTasks, createTask, deleteTask } from "../api";
import toast from "react-hot-toast";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    category: "",
    sort: "",
  });

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchTasks(filters);
        setTasks(fetchedTasks);
      } catch {
        setError("Could not connect to the backend server.");
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [filters]);

  const addTask = async (input: TaskCreateInput) => {
    try {
      const newTask = await createTask(input);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task added!");
    } catch {
      toast.error("Failed to create task");
    }
  };

  const removeTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return { tasks, loading, error, filters, setFilters, addTask, removeTask };
};