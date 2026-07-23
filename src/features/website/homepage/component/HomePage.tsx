import {
  AuthorCard,
  BookCard,
  FeaturedBanner,
  FoundingProgram,
  HomeFooter,
  HomeHeader,
  HomeHero,
  HomeSection,
  NewsletterSignup,
  SectionHeading,
  StatsBar,
  TestimonialCard,
} from ".";
import {
  footerColumns,
  foundingBenefits,
  stats,
  testimonials,
} from "../api/homepage.data";
import type { AuthorItem, BookItem } from "../types/homepage.types";
import type {
  CatalogBook,
  FoundingAuthor,
} from "@/features/website/catalog/api/catalog.api";

function transformAuthor(author: FoundingAuthor): AuthorItem {
  const name = author.profile
    ? `${author.profile.firstName || ""} ${author.profile.lastName || ""}`.trim() ||
      author.username
    : author.username;
  return {
    href: `/authors/${author.id}`,
    name,
    badge: "Founding Author",
    books: String(author.bookCount),
    rating: "0.0",
    readers: "0",
    avatar: author.profile?.avatarUrl || "/placeholder-author.png",
  };
}

function transformBook(book: CatalogBook, badge?: string): BookItem {
  const authorName = book.author?.profile
    ? `${book.author.profile.firstName || ""} ${book.author.profile.lastName || ""}`.trim() ||
      book.author?.username
    : book.author?.username || "Unknown Author";
  const lowestPrice =
    book.sellingPrice ??
    (book.formats.length
      ? Math.min(...book.formats.map((format) => format.listPrice))
      : 0);
  const price = `$${lowestPrice.toFixed(2)}`;
  return {
    id: book.id,
    formatId: book.formats[0]?.id ?? book.formats[0]?.formatType,
    href: `/book/${book.id}`,
    image: book.bookCover || "/placeholder-book.png",
    imageAlt: book.title,
    title: book.title,
    author: authorName,
    price,
    reviews: "0",
    category: book.category || "General",
    formats: book.formats.map((format) => format.formatType),
    badge,
  };
}

function BookStrip({ books }: { books: BookItem[] }) {
  if (!books.length) {
    return (
      <div className="mt-12 border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
        No approved founding-author books are available yet.
      </div>
    );
  }

  return (
    <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-3 xl:grid xl:grid-cols-4 xl:overflow-visible xl:pb-0">
      {books.map((book) => (
        <div
          key={book.id ?? book.title}
          className="min-w-[280px] snap-start md:min-w-[330px] xl:min-w-0"
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}

function AuthorStrip({ authors }: { authors: AuthorItem[] }) {
  if (!authors.length) {
    return (
      <p className="col-span-full border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
        No founding authors are available yet.
      </p>
    );
  }

  return (
    <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-2 xl:grid-cols-3 xl:overflow-visible xl:pb-0">
      {authors.map((author, index) => (
        <div
          key={`${author.name}-${index}`}
          className="min-w-[290px] snap-start lg:min-w-0"
        >
          <AuthorCard author={author} />
        </div>
      ))}
    </div>
  );
}

export default function HomePage({
  apiAuthors,
  apiBooks,
}: {
  apiAuthors: FoundingAuthor[];
  apiBooks: CatalogBook[];
}) {
  const authors = apiAuthors.map(transformAuthor);
  const featuredBooks = apiBooks
    .slice(0, 8)
    .map((book) => transformBook(book, "Featured"));
  const bestSellers = apiBooks
    .slice(0, 4)
    .map((book) => transformBook(book, "Best Seller"));

  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <HomeHeader items={[]} />
      <HomeHero />
      <StatsBar items={stats} />

      <HomeSection id="shop" className="bg-[var(--home-paper)]">
        <SectionHeading
          title="Best Sellers"
          subtitle="The titles our community loves most."
          ctaHref="/categories?view=shop"
        />
        <BookStrip books={bestSellers} />
      </HomeSection>

      <FoundingProgram benefits={foundingBenefits} />

      <HomeSection id="categories" className="bg-[var(--home-paper)]">
        <SectionHeading
          title="Featured Books"
          ctaHref="/categories?view=shop"
        />
        <BookStrip books={featuredBooks} />
      </HomeSection>

      <FeaturedBanner />

      <HomeSection className="bg-[var(--home-paper)]">
        <div className="text-center">
          <h2 className="text-[38px] leading-[1.2] font-semibold text-[#18233a] sm:text-[52px]">
            What Our Readers Say
          </h2>
        </div>
        <div className="mt-12 grid gap-5 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </HomeSection>

      <HomeSection id="authors" className="bg-[var(--home-surface)]">
        <div className="text-center">
          <h2 className="text-[38px] leading-10 font-semibold text-[var(--home-green-deep)] sm:text-[54px]">
            Meet Future Founding Authors
          </h2>
          <div className="mx-auto mt-5 h-1 w-12 bg-[var(--home-gold)]" />
        </div>
        <AuthorStrip authors={authors} />
      </HomeSection>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
