import DashboardPageSection from "@/components/dashboard/DashboardPageSection";
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import TaskCard from "@/components/dashboard/tasks/TaskCard";
import { Input } from "@/components/ui/input";
import { TaskOverview } from "@/types/task/TaskOverview";
import Link from "next/link";

export default function page() {
  const dummyTask: TaskOverview = {
    id: 1,
    title: "Random task",
    created_at: "20/12/2012",
    due_date: "20/02/2022",
    priority: "medium",
    category: "development",
    updated_at: "20/05/2022",
    workspace: {
      id: 9,
      title: "Random problem",
    },
  };
  return (
    <>
      <DashboardPageTitle
        title="Tasks"
        suffix={
          <div className="flex items-center gap-2">
            <Input
              type="search"
              className="w-64"
              placeholder="Search task title / workspace title"
            />
            {/* // TASK CREATION MODAL GOES HERE */}
          </div>
        }
      />
      <DashboardPageSection title="Upcoming deadline">
        <div className="grid grid-cols-3 gap-4">
          {new Array(5).fill(dummyTask).map((task) => (
            <TaskCard {...task} />
          ))}
        </div>
      </DashboardPageSection>

      <DashboardPageSection
        titleClass="flex items-center gap-2 w-full  leading-none"
        title="ongoing"
      >
        <div className="grid grid-cols-3 gap-4">
          {new Array(5).fill(dummyTask).map((task) => (
            <TaskCard {...task} />
          ))}
        </div>
      </DashboardPageSection>

      <DashboardPageSection
        titleClass="flex items-center gap-2 w-full  leading-none"
        title="pending"
      >
        <div className="grid grid-cols-3 gap-4">
          {new Array(5).fill(dummyTask).map((task) => (
            <TaskCard {...task} />
          ))}
        </div>
      </DashboardPageSection>

      <DashboardPageSection
        titleClass="flex items-center gap-2 w-full  leading-none"
        title="completed"
      >
        <div className="grid grid-cols-3 gap-4">
          {new Array(5).fill(dummyTask).map((task) => (
            <TaskCard {...task} />
          ))}
        </div>
      </DashboardPageSection>

      <DashboardPageSection
        titleClass="flex items-center gap-2 w-full  leading-none"
        title="cancelled"
      >
        <div className="grid grid-cols-3 gap-4">
          {new Array(5).fill(dummyTask).map((task) => (
            <TaskCard {...task} />
          ))}
        </div>
      </DashboardPageSection>
    </>
  );
}
