import { Bell, BookOpen, Clock3, Grid3X3, Settings } from "lucide-react";

import { products } from "@/data/catalog";

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
    value: "48",
    badge: "+3 new",
    tone: "blue",
    icon: Grid3X3,
  },
  {
    label: "Listening Time",
    value: "127h",
    badge: "This week",
    tone: "orange",
    icon: Clock3,
  },
  {
    label: "Reading Books",
    value: "127",
    badge: "This week",
    tone: "orange",
    icon: BookOpen,
  },
];

const librarySlugs = [
  "create-your-own-business",
  "still-single",
  "the-silent-echo",
  "make-your-happy",
];

export const libraryBooks: LibraryBook[] = librarySlugs.map((slug) => {
  const product = products.find((item) => item.slug === slug)!;

  return {
    slug: product.slug,
    title: "The Silent Echo",
    author: "Evelyn Reed",
    cover: product.cover,
    rating: 4,
  };
});

export const dashboardUser = {
  name: "Demo Name",
  role: "Super Admin",
  avatar: "/home/reviewer-1.png",
};

export const dashboardTopAction = {
  icon: Bell,
  label: "Notifications",
};
