import { TaskPriority } from "./TaskPriority";

export type TaskOverview = {
  id: number;
  title: string;
  created_at: string;
  category: string;
  updated_at: string;
  due_date: string;
  priority: TaskPriority;
  workspace: {
    id: number;
    title: string;
  };
};
