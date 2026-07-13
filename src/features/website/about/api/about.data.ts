import {
  AudioLines,
  BookOpen,
  BookOpenCheck,
  GraduationCap,
  Handshake,
  LibraryBig,
  Megaphone,
  Newspaper,
  PenTool,
  UsersRound,
} from "lucide-react";

import type {
  EcosystemItem,
  MissionItem,
  WhyWonderItem,
} from "../types/about.types";

export const missionItems: MissionItem[] = [
  {
    title: "Inspire Readers",
    description:
      "Provide access to books and audiobooks that educate, inspire, and transform lives.",
    icon: BookOpenCheck,
  },
  {
    title: "Empower Authors",
    description: "Help authors publish, promote, and grow their audience.",
    icon: Handshake,
  },
  {
    title: "Build Community",
    description:
      "Create meaningful connections between readers, authors, and storytellers.",
    icon: UsersRound,
  },
];

export const whyWonderItems: WhyWonderItem[] = [
  {
    title: "Curated Book Collections",
    description:
      "Hand-selected titles across every genre, chosen for meaning and craft.",
    icon: LibraryBig,
  },
  {
    title: "Audiobook Marketplace",
    description:
      "A growing library of immersive narrated experiences for every listener.",
    icon: AudioLines,
  },
  {
    title: "Founding Author Program",
    description:
      "Early opportunities and visibility for our first pioneering authors.",
    icon: GraduationCap,
  },
  {
    title: "Author Publishing Platform",
    description:
      "Powerful tools to publish, distribute, and manage your work with ease.",
    icon: PenTool,
  },
  {
    title: "Reader Community",
    description:
      "A vibrant space where readers connect, discuss, and discover together.",
    icon: UsersRound,
  },
  {
    title: "Premium Learning Resources",
    description:
      "Courses and guides crafted to elevate readers, writers, and educators.",
    icon: Newspaper,
  },
];

export const ecosystemItems: EcosystemItem[] = [
  {
    title: "Readers",
    description: "Discover books",
    icon: BookOpen,
  },
  {
    title: "Authors",
    description: "Publish stories",
    icon: PenTool,
  },
  {
    title: "Audiobooks",
    description: "Reach new audiences",
    icon: AudioLines,
  },
  {
    title: "Community",
    description: "Grow together",
    icon: Megaphone,
  },
];
