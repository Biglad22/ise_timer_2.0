import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";
import { Input } from "@/components/ui/input";

export default function page() {
  return (
    <>
      <DashboardPageTitle
        title="workspaces"
        suffix={
          <Input
            placeholder="Discover workspace"
            type="search"
            className="w-72"
          />
        }
      />
    </>
  );
}
