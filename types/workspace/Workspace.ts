import { Task } from "../task/Task";
import { Collaborator } from "./Collaborator";

export interface Workspace {
  id: number;
  title: string;
  description: string;
  category: string;
  admin_id: number;
  admin: Collaborator;
  collaborators: Collaborator[];
  is_private: boolean;
  created_at: string;
  updated_at: string;
  tasks: Array<Omit<Task, "workspace" | "workspace_id">>;
}
