import { Collaborator } from "../workspace/Collaborator";
import { Workspace } from "../workspace/Workspace";
import { TaskPriority } from "./TaskPriority";
import { TaskStatus } from "./TaskStatus";

export type Task = {
  id: number;
  title: string;
  created_at: string;
  category: string;
  updated_at: string;
  due_date: string;
  priority: TaskPriority;
  description: string;
  admin?: Collaborator;
  collaborators?: Array<Collaborator>;
  status: TaskStatus;
  workspace_id: Workspace["id"];
  workspace: Pick<Workspace, "id" | "is_private" | "title">;
};
