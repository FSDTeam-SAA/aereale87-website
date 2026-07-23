import type {
  FooterColumn,
  NavItem,
  StatItem,
  TestimonialItem,
} from "../types/homepage.types";

export const navItems: NavItem[] = [
  { href: "/", label: "HOME" },
  { href: "/categories?view=categories", label: "CATEGORIES" },
  { href: "/categories?view=shop", label: "SHOP" },
  { href: "/authors", label: "AUTHORS" },
  { href: "/about", label: "ABOUT" },
];

export const stats: StatItem[] = [
  { value: "2,400+", label: "Books Available" },
  { value: "180+", label: "Authors" },
  { value: "50K+", label: "Happy Readers" },
];

export const foundingBenefits = [
  "Publish Books",
  "Publish Audiobooks",
  "Premium Author Profile",
  "Featured Promotion & Priority Visibility",
];

export const testimonials: TestimonialItem[] = [
  {
    quote:
      '"The most beautiful online bookstore I\'ve ever used. The curated selections always lead me to exactly what I need to read next."',
    name: "Marcus T.",
    role: "Avid Reader",
    avatar: "/home/reviewer-1.png",
  },
  {
    quote:
      '"Their audiobook player is flawless. I love that I can support authors directly while enjoying a premium listening experience."',
    name: "Sarah J.",
    role: "Audiobook Enthusiast",
    avatar: "/home/reviewer-2.png",
  },
  {
    quote:
      '"A masterclass in digital publishing. Finding rare leadership books has never been this elegant and enjoyable."',
    name: "David L.",
    role: "Audiobook Enthusiast",
    avatar: "/home/reviewer-3.png",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "SHOP",
    links: ["All Books", "New Releases", "Best Sellers", "Digital Books"],
  },
  {
    heading: "CATEGORIES",
    links: ["Leadership", "Children's", "Faith & Wisdom", "Business"],
  },
  {
    heading: "ABOUT",
    links: ["Our Story", "Authors", "Blog", "Careers"],
  },
  {
    heading: "SUPPORT",
    links: ["Contact Us", "Shipping & Returns", "FAQ", "Track Order"],
  },
];
