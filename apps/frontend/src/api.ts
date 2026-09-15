

import { Task, TaskCreateInput, TaskUpdateInput } from "./types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchTasks(
  filters: Record<string, string | undefined> = {},
): Promise<Task[]> {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "all") {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();
  const url = queryString
    ? `${API_URL}/tasks?${queryString}`
    : `${API_URL}/tasks`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(task: TaskCreateInput): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(
  taskId: number,
  taskData: TaskUpdateInput,
): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to update task: ${res.status} ${errorBody}`);
  }
  return res.json();
}

export async function deleteTask(taskId: number): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
}

export async function getTaskById(taskId: string | number): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${taskId}`);
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
}