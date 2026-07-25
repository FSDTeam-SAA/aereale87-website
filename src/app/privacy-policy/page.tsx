import Link from "next/link";
import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/" />

      <section className="bg-[var(--home-paper)] px-5 py-16 sm:px-8 lg:px-[120px] lg:py-20">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[var(--home-gold)]">
            Legal & Privacy
          </p>
          <h1 className="mt-3 text-[34px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[46px]">
            Privacy Policy — W.E. Books (The Wonder Emporium Inc.)
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
                The Wonder Emporium Inc., d/b/a W.E. Books (&quot;W.E.
                Books,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;), a Texas limited liability company
                headquartered in Houston, Texas, respects your privacy. This
                Privacy Policy explains what personal information we collect
                from customers/readers (&quot;you&quot;) through our website,
                the WE Books mobile and web reading/listening application (the
                &quot;App&quot;), and related services (collectively, the
                &quot;Service&quot;), how we use and share it, and the choices
                and rights available to you.
              </p>
              <p>
                This Privacy Policy applies to customers/readers. If you are an
                author using the Platform to publish and sell content, a
                separate section (Section 12) describes how author-specific
                information is handled, and our Author Terms of Service also
                apply to you.
              </p>
              <p>
                By using the Service, you agree to the collection and use of
                information as described in this Privacy Policy. If you do not
                agree, please do not use the Service.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                1. Information We Collect
              </h2>
              <div className="space-y-4 pl-2">
                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    1.1 Information You Provide Directly
                  </h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      <strong>Account information:</strong> name, email address,
                      password (stored in hashed/encrypted form), and optional
                      profile details.
                    </li>
                    <li>
                      <strong>Payment information:</strong> billing name,
                      billing address, and payment card or payment method
                      details. Full card numbers are collected and stored by our
                      third-party payment processor, not directly by us (see
                      Section 4).
                    </li>
                    <li>
                      <strong>Shipping information:</strong> for Print orders,
                      your shipping name and address, which we share with our
                      print fulfillment partner, Lulu Press, Inc.
                      (&quot;Lulu&quot;), solely to produce and ship your order.
                    </li>
                    <li>
                      <strong>Communications:</strong> messages you send to
                      customer support, survey responses, or content you submit
                      such as reviews and ratings.
                    </li>
                    <li>
                      <strong>Membership/subscription selections:</strong> the
                      subscription tier you choose and your billing preferences.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    1.2 Information Collected Automatically
                  </h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      <strong>Device and usage data:</strong> IP address,
                      browser type, device identifiers, operating system, and
                      general log data (pages visited, features used, crash
                      reports).
                    </li>
                    <li>
                      <strong>Reading and listening activity:</strong> which
                      titles you access, reading progress, bookmarks,
                      highlights, listening progress, and similar in-app
                      engagement data, used to power features like
                      &quot;continue reading,&quot; recommendations, and royalty
                      allocation for membership reads (see our Author Terms of
                      Service, Section 4.5).
                    </li>
                    <li>
                      <strong>Cookies and similar technologies:</strong> used on
                      our website for functionality, analytics, and (where you
                      consent) marketing purposes. See Section 6.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    1.3 Information from Third Parties
                  </h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      Our payment processor may share limited transaction status
                      information with us (e.g., payment succeeded/failed)
                      without exposing your full card details.
                    </li>
                    <li>
                      If you sign in or interact with the Service through a
                      third-party platform (e.g., a social login), we may
                      receive basic profile information from that platform,
                      consistent with your settings there.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    1.4 Children&apos;s Information
                  </h3>
                  <p>
                    The Service is not directed to children under 13, and we do
                    not knowingly collect personal information from children
                    under 13 without verifiable parental consent. If you believe
                    a child under 13 has provided us personal information,
                    please contact us at{" "}
                    <a
                      href="mailto:support@thewonderemporium.com"
                      className="font-semibold text-[var(--home-gold)] underline"
                    >
                      support@thewonderemporium.com
                    </a>{" "}
                    so we can delete it.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                2. How We Use Your Information
              </h2>
              <p className="pl-2">We use the information described above to:</p>
              <ul className="mt-2 list-disc space-y-2 pl-7">
                <li>
                  Create and manage your account and membership subscription;
                </li>
                <li>
                  Process purchases, subscription billing, and Print order
                  fulfillment;
                </li>
                <li>
                  Deliver eBooks and audiobooks to you through the App and sync
                  your reading/listening progress across devices;
                </li>
                <li>
                  Calculate and allocate membership-based royalties to authors
                  (using aggregated or title-level engagement data, not your
                  individual identity, for that specific purpose);
                </li>
                <li>Provide customer support and respond to your inquiries;</li>
                <li>
                  Send transactional communications (order confirmations,
                  renewal notices, password resets) and, where you have opted
                  in, marketing communications about new titles, promotions, or
                  features;
                </li>
                <li>
                  Personalize recommendations and improve the Service through
                  analytics;
                </li>
                <li>
                  Detect, investigate, and prevent fraud, unauthorized access,
                  or violations of our Terms of Service; and
                </li>
                <li>
                  Comply with legal obligations, including tax and accounting
                  recordkeeping for purchases.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                3. Legal Bases for Processing (EEA/UK Users)
              </h2>
              <p className="pl-2">
                If you are located in the European Economic Area or United
                Kingdom, we process your personal data on the following legal
                bases: performance of a contract (e.g., processing your purchase
                or subscription), our legitimate interests (e.g., improving the
                Service, preventing fraud), your consent (e.g., marketing
                emails, certain cookies), and compliance with legal obligations
                (e.g., tax recordkeeping).
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                4. How We Share Your Information
              </h2>
              <p className="pl-2">
                We do not sell your personal information for money. We share
                information only as follows:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-7">
                <li>
                  <strong>Payment processors:</strong> to securely process
                  purchases and subscription billing.
                </li>
                <li>
                  <strong>Print fulfillment partner (Lulu):</strong> your
                  shipping information and the relevant order details are shared
                  with Lulu solely to produce and ship Print orders.
                </li>
                <li>
                  <strong>Cloud hosting and infrastructure providers:</strong>{" "}
                  who store and process data on our behalf under contractual
                  confidentiality and security obligations.
                </li>
                <li>
                  <strong>Analytics and email service providers:</strong> to
                  help us understand usage patterns and send communications,
                  under contracts limiting their use of your data to providing
                  services to us.
                </li>
                <li>
                  <strong>Legal and safety purposes:</strong> where required by
                  law, subpoena, or court order, or to protect the rights,
                  property, or safety of W.E. Books, our users, or the public.
                </li>
                <li>
                  <strong>Business transfers:</strong> in connection with a
                  merger, acquisition, financing, or sale of assets, subject to
                  standard confidentiality protections.
                </li>
              </ul>
              <p className="mt-2 pl-2">
                We do not share your individual reading/listening history or
                purchase history with authors; authors receive only aggregated
                or title-level sales and engagement data as described in our
                Author Terms of Service.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                5. Data Retention
              </h2>
              <p className="pl-2">
                We retain your account and transaction information for as long
                as your account is active and as needed to comply with our
                legal, tax, and accounting obligations (generally at least the
                retention period required for U.S. federal and Texas state tax
                recordkeeping). If you close your account, we will delete or
                anonymize personal information that is no longer needed for
                these purposes, except information we are required to retain by
                law.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="pl-2">
                We use cookies and similar technologies on our website for:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-7">
                <li>
                  <strong>Essential functionality:</strong> keeping you logged
                  in, remembering cart/checkout state;
                </li>
                <li>
                  <strong>Analytics:</strong> understanding how visitors use our
                  site, e.g., via tools like Google Analytics; and
                </li>
                <li>
                  <strong>Marketing:</strong> where you consent, to measure the
                  effectiveness of promotional campaigns.
                </li>
              </ul>
              <p className="mt-2 pl-2">
                You can control non-essential cookies through our cookie consent
                banner (where applicable) and through your browser settings.
                Disabling essential cookies may prevent parts of the Service
                from working properly.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                7. Your Privacy Rights
              </h2>
              <div className="space-y-4 pl-2">
                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    7.1 U.S. State Privacy Rights (e.g., California CCPA/CPRA,
                    and similar state laws)
                  </h3>
                  <p>
                    Depending on your state of residence, you may have the right
                    to:
                  </p>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5">
                    <li>
                      Know what personal information we have collected about you
                      and how it&apos;s used;
                    </li>
                    <li>
                      Request deletion of your personal information, subject to
                      certain legal exceptions;
                    </li>
                    <li>Correct inaccurate personal information;</li>
                    <li>
                      Opt out of the &quot;sale&quot; or &quot;sharing&quot; of
                      personal information (we do not sell personal information
                      for money; to the extent certain analytics/advertising
                      cookies are considered &quot;sharing&quot; under
                      applicable law, you can opt out via our cookie settings);
                      and
                    </li>
                    <li>
                      Not be discriminated against for exercising these rights.
                    </li>
                  </ul>
                  <p className="mt-2">
                    To exercise these rights, contact us at{" "}
                    <a
                      href="mailto:support@thewonderemporium.com"
                      className="font-semibold text-[var(--home-gold)] underline"
                    >
                      support@thewonderemporium.com
                    </a>
                    . We will verify your identity before fulfilling requests
                    involving access or deletion.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    7.2 GDPR/UK GDPR Rights (EEA/UK Users)
                  </h3>
                  <p>
                    If applicable to you, you may have the right to access,
                    correct, delete, restrict, or port your personal data, and
                    to object to certain processing. You also have the right to
                    lodge a complaint with your local data protection authority.
                    Contact us at{" "}
                    <a
                      href="mailto:support@thewonderemporium.com"
                      className="font-semibold text-[var(--home-gold)] underline"
                    >
                      support@thewonderemporium.com
                    </a>{" "}
                    to exercise these rights.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--home-ink)]">
                    7.3 Marketing Opt-Out
                  </h3>
                  <p>
                    You can unsubscribe from marketing emails at any time using
                    the unsubscribe link in those emails. You will still receive
                    transactional emails related to your account and purchases.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                8. Data Security
              </h2>
              <p className="pl-2">
                We use reasonable administrative, technical, and physical
                safeguards designed to protect your personal information,
                including encryption of payment data by our payment processor
                and access controls on internal systems. No method of
                transmission or storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                9. International Data Transfers
              </h2>
              <p className="pl-2">
                We are based in the United States, and information we collect is
                processed and stored in the United States. If you access the
                Service from outside the United States, your information will be
                transferred to, stored, and processed in the United States,
                which may have different data protection laws than your country
                of residence.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                10. Third-Party Links
              </h2>
              <p className="pl-2">
                The Service may contain links to third-party websites (including
                author social media or promotional links). This Privacy Policy
                does not apply to those third-party sites, and we encourage you
                to review their privacy practices separately.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                11. Changes to This Privacy Policy
              </h2>
              <p className="pl-2">
                We may update this Privacy Policy from time to time. We will
                post the updated policy with a new &quot;Last Updated&quot;
                date, and for material changes, provide notice via email or an
                in-app/site notice. Your continued use of the Service after
                changes take effect constitutes acceptance of the revised
                policy.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                12. Author-Specific Data Handling
              </h2>
              <p className="pl-2">
                If you are an author on the Platform, we additionally collect
                and process information necessary for royalty payments and tax
                compliance, including your banking routing/account numbers and
                tax identification information (W-9/W-8 forms), as described in
                our Author Terms of Service, Sections 6 and 8. This information
                is used solely for payment processing, tax reporting, and
                related compliance purposes, and is handled with the same
                security safeguards described in Section 8.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-3 border-t border-[var(--home-border)] pt-6">
              <h2 className="text-[20px] font-bold text-[var(--home-green-deep)]">
                13. Contact Us
              </h2>
              <p className="pl-2">
                If you have questions about this Privacy Policy or wish to
                exercise your privacy rights, contact us at:
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

            {/* Legal Review Note Box */}
            <div className="mt-8 border-l-4 border-[var(--home-gold)] bg-[#FAF8F5] p-5 text-[14px] leading-6 text-[var(--home-ink)]">
              <p className="font-bold text-[var(--home-gold)] uppercase tracking-wider text-[12px] mb-2">
                Legal Review & Compliance Note
              </p>
              <p>
                This document is a working draft prepared for The Wonder
                Emporium Inc. / W.E. Books and has not been reviewed by an
                attorney. Before publishing, please have counsel confirm: (1)
                whether CCPA/CPRA&apos;s specific thresholds apply to your
                business size and, if so, whether additional disclosures (like
                an annual privacy rights metrics report) are required; (2)
                whether you need a formal Data Processing Addendum with your
                payment processor, cloud host, and Lulu; and (3) whether your
                reading/listening analytics practices require an additional
                cookie or tracking-specific consent banner given your target
                states and countries.
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
