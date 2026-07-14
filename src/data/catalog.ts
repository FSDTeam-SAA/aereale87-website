export type ProductFormat = {
  id: string;
  label: string;
  price: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductReview = {
  name: string;
  role: string;
  date: string;
  title: string;
  body: string;
  initials: string;
  rating: number;
};

export type Product = {
  slug: string;
  title: string;
  author: string;
  category: string;
  filterCategory: string;
  price: string;
  rating: number;
  reviewCount: number;
  cover: string;
  detailImage?: string;
  badge?: string;
  secondaryBadge?: string;
  formats: ProductFormat[];
  shortDescription: string;
  aboutQuote: string;
  aboutBody: string;
  specs: ProductSpec[];
  authorProfile: {
    name: string;
    role: string;
    bio: string;
    books: string;
    rating: string;
    readers: string;
    image: string;
  };
  reviews: ProductReview[];
};

export type AuthorBookShelf = {
  title: string;
  products: Product[];
};

export type AuthorPageData = Product["authorProfile"] & {
  slug: string;
  shelves: AuthorBookShelf[];
};

export type CategoryTile = {
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  icon: "spark" | "star" | "tablet";
  emphasized?: boolean;
};

export const siteNavItems = [
  { href: "/", label: "HOME" },
  { href: "/categories?view=categories", label: "CATEGORIES" },
  { href: "/categories?view=shop", label: "SHOP" },
  { href: "/authors", label: "AUTHORS" },
  { href: "/about", label: "ABOUT" },
] as const;

const baseReviews: ProductReview[] = [
  {
    name: "Eleanor Vance",
    role: "Verified Buyer",
    date: "October 15, 2023",
    title: "A Masterclass in Modern Leadership",
    body: '"This is not just another leadership book filled with platitudes. Smith provides concrete, structural advice that I have already begun implementing in my own company. The chapter on communication architecture alone is worth the price of the book."',
    initials: "E",
    rating: 5,
  },
  {
    name: "Eleanor Vance",
    role: "Verified Buyer",
    date: "October 15, 2023",
    title: "A Masterclass in Modern Leadership",
    body: '"This is not just another leadership book filled with platitudes. Smith provides concrete, structural advice that I have already begun implementing in my own company. The chapter on communication architecture alone is worth the price of the book."',
    initials: "E",
    rating: 5,
  },
];

export const products: Product[] = [
  {
    slug: "architecture-of-leadership",
    title: "The Architecture of Leadership",
    author: "Rodney Smith",
    category: "BUSINESS & STRATEGY",
    filterCategory: "Leadership",
    price: "$28.00",
    rating: 4.9,
    reviewCount: 124,
    cover: "/catalog/product-architecture-cover.png",
    detailImage: "/catalog/product-detail-hero.png",
    badge: "BEST SELLER",
    secondaryBadge: "EDITOR'S CHOICE",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$28.00" },
      { id: "paperback", label: "Paperback", price: "$18.00" },
      { id: "ebook", label: "eBook", price: "$14.99" },
      { id: "audio", label: "Audio", price: "$22.00" },
    ],
    shortDescription:
      "A transformational guide to leadership, purpose, influence, and personal growth. Discover the structural frameworks that the world's most effective leaders use to build enduring organizations and inspire lasting change.",
    aboutQuote:
      '"True leadership is not about being in charge. It is about taking care of those in your charge. This book provides the architectural blueprint for building a culture where people thrive."',
    aboutBody:
      "World characterized by rapid change and unprecedented complexity, the traditional models of leadership are no longer sufficient. The Architecture of Leadership offers a groundbreaking framework for modern executives, entrepreneurs, and visionaries who seek to build resilient, purpose-driven organizations. Drawing upon a decade of research and interviews with over two hundred transformative leaders across various industries, Rodney Smith distills the essence of effective leadership into actionable structural components. He argues that leadership is not an innate trait, but rather a deliberate architecture. Whether you are leading a small startup team or a multinational corporation, this book provides the tools necessary to construct a solid foundation for sustainable growth, foster deep trust among your team, and ultimately, leave a lasting legacy.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "342 Pages" },
      { label: "ISBN", value: "978-1-234-56789-0" },
      { label: "PUBLICATION DATE", value: "October 12, 2023" },
      { label: "WEIGHT", value: "1.2 lbs" },
      { label: "DIMENSIONS", value: "6 x 1.1 x 9 inches" },
      { label: "CATEGORY", value: "Business & Leadership" },
    ],
    authorProfile: {
      name: "Rodney Smith",
      role: "Author Profile",
      bio: "Rodney Smith is an organizational psychologist, bestselling author, and executive coach to CEOs of Fortune 500 companies. With over two decades of experience studying human behavior in the workplace, he has dedicated his career to understanding what makes teams thrive and organizations endure.",
      books: "265",
      rating: "4.9",
      readers: "1.2M",
      image: "/catalog/author-rodney-smith.png",
    },
    reviews: baseReviews,
  },
  {
    slug: "still-single",
    title: "The Architecture of Leadership",
    author: "Rodney Smith",
    category: "LEADERSHIP",
    filterCategory: "Leadership",
    price: "$28.00",
    rating: 4.8,
    reviewCount: 128,
    cover: "/catalog/product-still-single.png",
    badge: "#1 BESTSELLER",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$28.00" },
      { id: "paperback", label: "Paperback", price: "$19.00" },
      { id: "ebook", label: "eBook", price: "$14.99" },
      { id: "audio", label: "Audio", price: "$22.00" },
    ],
    shortDescription:
      "A refined edition of Rodney Smith's leadership blueprint, pairing strategic insight with a premium collector's presentation.",
    aboutQuote:
      '"Structures do not limit great leaders; they free them to lead with confidence, clarity, and trust."',
    aboutBody:
      "This special edition revisits the central ideas of The Architecture of Leadership through a tighter lens on decision systems, team rhythm, and communication flow. It is designed for readers who want a durable field guide they can return to every quarter.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "310 Pages" },
      { label: "ISBN", value: "978-1-555-11111-0" },
      { label: "PUBLICATION DATE", value: "September 2, 2023" },
      { label: "WEIGHT", value: "1.1 lbs" },
      { label: "DIMENSIONS", value: "6 x 1 x 9 inches" },
      { label: "CATEGORY", value: "Leadership" },
    ],
    authorProfile: {
      name: "Rodney Smith",
      role: "Author Profile",
      bio: "Rodney Smith coaches senior leaders on culture design, resilience, and scalable communication systems.",
      books: "265",
      rating: "4.9",
      readers: "1.2M",
      image: "/catalog/author-rodney-smith.png",
    },
    reviews: baseReviews,
  },
  {
    slug: "make-your-happy",
    title: "The Architecture of Leadership",
    author: "Rodney Smith",
    category: "LEADERSHIP",
    filterCategory: "Leadership",
    price: "$28.00",
    rating: 4.8,
    reviewCount: 128,
    cover: "/catalog/product-yellow-abstract.png",
    badge: "#1 BESTSELLER",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$28.00" },
      { id: "paperback", label: "Paperback", price: "$18.50" },
      { id: "ebook", label: "eBook", price: "$13.99" },
      { id: "audio", label: "Audio", price: "$21.00" },
    ],
    shortDescription:
      "An energetic visual edition of the same leadership framework, ideal for readers who want practical systems packaged with momentum.",
    aboutQuote:
      '"Leadership becomes repeatable when principles are translated into rituals, systems, and shared language."',
    aboutBody:
      "This edition emphasizes practical frameworks for energizing teams, clarifying expectations, and creating environments where accountability feels supportive instead of punitive.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "298 Pages" },
      { label: "ISBN", value: "978-1-555-11111-1" },
      { label: "PUBLICATION DATE", value: "May 19, 2024" },
      { label: "WEIGHT", value: "1.0 lbs" },
      { label: "DIMENSIONS", value: "6 x 1 x 9 inches" },
      { label: "CATEGORY", value: "Leadership" },
    ],
    authorProfile: {
      name: "Rodney Smith",
      role: "Author Profile",
      bio: "Rodney Smith helps organizations translate leadership philosophy into durable operating habits.",
      books: "265",
      rating: "4.9",
      readers: "1.2M",
      image: "/catalog/author-rodney-smith.png",
    },
    reviews: baseReviews,
  },
  {
    slug: "autumn-memoir",
    title: "The Architecture of Leadership",
    author: "Rodney Smith",
    category: "LEADERSHIP",
    filterCategory: "Leadership",
    price: "$28.00",
    rating: 4.8,
    reviewCount: 128,
    cover: "/catalog/product-autumn.png",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$28.00" },
      { id: "paperback", label: "Paperback", price: "$17.50" },
      { id: "ebook", label: "eBook", price: "$12.99" },
      { id: "audio", label: "Audio", price: "$20.00" },
    ],
    shortDescription:
      "A reflective edition focused on long-term stewardship, intentional culture-building, and calm executive decision-making.",
    aboutQuote:
      '"The best leaders design for the season after success, not just the season of momentum."',
    aboutBody:
      "Built for founders and operators navigating inflection points, this edition frames leadership as a patient craft rooted in clarity, trust, and institutional memory.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "304 Pages" },
      { label: "ISBN", value: "978-1-555-11111-2" },
      { label: "PUBLICATION DATE", value: "January 14, 2024" },
      { label: "WEIGHT", value: "1.0 lbs" },
      { label: "DIMENSIONS", value: "6 x 1 x 9 inches" },
      { label: "CATEGORY", value: "Leadership" },
    ],
    authorProfile: {
      name: "Rodney Smith",
      role: "Author Profile",
      bio: "Rodney Smith writes about calm leadership, resilient communication, and sustainable organizational growth.",
      books: "265",
      rating: "4.9",
      readers: "1.2M",
      image: "/catalog/author-rodney-smith.png",
    },
    reviews: baseReviews,
  },
  {
    slug: "pain-habit",
    title: "The Architecture of Leadership",
    author: "Rodney Smith",
    category: "LEADERSHIP",
    filterCategory: "Leadership",
    price: "$28.00",
    rating: 4.8,
    reviewCount: 128,
    cover: "/catalog/product-pain-habit.png",
    badge: "#1 BESTSELLER",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$28.00" },
      { id: "paperback", label: "Paperback", price: "$18.00" },
      { id: "ebook", label: "eBook", price: "$14.50" },
      { id: "audio", label: "Audio", price: "$22.00" },
    ],
    shortDescription:
      "A vivid, habit-centered take on building leadership systems that reduce friction and strengthen team momentum.",
    aboutQuote:
      '"When culture is designed intentionally, discipline starts to feel like freedom instead of pressure."',
    aboutBody:
      "This version explores how leaders can turn recurring pain points into repeatable habits, improving trust, execution, and focus one decision at a time.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "322 Pages" },
      { label: "ISBN", value: "978-1-555-11111-3" },
      { label: "PUBLICATION DATE", value: "March 8, 2024" },
      { label: "WEIGHT", value: "1.1 lbs" },
      { label: "DIMENSIONS", value: "6 x 1 x 9 inches" },
      { label: "CATEGORY", value: "Leadership" },
    ],
    authorProfile: {
      name: "Rodney Smith",
      role: "Author Profile",
      bio: "Rodney Smith focuses on leadership systems, accountability, and decision design for modern teams.",
      books: "265",
      rating: "4.9",
      readers: "1.2M",
      image: "/catalog/author-rodney-smith.png",
    },
    reviews: baseReviews,
  },
  {
    slug: "whispers-of-the-forest",
    title: "Whispers of the Forest",
    author: "Sarah Jenkins",
    category: "NATURE & REFLECTION",
    filterCategory: "Faith & Wisdom",
    price: "$22.50",
    rating: 4.7,
    reviewCount: 84,
    cover: "/catalog/product-whispers.png",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$22.50" },
      { id: "paperback", label: "Paperback", price: "$16.00" },
      { id: "ebook", label: "eBook", price: "$11.99" },
      { id: "audio", label: "Audio", price: "$19.50" },
    ],
    shortDescription:
      "A meditative collection of reflections on stillness, wonder, and the quiet patterns that shape a meaningful life.",
    aboutQuote:
      '"Nature teaches gently, but its lessons remain with us far longer than noise ever can."',
    aboutBody:
      "Sarah Jenkins combines lyrical storytelling with thoughtful spiritual reflection, inviting readers into a slower, more attentive way of seeing the world.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "248 Pages" },
      { label: "ISBN", value: "978-1-555-11111-4" },
      { label: "PUBLICATION DATE", value: "August 11, 2024" },
      { label: "WEIGHT", value: "0.9 lbs" },
      { label: "DIMENSIONS", value: "5.5 x 0.9 x 8.5 inches" },
      { label: "CATEGORY", value: "Faith & Wisdom" },
    ],
    authorProfile: {
      name: "Sarah Jenkins",
      role: "Author Profile",
      bio: "Sarah Jenkins writes contemplative nonfiction centered on imagination, rest, and spiritual attentiveness.",
      books: "18",
      rating: "4.7",
      readers: "420K",
      image: "/home/author-1.png",
    },
    reviews: [
      {
        name: "Olivia Tran",
        role: "Verified Buyer",
        date: "July 22, 2024",
        title: "Quiet and beautiful",
        body: '"Every chapter felt like stepping into a more peaceful version of myself. This book is beautifully paced and deeply restorative."',
        initials: "O",
        rating: 5,
      },
    ],
  },
  {
    slug: "create-your-own-business",
    title: "The Architecture of Leadership",
    author: "Rodney Smith",
    category: "BUSINESS & STRATEGY",
    filterCategory: "Business",
    price: "$28.00",
    rating: 4.8,
    reviewCount: 128,
    cover: "/catalog/product-create-business.png",
    badge: "#1 BESTSELLER",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$28.00" },
      { id: "paperback", label: "Paperback", price: "$19.00" },
      { id: "ebook", label: "eBook", price: "$14.99" },
      { id: "audio", label: "Audio", price: "$22.00" },
    ],
    shortDescription:
      "A business-first presentation of Smith's architecture framework focused on organizational leverage and execution.",
    aboutQuote:
      '"Healthy businesses are not held together by charisma alone, but by structure that lets people do their best work repeatedly."',
    aboutBody:
      "Designed for founders and operators, this edition explores strategy, organizational design, and the systems behind sustainable execution.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "332 Pages" },
      { label: "ISBN", value: "978-1-555-11111-5" },
      { label: "PUBLICATION DATE", value: "November 4, 2023" },
      { label: "WEIGHT", value: "1.2 lbs" },
      { label: "DIMENSIONS", value: "6 x 1.1 x 9 inches" },
      { label: "CATEGORY", value: "Business" },
    ],
    authorProfile: {
      name: "Rodney Smith",
      role: "Author Profile",
      bio: "Rodney Smith advises high-growth companies on the leadership structures that support scale.",
      books: "265",
      rating: "4.9",
      readers: "1.2M",
      image: "/catalog/author-rodney-smith.png",
    },
    reviews: baseReviews,
  },
  {
    slug: "silent-wisdom",
    title: "Silent Wisdom",
    author: "Rodney Smith",
    category: "REFLECTION",
    filterCategory: "Faith & Wisdom",
    price: "$32.00",
    rating: 4.9,
    reviewCount: 210,
    cover: "/catalog/product-silent-blue.png",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$32.00" },
      { id: "paperback", label: "Paperback", price: "$21.00" },
      { id: "ebook", label: "eBook", price: "$15.99" },
      { id: "audio", label: "Audio", price: "$24.00" },
    ],
    shortDescription:
      "A minimalist meditation on clarity, focus, and the inner habits that shape wise external action.",
    aboutQuote:
      '"The deepest kind of confidence is often built in silence, before anyone else can see the outcome."',
    aboutBody:
      "Through short chapters and reflective prompts, Rodney Smith explores the role of restraint, patience, and disciplined attention in meaningful leadership.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "286 Pages" },
      { label: "ISBN", value: "978-1-555-11111-6" },
      { label: "PUBLICATION DATE", value: "February 7, 2024" },
      { label: "WEIGHT", value: "1.0 lbs" },
      { label: "DIMENSIONS", value: "6 x 0.9 x 9 inches" },
      { label: "CATEGORY", value: "Faith & Wisdom" },
    ],
    authorProfile: {
      name: "Rodney Smith",
      role: "Author Profile",
      bio: "Rodney Smith writes on disciplined leadership, quiet confidence, and enduring influence.",
      books: "265",
      rating: "4.9",
      readers: "1.2M",
      image: "/catalog/author-rodney-smith.png",
    },
    reviews: baseReviews,
  },
  {
    slug: "the-silent-echo",
    title: "The Silent Echo",
    author: "Evelyn Reed",
    category: "REFLECTION",
    filterCategory: "Faith & Wisdom",
    price: "$24.00",
    rating: 4.6,
    reviewCount: 64,
    cover: "/home/featured-book-1.png",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$24.00" },
      { id: "paperback", label: "Paperback", price: "$16.50" },
      { id: "ebook", label: "eBook", price: "$11.99" },
      { id: "audio", label: "Audio", price: "$18.50" },
    ],
    shortDescription:
      "A gentle exploration of identity, memory, and the quiet ways our inner lives shape what we become.",
    aboutQuote:
      '"Some truths arrive softly, but they echo through a lifetime."',
    aboutBody:
      "Evelyn Reed pairs intimate prose with carefully observed emotional detail, creating a book that rewards slow, attentive reading.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "230 Pages" },
      { label: "ISBN", value: "978-1-555-11111-7" },
      { label: "PUBLICATION DATE", value: "June 13, 2024" },
      { label: "WEIGHT", value: "0.9 lbs" },
      { label: "DIMENSIONS", value: "5.5 x 0.8 x 8.5 inches" },
      { label: "CATEGORY", value: "Faith & Wisdom" },
    ],
    authorProfile: {
      name: "Evelyn Reed",
      role: "Author Profile",
      bio: "Evelyn Reed is known for lyrical nonfiction centered on emotional honesty, memory, and personal renewal.",
      books: "12",
      rating: "4.6",
      readers: "210K",
      image: "/home/author-1.png",
    },
    reviews: [
      {
        name: "Mina Lewis",
        role: "Verified Buyer",
        date: "September 3, 2024",
        title: "Quietly unforgettable",
        body: '"This book felt like a conversation with my wisest self. Beautifully written and deeply moving."',
        initials: "M",
        rating: 5,
      },
    ],
  },
  {
    slug: "modern-wisdom",
    title: "Modern Wisdom",
    author: "Jonathan Pierce",
    category: "BUSINESS & STRATEGY",
    filterCategory: "Business",
    price: "$28.50",
    rating: 4.7,
    reviewCount: 92,
    cover: "/home/featured-book-2.png",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$28.50" },
      { id: "paperback", label: "Paperback", price: "$18.50" },
      { id: "ebook", label: "eBook", price: "$13.99" },
      { id: "audio", label: "Audio", price: "$21.50" },
    ],
    shortDescription:
      "A sharp, contemporary look at innovation, adaptability, and strategic thinking for a rapidly changing world.",
    aboutQuote:
      '"Wisdom is not old-fashioned when it still solves tomorrow\'s problems."',
    aboutBody:
      "Jonathan Pierce blends case studies, mental models, and entrepreneurial lessons into an accessible guide for thoughtful builders.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "274 Pages" },
      { label: "ISBN", value: "978-1-555-11111-8" },
      { label: "PUBLICATION DATE", value: "May 27, 2024" },
      { label: "WEIGHT", value: "0.95 lbs" },
      { label: "DIMENSIONS", value: "6 x 0.9 x 9 inches" },
      { label: "CATEGORY", value: "Business" },
    ],
    authorProfile: {
      name: "Jonathan Pierce",
      role: "Author Profile",
      bio: "Jonathan Pierce writes on innovation strategy, business model design, and practical modern leadership.",
      books: "8",
      rating: "4.7",
      readers: "180K",
      image: "/home/author-2.png",
    },
    reviews: [
      {
        name: "Alex Garner",
        role: "Verified Buyer",
        date: "August 1, 2024",
        title: "Energetic and useful",
        body: '"The frameworks are simple without being shallow. I walked away with ideas I could use immediately."',
        initials: "A",
        rating: 5,
      },
    ],
  },
  {
    slug: "art-of-focus",
    title: "The Art of Focus",
    author: "Sarah Jenkins",
    category: "REFLECTION",
    filterCategory: "Faith & Wisdom",
    price: "$22.00",
    rating: 4.5,
    reviewCount: 51,
    cover: "/home/featured-book-3.png",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$22.00" },
      { id: "paperback", label: "Paperback", price: "$15.50" },
      { id: "ebook", label: "eBook", price: "$10.99" },
      { id: "audio", label: "Audio", price: "$18.00" },
    ],
    shortDescription:
      "A thoughtful guide to attention, deep work, and building a life less scattered by noise.",
    aboutQuote:
      '"Focus is not found by accident; it is cultivated on purpose."',
    aboutBody:
      "Sarah Jenkins offers practical habits and reflective prompts for readers who want to reclaim attention and create room for meaningful work.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "240 Pages" },
      { label: "ISBN", value: "978-1-555-11111-9" },
      { label: "PUBLICATION DATE", value: "April 4, 2024" },
      { label: "WEIGHT", value: "0.9 lbs" },
      { label: "DIMENSIONS", value: "5.7 x 0.8 x 8.5 inches" },
      { label: "CATEGORY", value: "Faith & Wisdom" },
    ],
    authorProfile: {
      name: "Sarah Jenkins",
      role: "Author Profile",
      bio: "Sarah Jenkins helps readers build lives of deeper attention, presence, and spiritual calm.",
      books: "18",
      rating: "4.7",
      readers: "420K",
      image: "/home/author-1.png",
    },
    reviews: [
      {
        name: "Priya Hall",
        role: "Verified Buyer",
        date: "June 14, 2024",
        title: "Exactly what I needed",
        body: '"Clear, warm, and practical. It helped me reset how I work and think."',
        initials: "P",
        rating: 4,
      },
    ],
  },
  {
    slug: "journey-within",
    title: "Journey Within",
    author: "Dr. Marcus Lee",
    category: "REFLECTION",
    filterCategory: "Faith & Wisdom",
    price: "$32.00",
    rating: 4.8,
    reviewCount: 73,
    cover: "/home/featured-book-4.png",
    formats: [
      { id: "hardcover", label: "Hardcover", price: "$32.00" },
      { id: "paperback", label: "Paperback", price: "$21.50" },
      { id: "ebook", label: "eBook", price: "$15.99" },
      { id: "audio", label: "Audio", price: "$24.50" },
    ],
    shortDescription:
      "A psychologically informed reflection on healing, inner resilience, and the practices that support a grounded life.",
    aboutQuote:
      '"The journey inward is not an escape from life, but a better way of returning to it."',
    aboutBody:
      "Dr. Marcus Lee combines therapeutic insight with compassionate storytelling in a book built for readers navigating change, growth, and inner repair.",
    specs: [
      { label: "PUBLISHER", value: "Wonder Press" },
      { label: "LANGUAGE", value: "English" },
      { label: "PAGES", value: "320 Pages" },
      { label: "ISBN", value: "978-1-555-11112-0" },
      { label: "PUBLICATION DATE", value: "January 30, 2024" },
      { label: "WEIGHT", value: "1.1 lbs" },
      { label: "DIMENSIONS", value: "6 x 1 x 9 inches" },
      { label: "CATEGORY", value: "Faith & Wisdom" },
    ],
    authorProfile: {
      name: "Dr. Marcus Lee",
      role: "Author Profile",
      bio: "Dr. Marcus Lee writes at the intersection of psychology, healing, and purposeful living.",
      books: "14",
      rating: "4.8",
      readers: "260K",
      image: "/home/author-3.png",
    },
    reviews: [
      {
        name: "Ava Morton",
        role: "Verified Buyer",
        date: "May 8, 2024",
        title: "Deeply humane",
        body: '"Thoughtful, compassionate, and genuinely helpful. It stays with you after you finish."',
        initials: "A",
        rating: 5,
      },
    ],
  },
];

