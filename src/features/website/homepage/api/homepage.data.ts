import type {
  AuthorItem,
  BookItem,
  FooterColumn,
  NavItem,
  StatItem,
  TestimonialItem,
} from "../types/homepage.types";

export const navItems: NavItem[] = [
  { href: "/", label: "HOME" },
  { href: "/categories", label: "CATEGORIES" },
  { href: "/categories", label: "SHOP" },
  { href: "/authors", label: "AUTHORS" },
  { href: "/about", label: "ABOUT" },
];

export const stats: StatItem[] = [
  { value: "2,400+", label: "Books Available" },
  { value: "180+", label: "Authors" },
  { value: "50K+", label: "Happy Readers" },
];

export const bestSellers: BookItem[] = [
  {
    href: "/products/architecture-of-leadership",
    image: "/home/best-seller-1.png",
    imageAlt: "The Architecture of Leadership book cover",
    title: "The Architecture of Leadership",
    author: "Rodney Smith",
    price: "$28.00",
    reviews: "(128)",
    badge: "#1 BESTSELLER",
  },
  {
    href: "/products/whispers-of-the-forest",
    image: "/home/best-seller-2.png",
    imageAlt: "Whispers of the Forest book cover",
    title: "Whispers of the Forest",
    author: "Sarah Jenkins",
    price: "$22.50",
    reviews: "(84)",
  },
  {
    href: "/products/silent-wisdom",
    image: "/home/best-seller-3.png",
    imageAlt: "Silent Wisdom book cover",
    title: "Silent Wisdom",
    author: "Rodney Smith",
    price: "$32.00",
    reviews: "(210)",
  },
  {
    href: "/products/journey-within",
    image: "/home/best-seller-4.png",
    imageAlt: "Executive Mindset book cover",
    title: "Executive Mindset",
    author: "Dr. Emily Chen",
    price: "$29.99",
    reviews: "(45)",
  },
];

export const featuredBooks: BookItem[] = [
  {
    href: "/products/the-silent-echo",
    image: "/home/featured-book-1.png",
    imageAlt: "The Silent Echo book cover",
    title: "The Silent Echo",
    author: "Evelyn Reed",
    price: "$24.00",
    reviews: "",
  },
  {
    href: "/products/modern-wisdom",
    image: "/home/featured-book-2.png",
    imageAlt: "Modern Wisdom book cover",
    title: "Modern Wisdom",
    author: "Jonathan Pierce",
    price: "$28.50",
    reviews: "",
  },
  {
    href: "/products/art-of-focus",
    image: "/home/featured-book-3.png",
    imageAlt: "The Art of Focus book cover",
    title: "The Art of Focus",
    author: "Sarah Jenkins",
    price: "$22.00",
    reviews: "",
  },
  {
    href: "/products/journey-within",
    image: "/home/featured-book-4.png",
    imageAlt: "Journey Within book cover",
    title: "Journey Within",
    author: "Dr. Marcus Lee",
    price: "$32.00",
    reviews: "",
  },
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

export const authors: AuthorItem[] = [
  {
    name: "Amara Johnson",
    badge: "Founding Author",
    books: "12",
    rating: "4.9",
    readers: "2.1K",
    avatar: "/home/author-1.png",
  },
  {
    name: "Liam Chen",
    badge: "Founding Author",
    books: "8",
    rating: "4.7",
    readers: "1.8K",
    avatar: "/home/author-2.png",
  },
  {
    name: "Sofia Martinez",
    badge: "Rising Author",
    books: "5",
    rating: "4.5",
    readers: "1.2K",
    avatar: "/home/author-3.png",
  },
  {
    name: "Amara Johnson",
    badge: "Founding Author",
    books: "12",
    rating: "4.9",
    readers: "2.1K",
    avatar: "/home/author-1.png",
  },
  {
    name: "Liam Chen",
    badge: "Rising Author",
    books: "8",
    rating: "4.7",
    readers: "1.8K",
    avatar: "/home/author-2.png",
  },
  {
    name: "Sofia Martinez",
    badge: "Rising Author",
    books: "5",
    rating: "4.5",
    readers: "1.2K",
    avatar: "/home/author-3.png",
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
