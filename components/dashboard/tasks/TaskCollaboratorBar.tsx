import { Task } from "@/types/task/Task";
import clsx from "clsx";

type Props = {
  collaborators: Task["collaborators"];
  canEdit: boolean;
  className?: string;
};

export default function TaskCollaboratorBar({
  collaborators,
  className = "",
}: Props) {
  const wrapperClass = clsx(
    className,
    "flex flex-col w-fit h-full overflow-auto relative rounded-md bg-accent",
  );
  return (
    <div className={wrapperClass}>
      <div className="sticky left-0 top-0 bg-accent p-4 flex items-center gap-4 w-full justify-between">
        <small className="font-medium high-emphasis-text">COLLABORATORS</small>
        {/*TODO: collaborators edition modal goes here */}
      </div>
      {collaborators?.length && collaborators?.length > 0 ? (
        collaborators?.map(({ id, full_name, profile_image }) => (
          <div className="flex items-center gap-2 w-full p-4" key={id}>
            <img
              src={profile_image}
              alt={`${full_name}'s profile image`}
              className="w-28 h-28 rounded-full border border-border"
            />
            <p
              className="medium-emphasis-text flex-1 truncate"
              title={full_name}
            >
              {full_name}
            </p>
          </div>
        ))
      ) : (
        <p className="medium-emphasis-text p-4">No Collaborators yet</p>
      )}
    </div>
  );
}