export const featuredCategoryTiles: CategoryTile[] = [
  {
    title: "Leadership & Growth",
    subtitle: "Explore",
    href: "/categories?view=shop&category=Leadership",
    image: "/catalog/category-leadership.png",
    icon: "spark",
  },
  {
    title: "Children's Adventures",
    subtitle: "Explore",
    href: "/categories?view=shop&category=Children%27s",
    image: "/catalog/category-children.png",
    icon: "spark",
  },
  {
    title: "Faith & Wisdom",
    subtitle: "Explore",
    href: "/categories?view=shop&category=Faith%20%26%20Wisdom",
    image: "/catalog/category-faith.png",
    icon: "spark",
  },
  {
    title: "New Releases",
    subtitle: "Discover the latest additions.",
    href: "/categories?view=shop&category=All%20Categories",
    icon: "spark",
  },
  {
    title: "Best Sellers",
    subtitle: "Our most loved titles.",
    href: "/categories?view=shop&category=Leadership",
    icon: "star",
    emphasized: true,
  },
  {
    title: "Digital Books",
    subtitle: "Read anywhere, anytime.",
    href: "/categories?view=shop&format=eBook",
    icon: "tablet",
  },
];

const categoryOrder = [
  "All Categories",
  "Leadership",
  "Children's",
  "Faith & Wisdom",
  "Business",
];
const formatOrder = ["Hardcover", "Paperback", "eBook", "Audio"];

