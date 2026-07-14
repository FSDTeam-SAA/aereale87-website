import { Mail } from "lucide-react";

import { HomeSection } from "./primitives";

export function NewsletterSignup() {
  return (
    <HomeSection
      id="newsletter"
      className="relative overflow-hidden bg-[var(--home-paper)]"
    >
      <div className="absolute inset-y-0 left-0 hidden w-[42%] bg-[linear-gradient(165deg,transparent_24%,rgba(255,255,255,0.4)_24%,rgba(255,255,255,0.4)_76%,transparent_76%)] lg:block" />
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(345deg,transparent_24%,rgba(255,255,255,0.4)_24%,rgba(255,255,255,0.4)_76%,transparent_76%)] lg:block" />
      <div className="relative mx-auto max-w-[1440px] text-center">
        <div className="mx-auto flex max-w-[676px] flex-col items-center">
          <Mail className="mb-4 size-12 text-[var(--home-green)]" />
          <h2 className="text-balance text-[38px] leading-[1.2] font-semibold text-[var(--home-green-deep)] sm:text-[48px]">
            Join The Wonder Community
          </h2>
          <p className="mt-4 text-[20px] leading-[1.2] text-[var(--home-muted)] sm:text-[24px]">
            Receive exclusive book releases, personalized recommendations, and
            special offers directly to your inbox.
          </p>
          <form
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row"
            aria-label="Newsletter signup"
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Enter your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email address"
              className="h-[58px] flex-1 border border-[var(--home-border)] bg-[var(--home-surface)] px-6 text-[16px] text-[var(--home-green-deep)] outline-none transition placeholder:text-[var(--home-muted)] focus:border-[var(--home-gold)]"
            />
            <button
              type="button"
              className="inline-flex h-[58px] min-w-[218px] items-center justify-center border border-[var(--home-gold)] bg-[var(--home-gold)] px-8 text-[16px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-transparent hover:text-[var(--home-gold)] [font-family:var(--font-display)]"
            >
              Subscribe Now
            </button>
          </form>
          <p className="mt-4 text-[16px] leading-[1.2] text-[var(--home-muted)]">
            By subscribing, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </HomeSection>
  );
}
