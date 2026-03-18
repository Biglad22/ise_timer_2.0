import { TaskPriority } from "@/types/task/TaskPriority";
import clsx from "clsx";

type Props = {
  priority: TaskPriority;
  className?: string;
};

export default function TaskPriorityTag({ priority, className = "" }: Props) {
  const wrapperStyle = clsx(
    className,
    "font-medium flex items-center gap-0.5 w-fit",
  );
  const nodeStyle = clsx(
    "w-2 h-2 block rounded-full border border-border",
    priority == "low" && "bg-gray-600",
    priority == "medium" && "bg-yellow-600",
    priority == "high" && "bg-red-600",
  );
  const textStyle = clsx(
    "capitalize max-sm:hidden",
    priority == "low" && "text-gray-600",
    priority == "medium" && "text-yellow-600",
    priority == "high" && "text-red-600",
  );

  return (
    <small className={wrapperStyle}>
      <span className={nodeStyle} />
      <span className={textStyle}>{priority}</span>
    </small>
  );
}
