import { Bell, BookOpen, Clock3, Grid3X3, Settings } from "lucide-react";

import type {
  DashboardNavItem,
  DashboardStat,
  LibraryBook,
} from "../types/dashboard.types";

export const dashboardNavItems: DashboardNavItem[] = [
  {
    href: "/my-books",
    label: "My Books",
    icon: Grid3X3,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Books",
    value: "0",
    badge: "",
    tone: "blue",
    icon: Grid3X3,
  },
  {
    label: "Listening Time",
    value: "0h",
    badge: "",
    tone: "orange",
    icon: Clock3,
  },
  {
    label: "Reading Books",
    value: "0",
    badge: "",
    tone: "orange",
    icon: BookOpen,
  },
];

export const libraryBooks: LibraryBook[] = [];

export const dashboardUser = {
  name: "User",
  role: "Member",
  avatar: "/placeholder-author.png",
};

export const dashboardTopAction = {
  icon: Bell,
  label: "Notifications",
};
