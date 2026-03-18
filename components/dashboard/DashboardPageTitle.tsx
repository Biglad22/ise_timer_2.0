import clsx from "clsx";
import { JSX, ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  suffix?: string | ReactNode | JSX.Element;
  prefix?: string | ReactNode | JSX.Element;
  titleClass?: string;
};

export default function DashboardPageTitle({
  subtitle,
  title,
  className = "",
  suffix,
  prefix,
  titleClass = "",
}: Props) {
  const wrapperClass = clsx(className);
  const titleStyle = clsx(titleClass, "w-full flex items-center gap-2 mb-1");
  return (
    <div className={wrapperClass}>
      <div className={titleStyle}>
        {prefix && <>{prefix}</>}
        <h4
          className="flex-1 leading-none high-emphasis-text font-semibold capitalize truncate"
          aria-label="page-title"
          title={title}
        >
          {title}
        </h4>
        {suffix && <>{suffix}</>}
      </div>
      {subtitle && <h6 className="medium-emphasis-text">{subtitle}</h6>}
    </div>
  );
}
