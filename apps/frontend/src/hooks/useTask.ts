"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Task, TaskCreateInput } from "../types/task";
import { getTaskById, updateTask } from "../api";
import toast from "react-hot-toast";

export const useTask = (id: string) => {
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getTaskById(id)
      .then(setTask)
      .catch(() => toast.error("Could not load task data"))
      .finally(() => setLoading(false));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [id]);

  const handleUpdate = async (updatedData: TaskCreateInput) => {
    try {
      await updateTask(Number(id), updatedData);
      toast.success("Task updated!");
      timerRef.current = setTimeout(() => router.push("/board"), 2000);
    } catch {
      toast.error("Failed to update task");
    }
  };

  return { task, loading, handleUpdate, router };
};
