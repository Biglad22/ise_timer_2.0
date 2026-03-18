"use client";
import { TaskStatus } from "@/types/task/TaskStatus";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  title: string;
  value: string;
  emphasize?: boolean;
  href?: string;
  className?: string;
};

export default function TaskInformationCard({
  title,
  value,
  emphasize = false,
  className = "",
  href,
}: Props) {
  const wrapperClass = clsx(
    className,
    "py-4 px-6 space-y-1  leading-none rounded-md font-medium text-sm",
    emphasize ? "bg-red-100 text-red-600" : "bg-accent high-emphasis-text",
    href && "surface-hover-effect",
  );

  const content = (
    <>
      <small className="block font-normal text-xs medium-emphasis-text uppercase">
        {title}
      </small>
      <p className="line-clamp-2" title={value}>
        {value}
      </p>
    </>
  );

  return href ? (
    <Link href={href} className={wrapperClass}>
      {content}
    </Link>
  ) : (
    <div className={wrapperClass}>{content}</div>
  );
}
