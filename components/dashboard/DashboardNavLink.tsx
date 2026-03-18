"use client";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  title: string;
  icon: LucideIcon;
  href: string;
  className?: string;
};

export default function DashboardNavLink({
  href,
  icon: Icon,
  title,
  className = "",
}: Props) {
  const pathName = usePathname();
  const isActive = href == pathName;

  const wrapperClass = clsx(
    className,
    "flex capitalize font-medium items-center gap-2 px-4 sm:pl-6 sm:pr-10 py-2.5 rounded-sm w-fit sm:w-full active:bg-secondary/50 transition-color duration-300 surface-hover-effect",
    isActive ? "text-primary" : "text-gray-700",
  );
  return (
    <Link href={href} className={wrapperClass}>
      <Icon className="size-5" />
      <span className="max-sm:hidden">{title}</span>
    </Link>
  );
}
