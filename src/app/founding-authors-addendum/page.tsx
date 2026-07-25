import Link from "next/link";
import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";

export default function FoundingAuthorsAddendumPage() {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/authors" />

      <section className="bg-[var(--home-paper)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[var(--home-gold)]">
            Legal & Compliance
          </p>
          <h1 className="mt-3 text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[46px]">
            Founding 100 Authors Program Addendum — W.E. Books (The Wonder
            Emporium Inc.)
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
                This Founding 100 Authors Program Addendum
                (&quot;Addendum&quot;) supplements and is incorporated into the
                W.E. Books Author Terms of Service (the &quot;Author
                Terms&quot;) between you (&quot;Founding Author&quot; or
                &quot;you&quot;) and The Wonder Emporium Inc., d/b/a W.E. Books,
                a Texas limited liability company headquartered in Houston,
                Texas (&quot;W.E. Books,&quot; &quot;we,&quot; &quot;us,&quot;
                or &quot;our&quot;). Capitalized terms not defined in this
                Addendum have the meanings given in the Author Terms.
              </p>
              <p>
                This Addendum applies only to authors who qualify for and are
                accepted into the Founding 100 Authors Program (the
                &quot;Program&quot;) as described below. In the event of any
                conflict between this Addendum and the general Author Terms,
                this Addendum controls with respect to Founding Authors, except
                where the Author Terms provide greater protections to you.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                1. Purpose of the Program
              </h2>
              <p className="pl-2">
                The Founding 100 Authors Program is a limited, pre-launch
                initiative designed to reward the first 100 authors who join
                W.E. Books before its public launch with permanently enhanced
                royalty terms, in recognition of their early trust in the
                Platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                2. Eligibility and Enrollment
              </h2>
              <div className="space-y-4 pl-2">
                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.1 Limited Enrollment
                  </h3>
                  <p>
                    The Program is limited to the{" "}
                    <strong>first 100 unique Author Accounts</strong> that:
                  </p>
                  <ol className="mt-2 list-decimal space-y-1.5 pl-6">
                    <li>
                      Complete Author Account registration before the close of
                      the Founding Window (defined below);
                    </li>
                    <li>Accept these Author Terms and this Addendum; and</li>
                    <li>
                      Successfully upload and publish at least one qualifying
                      title (in eBook, audiobook, or Print format) before the
                      close of the Founding Window.
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.2 Founding Window
                  </h3>
                  <p>
                    The &quot;Founding Window&quot; is the period beginning on
                    [PROGRAM START DATE] and ending on the earlier of (a)
                    [PROGRAM END DATE], or (b) the date on which the 100th
                    applicant&apos;s Founding 100 application is both{" "}
                    <strong>submitted and approved</strong> by W.E. Books under
                    Section 2.1. Enrollment closes permanently at that point —
                    applications submitted after the 100th approved application
                    will not be accepted into the Program, regardless of when
                    they were started or how far along the applicant was in the
                    upload process. We will announce closure of the Founding
                    Window on the website and in the Author Dashboard.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.3 Verification
                  </h3>
                  <p>
                    We may verify your enrollment date, qualifying title, and
                    Founding 100 order/position. We reserve the right to correct
                    any erroneous grant of Founding 100 status resulting from
                    technical error, fraud, or misrepresentation, including
                    removing Program benefits retroactively in such cases.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    2.4 Non-Transferability
                  </h3>
                  <p>
                    Founding 100 status is personal to the Author Account that
                    enrolled during the Founding Window. It cannot be sold,
                    gifted, transferred, or assigned to another author or
                    account, including in the event of a change in pen name,
                    unless we approve an account consolidation in writing.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                3. Program Benefits
              </h2>
              <div className="space-y-4 pl-2">
                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    3.1 Locked-In Premium Royalty Rates
                  </h3>
                  <p>
                    As a Founding Author, you receive the premium royalty rates
                    set out in the Founding 100 Royalty Schedule provided to you
                    at enrollment (the &quot;Founding Rate&quot;). The Founding
                    Rate applies to all titles you publish under your Founding
                    100 Author Account — both titles published during the
                    Founding Window and new titles you publish afterward — for
                    as long as your Author Account remains open and in good
                    standing.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    3.2 Protection from General Rate Changes
                  </h3>
                  <p>
                    Under Section 4.4 of the Author Terms, we may adjust the
                    general royalty schedule that applies to Standard Authors
                    from time to time.{" "}
                    <strong>
                      The Founding Rate is not affected by any such general rate
                      change.
                    </strong>{" "}
                    Your Founding Rate will only change as described in Section
                    4 of this Addendum.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    3.3 Distribution Path
                  </h3>
                  <p>
                    Founding Authors may still choose between W.E.
                    Books–Exclusive Distribution and Wide Distribution for each
                    title, as described in Section 2.2 of the Author Terms. Your
                    selected distribution path may affect which specific
                    Founding Rate tier (Exclusive vs. Wide) applies to a given
                    title, as detailed in your Founding 100 Royalty Schedule,
                    but both tiers remain premium relative to the corresponding
                    Standard Author rates.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    3.4 Other Program Perks
                  </h3>
                  <p>
                    We may offer additional non-royalty benefits to Founding
                    Authors from time to time (such as early access to new
                    features, dedicated support, or founding-member recognition
                    on the Platform). These additional perks are offered at our
                    discretion and are not guaranteed to continue indefinitely,
                    and their discontinuation does not affect your locked-in
                    Founding Rate under Section 3.1.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                4. Conditions That May Affect Your Founding Rate
              </h2>
              <p className="pl-2">
                Your Founding Rate is intended to be permanent for the life of
                your active, compliant Author Account, subject only to the
                following:
              </p>
              <div className="space-y-4 pl-2">
                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    4.1 Account in Good Standing
                  </h3>
                  <p>
                    Your Founding Rate applies only while your Author Account
                    remains in good standing under the Author Terms. If your
                    Author Account is suspended or terminated for cause (e.g., a
                    material breach of the Author Terms, such as submitting
                    infringing or fraudulent content), Founding 100 status and
                    the Founding Rate do not apply upon any subsequent
                    reinstatement, unless we agree otherwise in writing.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    4.2 Voluntary Closure and Reopening — No Re-Entry to the
                    Program
                  </h3>
                  <p>
                    Founding 100 status is granted{" "}
                    <strong>
                      once, permanently, and only during the Founding Window
                    </strong>{" "}
                    described in Section 2.2. If you voluntarily close your
                    Author Account, withdraw from the Program, or otherwise
                    leave for any reason,{" "}
                    <strong>
                      you may not rejoin or be reinstated into the Founding 100
                      Authors Program
                    </strong>
                    , even if you later re-register a new Author Account and
                    even if the total number of active Founding Authors falls
                    below 100 as a result of your departure. The Program does
                    not backfill open slots once the Founding Window has closed.
                    Any newly created or reinstated account will be treated as a
                    Standard Author under Section 2.2 of the Author Terms, and
                    your prior Founding Rate does not carry over. You will be
                    treated identically to any other Standard Author, with no
                    distinction, priority, or special consideration given based
                    on your prior Founding 100 status.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    4.3 Legal or Regulatory Requirements
                  </h3>
                  <p>
                    If applicable law requires us to change royalty structures
                    generally (for example, due to tax or payment-processing
                    regulation), we may apply the minimum necessary adjustment
                    to Founding Rates to comply, with notice to you, but will
                    preserve the relative premium of the Founding Rate over the
                    then-current Standard Author rate to the extent legally
                    possible.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    4.4 Program Discontinuation Does Not Affect Existing
                    Founding Authors
                  </h3>
                  <p>
                    If we discontinue the Founding 100 Authors Program for
                    future enrollment (which, by definition, closes once 100
                    accounts have enrolled or the Founding Window ends), this
                    does <strong>not</strong> affect the rates already locked in
                    for existing Founding Authors under Section 3.1.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                5. Relationship to the Author Terms
              </h2>
              <p className="pl-2">
                This Addendum does not replace the Author Terms. All other
                provisions of the Author Terms — including content requirements,
                Lulu print fulfillment terms, payment and tax obligations,
                intellectual property license grants, indemnification,
                limitation of liability, and dispute resolution — apply equally
                to Founding Authors. This Addendum only modifies the
                royalty-rate terms as described above.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                6. Questions
              </h2>
              <p className="pl-2">
                Questions about your Founding 100 status, enrollment
                verification, or Founding Rate can be directed to{" "}
                <a
                  href="mailto:support@thewonderemporium.com"
                  className="font-semibold text-[var(--home-gold)] underline"
                >
                  support@thewonderemporium.com
                </a>
                .
              </p>
            </section>

            {/* Drafting Note Box */}
            <div className="mt-8 border-l-4 border-[var(--home-gold)] bg-[#FAF8F5] p-5 text-[14px] leading-6 text-[var(--home-ink)]">
              <p className="font-bold text-[var(--home-gold)] uppercase tracking-wider text-[12px] mb-2">
                Legal Review & Drafting Note
              </p>
              <p>
                This document is a working draft prepared for The Wonder
                Emporium Inc. / W.E. Books and has not been reviewed by an
                attorney. Before publishing, please: (1) insert final Program
                start/end dates in Section 2.2; (2) confirm the Founding 100
                Royalty Schedule referenced in Section 3.1 is finalized and
                consistently cross-referenced across all author-facing
                documents; and (3) have counsel confirm the enforceability of a
                &quot;permanently locked&quot; rate commitment over a long time
                horizon, including how it should be handled in the unlikely
                event of a change of control or sale of the business.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/authors"
              className="inline-flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
            >
              Back to Authors
            </Link>
            <Link
              href="/author-terms"
              className="inline-flex h-12 items-center justify-center border border-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
            >
              Author Terms
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
