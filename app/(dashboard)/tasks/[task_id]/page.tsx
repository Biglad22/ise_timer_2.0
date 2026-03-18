import DashboardPageSection from "@/components/dashboard/DashboardPageSection";
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import TaskCollaboratorBar from "@/components/dashboard/tasks/TaskCollaboratorBar";
import TaskInformationCard from "@/components/dashboard/tasks/TaskInformationCard";
import TaskPriorityTag from "@/components/dashboard/tasks/TaskPriorityTag";
import BackButton from "@/components/ui/BackButton";
import { Task } from "@/types/task/Task";

export default function page() {
  //TODO: REPLACE LATER
  const placeholderUser = 100;
  const placeHolderTask: Task = {
    id: 1,
    created_at: "12/02/2022",
    description: "this is a random description about this task",
    category: "development",
    due_date: "12/02/2027",
    priority: "high",
    status: "ongoing",
    title: "Random task",
    updated_at: "22/02/2025",
    workspace: {
      id: 4,
      title: "random work space",
    },
  };

  return (
    <>
      <DashboardPageTitle
        title={placeHolderTask.title}
        prefix={<BackButton />}
        suffix={
          <span className="w-8 h-8 bg-black  rounded-full" />
          //TASK EDIT MODAL GOES HERE
        }
      />
      <DashboardPageSection>
        <div className="w-full space-y-1">
          <span className="flex gap-1 medium-emphasis-text">
            <small className="font-medium capitalize">Priority: </small>
            <TaskPriorityTag priority={placeHolderTask.priority} />
          </span>
          <div className="space-x-2">
            {[
              { title: "created", value: placeHolderTask.created_at },
              { title: "updated", value: placeHolderTask.updated_at },
            ].map(({ title, value }) => (
              <small className="medium-emphasis-text">
                <span className="font-medium capitalize">{title}: </span>
                <span>{value}</span>
              </small>
            ))}
          </div>
        </div>
        <p className="medium-emphasis-text leading-relaxed">
          <span className="font-medium">Description: </span>
          {placeHolderTask.description}
        </p>
      </DashboardPageSection>
      <div className="w-full sm:w-fit  flex items-stretch gap-4">
        <TaskInformationCard
          emphasize={true}
          title="due date"
          value={placeHolderTask.due_date}
          className="w-full sm:w-fit"
        />
        <TaskInformationCard
          href={`/workspaces/${placeHolderTask.workspace.id}`}
          title="workspace"
          value={placeHolderTask.workspace.title}
          className="w-full sm:w-fit"
        />
        <TaskInformationCard
          title="category"
          value={placeHolderTask.category}
          className="w-full sm:w-fit capitalize"
        />
      </div>
      <div className="flex w-full gap-4 items-stretch flex-wrap ">
        {/* TODO: ADD THREAD UI */}
        <div className="flex-1 bg-black min-w-72 min-h-96" />
        <TaskCollaboratorBar
          className="min-w-72"
          canEdit={placeHolderTask.admin?.id == placeholderUser}
          collaborators={placeHolderTask.collaborators}
        />
      </div>
    </>
  );
}