export const categoryFilterCounts = {
  "All Categories": 124,
  Leadership: 45,
  "Children's": 32,
  "Faith & Wisdom": 28,
  Business: 19,
} as const;

export const categoryFilters = categoryOrder;
export const formatFilters = formatOrder;

export const recommendedProducts = [
  "the-silent-echo",
  "modern-wisdom",
  "art-of-focus",
  "journey-within",
].map((slug) => products.find((product) => product.slug === slug)!);

const gridSeed = [
  "still-single",
  "architecture-of-leadership",
  "make-your-happy",
  "autumn-memoir",
  "pain-habit",
  "whispers-of-the-forest",
  "create-your-own-business",
  "silent-wisdom",
  "pain-habit",
  "whispers-of-the-forest",
  "create-your-own-business",
  "silent-wisdom",
];

export const categoryGridProducts = gridSeed.map((slug) =>
  products.find((product) => product.slug === slug)!,
);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getAuthorSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fillAuthorShelf(
  primaryProducts: Product[],
  fallbackProducts: Product[],
  count: number,
) {
  const seen = new Set<string>();

  return [...primaryProducts, ...fallbackProducts]
    .filter((product) => {
      if (seen.has(product.slug)) {
        return false;
      }

      seen.add(product.slug);
      return true;
    })
    .slice(0, count);
}

