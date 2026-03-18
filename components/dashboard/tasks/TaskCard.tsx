import { Shapes } from "lucide-react";
import Link from "next/link";
import TaskPriorityTag from "./TaskPriorityTag";
import { TaskOverview } from "@/types/task/TaskOverview";
import clsx from "clsx";

type Props = {
  className?: string;
} & TaskOverview;

export default function TaskCard({ className = "", ...task }: Props) {
  const wrapperClass = clsx(
    "p-4 h-fit min-w-64 flex-1 bg-accent surface-hover-effect rounded-md space-y-3",
    className,
  );
  return (
    <Link href={`/tasks/${task.id}`} className={wrapperClass}>
      <span className="flex items-center gap-4 justify-between">
        <Link
          className="block hover:underline w-fit text-primary"
          href={`/workspaces/${task.workspace.id}`}
        >
          <small className="flex items-center gap-1">
            <Shapes className="size-4" />
            <span>{task.workspace.title}</span>
          </small>
        </Link>
        <TaskPriorityTag priority={task.priority} />
      </span>
      <p className="line-clamp-2 font-medium high-emphasis-text">
        {task.title}
      </p>
      <small className="space-x-1 medium-emphasis-text">
        <span className="font-medium">Due date:</span>
        <span>{task.due_date}</span>
      </small>
    </Link>
  );
}
