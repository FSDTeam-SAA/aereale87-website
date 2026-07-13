import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Download,
  Headphones,
  LockKeyhole,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

import { SiteHeader } from "@/components/shared/site/SiteHeader";
import { recommendedProducts } from "@/data/catalog";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";

import { cartBenefits, cartItems } from "../api/cart.data";

const benefitIcons = [Truck, CreditCard, Headphones, Download];

function toNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export function CartPage() {
  const subtotal = cartItems.reduce(
    (total, item) => total + toNumber(item.price) * item.quantity,
    0,
  );
  const discount = 24;
  const total = subtotal - discount;

  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/categories" />

      <section className="bg-[var(--home-paper)] px-5 py-12 text-center sm:px-8 lg:px-[120px]">
        <h1 className="text-[36px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[48px]">
          Your Reading Collection
        </h1>
        <p className="mx-auto mt-4 max-w-[720px] text-[16px] leading-[1.5] text-[var(--home-muted)] sm:text-[18px]">
          Review your selected books and audiobooks before proceeding to
          checkout.
        </p>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-[120px] lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-8 xl:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-[28px] font-bold leading-[1.2]">
                Shopping Cart
              </h2>
              <p className="text-[14px] text-[var(--home-muted)]">
                {cartItems.length} items
              </p>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.slug}
                  className="grid gap-4 border border-[var(--home-border)] bg-white p-4 sm:grid-cols-[104px_1fr_auto] sm:items-start"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="relative block h-[142px] w-[104px] overflow-hidden bg-[var(--home-paper)]"
                  >
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="104px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-[18px] font-bold leading-[1.25] transition hover:text-[var(--home-green)]"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-[14px] text-[var(--home-muted)]">
                      By {item.author}
                    </p>
                    <div className="mt-2 flex gap-1 text-[var(--home-gold)]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-3.5" />
                      ))}
                    </div>
                    <div className="mt-5 inline-grid h-9 grid-cols-3 border border-[var(--home-border)]">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.title} quantity`}
                        className="grid size-9 place-items-center text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="grid size-9 place-items-center border-x border-[var(--home-border)] text-[13px]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.title} quantity`}
                        className="grid size-9 place-items-center text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:block sm:text-right">
                    <p className="text-[16px] font-bold">{item.price}</p>
                    <button
                      type="button"
                      className="mt-0 text-[12px] font-semibold text-red-700 transition hover:text-red-900 sm:mt-16"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 border border-[var(--home-border)] bg-white p-4">
              <h3 className="text-[16px] font-bold">Have A Promo Code?</h3>
              <form className="mt-4 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="promo-code" className="sr-only">
                  Promo code
                </label>
                <input
                  id="promo-code"
                  placeholder="Enter Promo"
                  className="h-11 flex-1 border border-[var(--home-border)] px-4 text-[14px] outline-none transition placeholder:text-[var(--home-muted)] focus:border-[var(--home-gold)]"
                />
                <button
                  type="button"
                  className="h-11 bg-[var(--home-gold)] px-8 text-[12px] font-bold uppercase tracking-[0.52px] text-white transition hover:bg-[var(--home-green)]"
                >
                  Apply Code
                </button>
              </form>
            </div>
          </div>

          <aside className="h-fit border border-[var(--home-border)] bg-white p-6 xl:sticky xl:top-[112px]">
            <h2 className="text-[18px] font-bold">Order Summary</h2>
            <dl className="mt-6 space-y-4 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Subtotal</dt>
                <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Shipping</dt>
                <dd className="font-semibold">Calculated at Checkout</dd>
              </div>
              <div className="flex justify-between text-[var(--home-gold)]">
                <dt>Promo</dt>
                <dd>-${discount.toFixed(2)}</dd>
              </div>
              <div className="border-t border-[var(--home-border)] pt-4">
                <div className="flex justify-between text-[18px] font-bold">
                  <dt>Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <Link
                href="/checkout"
                className="flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
              >
                Proceed To Checkout
              </Link>
              <Link
                href="/categories"
                className="flex h-12 items-center justify-center border border-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="mt-6 space-y-3 bg-[var(--home-surface)] p-4 text-[13px] text-[var(--home-muted)]">
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[var(--home-gold)]" />
                Secure Checkout
              </p>
              <p className="flex items-center gap-2">
                <Truck className="size-4 text-[var(--home-gold)]" />
                Free Shipping over $50
              </p>
              <p className="flex items-center gap-2">
                <PackageCheck className="size-4 text-[var(--home-gold)]" />
                Hassle-free Returns
              </p>
              <p className="flex items-center gap-2">
                <LockKeyhole className="size-4 text-[var(--home-gold)]" />
                Protected Payment
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--home-paper)] px-5 py-14 sm:px-8 lg:px-[120px] lg:py-16">
        <div className="mx-auto max-w-[1440px]">
          <h2 className="text-center text-[28px] font-bold leading-[1.2] sm:text-[36px]">
            You May Also Like
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedProducts.map((product) => (
              <article
                key={product.slug}
                className="flex h-full flex-col border border-[var(--home-border)] bg-white p-3"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-[var(--home-surface)]"
                >
                  <Image
                    src={product.cover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </Link>
                <div className="mt-4 flex flex-1 flex-col">
                  <div className="flex gap-1 text-[var(--home-gold)]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-3" />
                    ))}
                  </div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-2 text-[15px] font-bold leading-[1.25] transition hover:text-[var(--home-green)]"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-[13px] text-[var(--home-muted)]">
                    {product.author}
                  </p>
                  <p className="mt-4 text-[15px] font-bold text-[var(--home-green)]">
                    {product.price}
                  </p>
                  <Link
                    href="/cart"
                    className="mt-4 flex h-10 items-center justify-center border border-[var(--home-gold)] text-[11px] font-bold uppercase tracking-[0.52px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
                  >
                    Add To Cart
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-8 lg:px-[120px]">
        <div className="mx-auto grid max-w-[1440px] gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cartBenefits.map((benefit, index) => {
            const Icon = benefitIcons[index];

            return (
              <div key={benefit.title} className="text-center">
                <Icon className="mx-auto size-8 text-[var(--home-gold)]" />
                <h3 className="mt-3 text-[15px] font-bold">{benefit.title}</h3>
                <p className="mx-auto mt-2 max-w-[220px] text-[13px] leading-[1.45] text-[var(--home-muted)]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <NewsletterSignup />
      <HomeFooter columns={footerColumns} />
    </main>
  );
}