const uniqueAuthorProfiles = products.reduce<AuthorPageData[]>(
  (collection, product) => {
    const existingAuthor = collection.find(
      (author) => author.name === product.authorProfile.name,
    );

    if (existingAuthor) {
      return collection;
    }

    const authorProducts = products.filter(
      (entry) => entry.authorProfile.name === product.authorProfile.name,
    );

    const topRated = [...authorProducts].sort(
      (left, right) =>
        right.rating - left.rating || right.reviewCount - left.reviewCount,
    );
    const popularBooks = [...authorProducts].sort(
      (left, right) =>
        right.reviewCount - left.reviewCount || right.rating - left.rating,
    );
    const fallbackProducts = [
      ...recommendedProducts,
      ...categoryGridProducts,
      ...products,
    ];

    collection.push({
      ...product.authorProfile,
      slug: getAuthorSlug(product.authorProfile.name),
      shelves: [
        {
          title: "Top Rated",
          products: fillAuthorShelf(topRated, fallbackProducts, 5),
        },
        {
          title: "Popular Books",
          products: fillAuthorShelf(popularBooks, fallbackProducts, 5),
        },
        {
          title: "All Books",
          products: fillAuthorShelf(authorProducts, fallbackProducts, 10),
        },
      ],
    });

    return collection;
  },
  [],
);

export const authorPages = uniqueAuthorProfiles;

export function getAuthorBySlug(slug: string) {
  return authorPages.find((author) => author.slug === slug);
}
