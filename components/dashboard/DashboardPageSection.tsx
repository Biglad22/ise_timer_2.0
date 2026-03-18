import clsx from "clsx";
import { JSX, PropsWithChildren, ReactNode } from "react";
import DashboardSectionTitle from "./DashboardSectionTitle";

type Props = {
  className?: string;
  title?: ReactNode | string | JSX.Element;
  titleClass?: string;
} & PropsWithChildren;

export default function DashboardPageSection({
  children,
  className = "",
  title,
  titleClass,
}: Props) {
  const wrapperClass = clsx(className, "space-y-4");
  return (
    <section className={wrapperClass}>
      {title && (
        <DashboardSectionTitle className={titleClass}>
          {title}
        </DashboardSectionTitle>
      )}
      <>{children}</>
    </section>
  );
}
