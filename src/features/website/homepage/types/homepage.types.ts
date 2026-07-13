export type NavItem = {
  href: string;
  label: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type BookItem = {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  author: string;
  price: string;
  reviews: string;
  badge?: string;
};

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type AuthorItem = {
  name: string;
  badge: string;
  books: string;
  rating: string;
  readers: string;
  avatar: string;
};

export type FooterColumn = {
  heading: string;
  links: string[];
};
