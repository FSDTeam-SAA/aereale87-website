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
  authors,
  bestSellers,
  featuredBooks,
  footerColumns,
  foundingBenefits,
  navItems,
  stats,
  testimonials,
} from "../api/homepage.data";

export default function HomePage() {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <HomeHeader items={navItems} />
      <HomeHero />
      <StatsBar items={stats} />

      <HomeSection id="shop" className="bg-[var(--home-paper)]">
        <SectionHeading
          title="Best Sellers"
          subtitle="The titles our community loves most."
          ctaHref="#categories"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </HomeSection>

      <FoundingProgram benefits={foundingBenefits} />

      <HomeSection id="categories" className="bg-[var(--home-paper)]">
        <SectionHeading title="Featured Books" ctaHref="#newsletter" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
        </div>
      </HomeSection>

      <FeaturedBanner />

      <HomeSection className="bg-[var(--home-paper)]">
        <div className="text-center">
          <h2 className="text-[38px] leading-[1.2] font-semibold text-[#18233a] sm:text-[52px]">
            What OurReaders Say
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
        <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {authors.map((author, index) => (
            <AuthorCard key={`${author.name}-${index}`} author={author} />
          ))}
        </div>
      </HomeSection>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
