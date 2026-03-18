import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;
export default function layout({ children }: Props) {
  return (
    <div className="w-screen bg-accent h-screen flex items-stretch gap-4 p-4 sm:p-6">
      <DashboardNavBar className="bg-white w-fit  dark:bg-black" />
      <div className="flex-1 space-y-4 sm:space-y-6 h-full overflow-auto p-4 sm:p-6 bg-white dark:bg-black rounded-md">
        {children}
      </div>
    </div>
  );
}
