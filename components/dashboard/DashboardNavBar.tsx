"use client";
import { dashboard_links_data } from "@/assets/data/dashboardNavData";
import clsx from "clsx";
import DashboardNavLink from "./DashboardNavLink";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

type Props = {
  className?: string;
};

export default function DashboardNavBar({ className = "" }: Props) {
  const wrapperClass = clsx(
    className,
    "flex flex-col justify-between gap-4 h-full overflow-auto py-2 sm:py-4 rounded-md",
  );
  const sectionClass = clsx("flex flex-col justify-center gap-0.5");

  return (
    <nav className={wrapperClass}>
      {/* TOP SECTION */}
      <div className={sectionClass}>
        {dashboard_links_data.top.map((link, idx) => (
          <DashboardNavLink {...link} key={`${link.title}:${idx}`} />
        ))}
      </div>
      <div className={sectionClass}>
        {dashboard_links_data.bottom.map((link, idx) => (
          <DashboardNavLink {...link} key={`${link.title}:${idx}`} />
        ))}
        <Button variant="outline" className="mx-2 text-gray-700">
          <LogOut />
          <span>Log out</span>
        </Button>
      </div>
    </nav>
  );
}
