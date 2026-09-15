import { Task } from "../../types/task"; 
import TaskItem from "./TaskItem";
import { Spinner } from "../ui/Spinner"; 

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onDelete: (id: number) => void;
}

export const TaskList = ({
  tasks,
  loading,
  error,
  onDelete,
}: TaskListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-4">{error}</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center text-secondary py-8 border border-dashed rounded-lg">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};
