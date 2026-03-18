import {
  Bell,
  FileClock,
  House,
  LucideIcon,
  Shapes,
  User2,
} from "lucide-react";

type NavLinK = {
  title: string;
  icon: LucideIcon;
  href: string;
};

export const dashboard_links_data: {
  top: NavLinK[]; //LINKS THAT FLOAT AT THE TOP OF NAV BAR
  bottom: NavLinK[]; //LINKS THAT FLOAT AT THE BOTTOM OF NAV BAR
} = {
  top: [
    {
      title: "overview",
      icon: House,
      href: "/overview",
    },
    {
      title: "tasks",
      icon: FileClock,
      href: "/tasks",
    },
    {
      title: "workspaces",
      icon: Shapes,
      href: "/workspaces",
    },
  ],
  bottom: [
    {
      title: "notifications",
      icon: Bell,
      href: "/notifications",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User2,
    },
  ],
};
