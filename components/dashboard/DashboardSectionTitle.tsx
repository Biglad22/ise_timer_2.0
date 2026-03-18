import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = { className?: string } & PropsWithChildren;

export default function DashboardSectionTitle({
  children,
  className = "",
}: Props) {
  const wrapperClass = clsx(
    className,
    "capitalize font-medium high-emphasis-text",
  );
  return <h6 className={wrapperClass}>{children}</h6>;
}
