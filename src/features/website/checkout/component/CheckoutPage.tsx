"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/shared/site/SiteHeader";
import { getCart } from "@/features/website/cart/api/cart.api";
import {
  fetchCatalogBooks,
  mapCatalogBookToProduct,
} from "@/features/website/catalog/api/catalog.api";
import { api } from "@/lib/api";

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

function toNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export function CheckoutPage() {
  const router = useRouter();
  const { status } = useSession();
  const cartQuery = useQuery({ queryKey: ["cart"], queryFn: getCart });
  const booksQuery = useQuery({
    queryKey: ["approved-books-checkout"],
    queryFn: () => fetchCatalogBooks({ limit: 100 }),
  });

  const books = useMemo(
    () => (booksQuery.data?.books ?? []).map(mapCatalogBookToProduct),
    [booksQuery.data],
  );

  const cartItems = useMemo(
    () =>
      (cartQuery.data?.items ?? []).map((item) => {
        const product = books.find((book) => book.slug === item.bookId);
        const selectedFormat = product?.formats.find(
          (format) => format.id === item.formatId,
        );
        return { ...item, product, selectedFormat };
      }),
    [books, cartQuery.data],
  );

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.selectedFormat?.price ?? item.product?.price ?? "$0.00";
    return total + toNumber(price) * item.quantity;
  }, 0);

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const origin = window.location.origin;
      const response = await api.post("/orders/checkout", {
        items: cartItems.map((item) => ({
          formatId: item.formatId,
          quantity: item.quantity,
        })),
        successUrl: `${origin}/checkout/success`,
        cancelUrl: `${origin}/checkout/cancel`,
      });
      return response.data?.data?.checkoutUrl ?? response.data?.checkoutUrl;
    },
    onSuccess: (checkoutUrl: string) => {
      window.location.href = checkoutUrl;
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Unable to start checkout.");
    },
  });

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
              We create a live Stripe checkout session from your current cart.
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
                  <p className="mt-5 text-[13px] text-[var(--home-muted)]">
                    Shipping details are not sent to the backend yet. Payment
                    status comes from Stripe webhook processing and order
                    history.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[24px] font-bold">02. Shipping Address</h2>
                <div className="mt-5 border border-[var(--home-border)] bg-white p-6">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field id="first-name" label="First Name" />
                    <Field id="last-name" label="Last Name" />
                    <Field id="city" label="City" />
                    <Field id="postal-code" label="Postal Code" />
                  </div>
                </div>
              </section>
            </form>
          </div>

          <aside className="border border-[var(--home-border)] bg-white xl:sticky xl:top-[112px]">
            <div className="flex items-center justify-between border-b border-[var(--home-border)] p-6">
              <h2 className="text-[20px] font-bold">Order Summary</h2>
              <p className="text-[13px] text-[var(--home-muted)]">
                {cartItems.length} Items
              </p>
            </div>

            <div className="space-y-5 p-6">
              {cartQuery.isLoading || booksQuery.isLoading ? (
                <p className="text-sm text-[var(--home-muted)]">
                  Loading cart...
                </p>
              ) : null}
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[72px_1fr_auto] gap-4"
                >
                  <div className="relative h-[92px] overflow-hidden bg-[var(--home-paper)]">
                    {item.product ? (
                      <Image
                        src={item.product.cover}
                        alt={item.product.title}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-bold leading-[1.2]">
                      {item.product?.title || "Book unavailable"}
                    </h3>
                    <p className="mt-2 text-[13px] text-[var(--home-muted)]">
                      {item.selectedFormat?.label || "Selected format"}
                    </p>
                    <p className="mt-4 text-[13px] font-semibold">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="pt-14 text-[14px] font-bold">
                    {item.selectedFormat?.price ||
                      item.product?.price ||
                      "$0.00"}
                  </p>
                </article>
              ))}
              <Link
                href="/cart"
                className="inline-flex text-[13px] text-[var(--home-gold)] transition hover:text-[var(--home-green)]"
              >
                Edit Cart
              </Link>
            </div>

            <dl className="space-y-4 border-y border-[var(--home-border)] p-6 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Shipping</dt>
                <dd>Calculated later</dd>
              </div>
              <div className="flex justify-between border-t border-[var(--home-border)] pt-4 text-[18px] font-bold">
                <dt>Total</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="space-y-3 px-6 pb-6 pt-6">
              <button
                type="button"
                onClick={() => {
                  if (status !== "authenticated") {
                    toast.error("Please sign in before checkout.");
                    router.push("/auth/login?callbackUrl=/checkout");
                    return;
                  }
                  if (!cartItems.length) {
                    toast.error("Your cart is empty.");
                    return;
                  }
                  checkoutMutation.mutate();
                }}
                disabled={checkoutMutation.isPending}
                className="h-14 w-full bg-[var(--home-gold)] px-6 text-[14px] font-bold uppercase tracking-[0.68px] text-white transition hover:bg-[var(--home-green)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkoutMutation.isPending
                  ? "Redirecting to Stripe..."
                  : "Complete Purchase"}
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
