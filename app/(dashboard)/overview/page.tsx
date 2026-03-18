import DashboardPageSection from "@/components/dashboard/DashboardPageSection";
import DashboardPageTitle from "@/components/dashboard/DashboardPageTitle";

export default function page() {
  return (
    <>
      <DashboardPageTitle title="overview" />
      <DashboardPageSection title="Upcoming Deadlines">
        <div className="w-full flex items-center gap-4 overflow-auto py-2">
          <div className="h-28 min-w-72 flex-1 bg-black rounded-md" />
          <div className="h-28 min-w-72 flex-1 bg-black rounded-md" />
          <div className="h-28 min-w-72 flex-1 bg-black rounded-md" />
          <div className="h-28 min-w-72 flex-1 bg-black rounded-md" />
          <div className="h-28 min-w-72 flex-1 bg-black rounded-md" />
        </div>
      </DashboardPageSection>
      <DashboardPageSection title="notifications">
        <div className="space-y-2">
          <div className="h-14  bg-black rounded-md" />
          <div className="h-14  bg-black rounded-md" />
          <div className="h-14  bg-black rounded-md" />
          <div className="h-14  bg-black rounded-md" />
          <div className="h-14  bg-black rounded-md" />
          <div className="h-14  bg-black rounded-md" />
        </div>
      </DashboardPageSection>
    </>
  );
}
