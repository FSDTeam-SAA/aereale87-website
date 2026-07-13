import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/shared/site/SiteHeader";

import { checkoutItems, checkoutTotals } from "../api/checkout.data";

function Field({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-[12px] font-semibold text-[var(--home-green-deep)]">
        {label}
      </span>
      <input
        id={id}
        placeholder={placeholder}
        className="mt-2 h-11 w-full border border-[var(--home-border)] bg-white px-4 text-[14px] outline-none transition placeholder:text-[var(--home-muted)] focus:border-[var(--home-gold)]"
      />
    </label>
  );
}

function SelectField({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-[12px] font-semibold text-[var(--home-green-deep)]">
        {label}
      </span>
      <select
        id={id}
        defaultValue={value}
        className="mt-2 h-11 w-full border border-[var(--home-border)] bg-white px-4 text-[14px] text-[var(--home-green-deep)] outline-none transition focus:border-[var(--home-gold)]"
      >
        <option>{value}</option>
      </select>
    </label>
  );
}

export function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/cart" />

      <section className="px-5 py-12 sm:px-8 lg:px-[120px] lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 xl:grid-cols-[1fr_410px] xl:items-start">
          <div>
            <h1 className="text-[40px] font-bold leading-[1.1] sm:text-[54px]">
              Complete Your Order
            </h1>
            <p className="mt-4 text-[18px] leading-[1.45] text-[var(--home-muted)] sm:text-[24px]">
              You&apos;re just one step away from discovering your next great
              story.
            </p>

            <form className="mt-10 space-y-10">
              <section>
                <h2 className="text-[24px] font-bold">
                  01. Contact Information
                </h2>
                <div className="mt-5 border border-[var(--home-border)] bg-white p-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      id="email"
                      label="Email Address"
                      placeholder="reader@example.com"
                    />
                    <Field
                      id="phone"
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <label className="mt-5 flex items-center gap-3 text-[13px] text-[var(--home-muted)]">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="size-4 accent-[var(--home-gold)]"
                    />
                    Keep me up to date on news, author events, and exclusive
                    literary offers.
                  </label>
                </div>
              </section>

              <section>
                <h2 className="text-[24px] font-bold">02. Shipping Address</h2>
                <div className="mt-5 border border-[var(--home-border)] bg-white p-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field id="first-name" label="First Name" />
                    <Field id="last-name" label="Last Name" />
                  </div>
                  <div className="mt-5">
                    <Field
                      id="street-address"
                      label="Street Address"
                      placeholder="123 Literary Lane"
                    />
                  </div>
                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <SelectField
                      id="country"
                      label="Country"
                      value="United States"
                    />
                    <Field id="city" label="City" />
                    <SelectField
                      id="state"
                      label="State / Province"
                      value="New York"
                    />
                    <Field id="postal-code" label="Postal Code" />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-[24px] font-bold">03. Delivery Method</h2>
                <label className="mt-5 flex max-w-[360px] cursor-pointer items-start justify-between gap-5 border border-[var(--home-gold)] bg-white p-5">
                  <span>
                    <span className="block text-[16px] font-bold">Digital</span>
                    <span className="mt-2 block text-[13px] text-[var(--home-muted)]">
                      Instant Access
                    </span>
                    <span className="mt-5 block text-[15px] font-bold">
                      Free
                    </span>
                  </span>
                  <input
                    type="radio"
                    name="delivery"
                    defaultChecked
                    className="mt-1 size-4 accent-[var(--home-gold)]"
                  />
                </label>
              </section>
            </form>
          </div>

          <aside className="border border-[var(--home-border)] bg-white xl:sticky xl:top-[112px]">
            <div className="flex items-center justify-between border-b border-[var(--home-border)] p-6">
              <h2 className="text-[20px] font-bold">Order Summary</h2>
              <p className="text-[13px] text-[var(--home-muted)]">
                {checkoutItems.length} Items
              </p>
            </div>

            <div className="space-y-5 p-6">
              {checkoutItems.map((item) => (
                <article
                  key={item.slug}
                  className="grid grid-cols-[72px_1fr_auto] gap-4"
                >
                  <div className="relative h-[92px] overflow-hidden bg-[var(--home-paper)]">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-bold leading-[1.2]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-[var(--home-muted)]">
                      {item.format}
                    </p>
                    <p className="mt-4 text-[13px] font-semibold">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="pt-14 text-[14px] font-bold">{item.price}</p>
                </article>
              ))}
              <Link
                href="/cart"
                className="inline-flex text-[13px] text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
              >
                Edit Cart
              </Link>
            </div>

            <div className="border-y border-[var(--home-border)] p-6">
              <form className="flex gap-3">
                <label htmlFor="checkout-promo" className="sr-only">
                  Promo code
                </label>
                <input
                  id="checkout-promo"
                  placeholder="Promo code"
                  className="h-11 min-w-0 flex-1 border border-[var(--home-border)] px-4 text-[14px] outline-none transition placeholder:text-[var(--home-muted)] focus:border-[var(--home-gold)]"
                />
                <button
                  type="button"
                  className="h-11 bg-[var(--home-paper)] px-5 text-[12px] font-bold transition hover:bg-[var(--home-gold)] hover:text-white"
                >
                  Apply
                </button>
              </form>
            </div>

            <dl className="space-y-4 p-6 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Subtotal</dt>
                <dd>{checkoutTotals.subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Shipping</dt>
                <dd>{checkoutTotals.shipping}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Tax</dt>
                <dd>{checkoutTotals.tax}</dd>
              </div>
              <div className="flex justify-between border-t border-[var(--home-border)] pt-4 text-[18px] font-bold">
                <dt>Total</dt>
                <dd>{checkoutTotals.total}</dd>
              </div>
            </dl>

            <div className="space-y-3 px-6 pb-6">
              <button
                type="button"
                className="h-14 w-full bg-[var(--home-gold)] px-6 text-[14px] font-bold uppercase tracking-[0.68px] text-white transition hover:bg-[var(--home-green)]"
              >
                Complete Purchase
              </button>
              <Link
                href="/cart"
                className="flex h-14 items-center justify-center border border-[var(--home-gold)] px-6 text-[14px] font-bold uppercase tracking-[0.68px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
              >
                Cancel
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
