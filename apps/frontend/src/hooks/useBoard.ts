import { useState, useEffect } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { Task } from "../types/task";
import { fetchTasks, updateTask, deleteTask } from "../api";
import toast from "react-hot-toast";

export const useBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch(() =>
        setError("Failed to load tasks."),
      )
      .finally(() => setLoading(false));
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) return;

    const taskId = Number(draggableId);
    const newStatus = destination.droppableId;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );

    try {
      await updateTask(taskId, { status: newStatus });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
      fetchTasks().then(setTasks);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return { tasks, loading, error, onDragEnd, handleDelete };
};
