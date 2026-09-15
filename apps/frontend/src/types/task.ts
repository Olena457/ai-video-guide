export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string; 
  priority: number;
  category: string | null;
  due_date: string | null;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  status?: string; 
  priority: number;
  category?: string;
  due_date?: string;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string;
  status?: string; 
  priority?: number;
  category?: string;
  due_date?: string;
}
