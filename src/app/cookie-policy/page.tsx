import Link from "next/link";
import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";

export default function CookiePolicyPage() {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/" />

      <section className="bg-[var(--home-paper)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[var(--home-gold)]">
            Legal & Privacy
          </p>
          <h1 className="mt-3 text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[46px]">
            Cookie Policy — W.E. Books (The Wonder Emporium Inc.)
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-[13px] font-semibold text-[var(--home-gold)]">
            <span>Last Updated: July 15, 2026</span>
            <span>•</span>
            <span>Effective Date: July 15, 2026</span>
          </div>

          <div className="mt-8 space-y-8 border border-[var(--home-border)] bg-white p-6 sm:p-10 text-[15px] leading-7 text-[var(--home-muted)] shadow-sm">
            {/* Preamble */}
            <div className="space-y-4 border-b border-[var(--home-border)] pb-6 text-[16px] leading-7 text-[var(--home-ink)]">
              <p>
                This Cookie Policy explains how The Wonder Emporium Inc., d/b/a
                W.E. Books (&quot;W.E. Books,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;) uses cookies and similar
                tracking technologies on our website and the WE Books mobile and
                web reading/listening application (the &quot;App&quot;),
                collectively the &quot;Service.&quot; This Cookie Policy
                supplements our Customer Privacy Policy and Author Privacy
                Policy.
              </p>
              <p>
                By continuing to use our website, you consent to our use of
                cookies as described in this policy, except where we ask for
                your specific consent (for example, non-essential cookies via a
                cookie banner) or where applicable law requires otherwise.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                1. What Are Cookies
              </h2>
              <p className="pl-2">
                Cookies are small text files placed on your device when you
                visit a website. They allow the site to recognize your device
                and remember information about your visit, such as your login
                status or preferences. Similar technologies include web beacons,
                pixels, local storage, and SDKs used within the App.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                2. Categories of Cookies We Use
              </h2>
              <div className="space-y-4 pl-2">
                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.1 Strictly Necessary Cookies
                  </h3>
                  <p>
                    These cookies are required for the Service to function and
                    cannot be switched off. They include cookies that:
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    <li>
                      Keep you logged into your account or Author Dashboard;
                    </li>
                    <li>Maintain your shopping cart and checkout session;</li>
                    <li>
                      Support security features (e.g., fraud prevention, session
                      integrity); and
                    </li>
                    <li>
                      Remember cookie consent preferences you&apos;ve selected.
                    </li>
                  </ul>
                  <p className="mt-2">
                    You cannot opt out of strictly necessary cookies without
                    losing core functionality of the Service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.2 Functional Cookies
                  </h3>
                  <p>
                    These cookies remember choices you make (such as display
                    preferences in the App, or your last-read page) to provide a
                    more personalized experience. Disabling these may reduce
                    convenience but will not break core functionality.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.3 Analytics/Performance Cookies
                  </h3>
                  <p>
                    These cookies help us understand how visitors use our
                    website and App — for example, which pages are visited, how
                    long users stay, and where users drop off during checkout —
                    so we can improve the Service. We may use third-party
                    analytics providers (such as Google Analytics) for this
                    purpose.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.4 Marketing/Advertising Cookies
                  </h3>
                  <p>
                    Where enabled and where you consent (as required in your
                    jurisdiction), these cookies are used to measure the
                    effectiveness of our marketing campaigns, such as tracking
                    whether a visit to our site followed a social media or email
                    promotion. We do not currently use third-party cookies to
                    serve behavioral advertising to you across other websites.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                3. Cookies Used in the App
              </h2>
              <p className="pl-2">
                The App may use similar local storage or SDK-based technologies
                (rather than traditional browser cookies) to keep you logged in,
                sync your reading/listening progress across devices, and
                understand feature usage. These serve the same categories of
                purpose described in Section 2.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                4. Third-Party Cookies
              </h2>
              <p className="pl-2">
                Some cookies are placed by third-party service providers acting
                on our behalf (for example, our analytics provider or payment
                processor&apos;s fraud-prevention tools). These third parties
                may use the information collected via cookies for their own
                purposes as described in their respective privacy policies, to
                the extent permitted by their agreements with us and applicable
                law.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                5. Your Cookie Choices
              </h2>
              <div className="space-y-4 pl-2">
                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    5.1 Cookie Consent Banner
                  </h3>
                  <p>
                    Where required by applicable law (for example, for visitors
                    in the EEA, UK, or certain U.S. states), we will present a
                    cookie consent banner allowing you to accept or reject
                    non-essential cookie categories (functional, analytics,
                    marketing) before they are set. You can change your
                    preferences at any time via the cookie settings link in our
                    website footer.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    5.2 Browser Controls
                  </h3>
                  <p>
                    Most browsers allow you to block or delete cookies through
                    their settings. Please note that blocking strictly necessary
                    cookies will likely prevent parts of the Service (such as
                    login or checkout) from working properly.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    5.3 Do Not Track
                  </h3>
                  <p>
                    Some browsers offer a &quot;Do Not Track&quot; signal.
                    Because there is no common industry standard for responding
                    to these signals, our Service does not currently respond
                    differently based on a detected Do Not Track signal.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                6. Changes to This Cookie Policy
              </h2>
              <p className="pl-2">
                We may update this Cookie Policy from time to time to reflect
                changes in the cookies and technologies we use, or for legal or
                regulatory reasons. We will post the updated policy with a new
                &quot;Last Updated&quot; date. Material changes will be
                highlighted via our website or App where appropriate.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                7. Contact Us
              </h2>
              <p className="pl-2">
                Questions about this Cookie Policy can be directed to:
              </p>
              <div className="pl-2 space-y-1 text-[14px]">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@thewonderemporium.com"
                    className="font-semibold text-[var(--home-gold)] underline"
                  >
                    support@thewonderemporium.com
                  </a>
                </p>
                <p>
                  <strong>Mail:</strong> The Wonder Emporium Inc., Houston,
                  Texas
                </p>
              </div>
            </section>

            {/* Drafting Note Box */}
            <div className="mt-8 border-l-4 border-[var(--home-gold)] bg-[#FAF8F5] p-5 text-[14px] leading-6 text-[var(--home-ink)]">
              <p className="font-bold text-[var(--home-gold)] uppercase tracking-wider text-[12px] mb-2">
                Legal Review & Compliance Note
              </p>
              <p>
                This document is a working draft prepared for The Wonder
                Emporium Inc. / W.E. Books and has not been reviewed by an
                attorney. Before publishing, please: (1) confirm with your web
                developer exactly which cookies/SDKs are actually implemented on
                the live site and App so this policy matches reality (a mismatch
                between stated and actual cookie use is a common compliance
                issue); (2) implement an actual functioning cookie consent
                banner if you&apos;ll have EEA/UK or applicable U.S.-state
                visitors, since this policy alone does not satisfy the technical
                consent requirement in those jurisdictions; and (3) revisit
                Section 5.3 if you later decide to honor Global Privacy Control
                (GPC) signals, which some U.S. states now require treating as a
                valid opt-out request.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
            >
              Back to Home
            </Link>
            <Link
              href="/categories?view=shop"
              className="inline-flex h-12 items-center justify-center border border-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
