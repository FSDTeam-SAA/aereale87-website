import type { LucideIcon } from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type DashboardStat = {
  label: string;
  value: string;
  badge: string;
  tone: "blue" | "orange";
  icon: LucideIcon;
};

export type LibraryBook = {
  slug: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
};
