"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "sonner";

import { SiteHeader } from "@/components/shared/site/SiteHeader";
import {
  HomeFooter,
  NewsletterSignup,
} from "@/features/website/homepage/component";
import { footerColumns } from "@/features/website/homepage/api/homepage.data";
import {
  fetchCatalogBooks,
  mapCatalogBookToProduct,
} from "@/features/website/catalog/api/catalog.api";
import { AddToCartButton } from "./AddToCartButton";
import { cartBenefits } from "../api/cart.data";
import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../api/cart.api";

const benefitIcons = [Truck, CreditCard, Headphones, Download];

function toNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export function CartPage() {
  const queryClient = useQueryClient();
  const cartQuery = useQuery({ queryKey: ["cart"], queryFn: getCart });
  const booksQuery = useQuery({
    queryKey: ["approved-books"],
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

  const quantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItemQuantity(itemId, quantity),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: () => toast.error("Unable to update cart item."),
  });
  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast.success("Removed from cart.");
      void queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Unable to remove cart item."),
  });
  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: () => toast.error("Unable to clear cart."),
  });

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.selectedFormat?.price ?? item.product?.price ?? "$0.00";
    return total + toNumber(price) * item.quantity;
  }, 0);

  return (
    <main className="bg-[var(--home-surface)] text-[var(--home-green-deep)]">
      <SiteHeader activeHref="/cart" />

      <section className="bg-[var(--home-paper)] px-5 py-12 text-center sm:px-8 lg:px-[120px]">
        <h1 className="text-[36px] font-bold leading-[1.15] text-[var(--home-green-deep)] sm:text-[48px]">
          Your Reading Collection
        </h1>
        <p className="mx-auto mt-4 max-w-[720px] text-[16px] leading-[1.5] text-[var(--home-muted)] sm:text-[18px]">
          Review your selected books and audiobooks before proceeding.
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
              {(cartQuery.isLoading || booksQuery.isLoading) && (
                <p className="border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
                  Loading cart...
                </p>
              )}
              {!cartQuery.isLoading &&
                !booksQuery.isLoading &&
                !cartItems.length && (
                  <p className="border border-dashed border-[var(--home-border)] bg-white p-8 text-center text-[var(--home-muted)]">
                    Your cart is empty.
                  </p>
                )}
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-4 border border-[var(--home-border)] bg-white p-4 sm:grid-cols-[104px_1fr_auto] sm:items-start"
                >
                  <Link
                    href={`/book/${item.bookId}`}
                    className="relative block h-[142px] w-[104px] overflow-hidden bg-[var(--home-paper)]"
                  >
                    {item.product ? (
                      <Image
                        src={item.product.cover}
                        alt={item.product.title}
                        fill
                        sizes="104px"
                        className="object-cover"
                      />
                    ) : null}
                  </Link>
                  <div className="min-w-0">
                    <Link
                      href={`/book/${item.bookId}`}
                      className="text-[18px] font-bold leading-[1.25] transition hover:text-[var(--home-green)]"
                    >
                      {item.product?.title || "Book unavailable"}
                    </Link>
                    <p className="mt-1 text-[14px] text-[var(--home-muted)]">
                      By {item.product?.author || "Unknown Author"}
                    </p>
                    <p className="mt-1 text-[12px] text-[var(--home-muted)]">
                      {item.selectedFormat?.label || "Selected format"}
                    </p>
                    <div className="mt-2 flex gap-1 text-[var(--home-gold)]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-3.5" />
                      ))}
                    </div>
                    <div className="mt-5 inline-grid h-9 grid-cols-3 border border-[var(--home-border)]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          quantityMutation.mutate({
                            itemId: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        }
                        className="grid size-9 place-items-center text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="grid size-9 place-items-center border-x border-[var(--home-border)] text-[13px]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          quantityMutation.mutate({
                            itemId: item.id,
                            quantity: item.quantity + 1,
                          })
                        }
                        className="grid size-9 place-items-center text-[var(--home-muted)] transition hover:text-[var(--home-green-deep)]"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-6 sm:block sm:text-right">
                    <p className="text-[16px] font-bold">
                      {item.selectedFormat?.price ||
                        item.product?.price ||
                        "$0.00"}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeMutation.mutate(item.id)}
                      className="mt-0 text-[12px] font-semibold text-red-700 transition hover:text-red-900 sm:mt-16"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-[var(--home-border)] bg-white p-6 xl:sticky xl:top-[112px]">
            <h2 className="text-[18px] font-bold">Cart Summary</h2>
            <dl className="mt-6 space-y-4 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-[var(--home-muted)]">Subtotal</dt>
                <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="border-t border-[var(--home-border)] pt-4">
                <div className="flex justify-between text-[18px] font-bold">
                  <dt>Total</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 space-y-3">
              <Link
                href="/checkout"
                className="flex h-12 items-center justify-center bg-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-white transition hover:bg-[var(--home-green)]"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/categories?view=shop"
                className="flex h-12 items-center justify-center border border-[var(--home-gold)] px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white"
              >
                Continue Shopping
              </Link>
              {cartItems.length ? (
                <button
                  type="button"
                  onClick={() => clearMutation.mutate()}
                  className="flex h-12 w-full items-center justify-center border border-red-200 px-6 text-[12px] font-bold uppercase tracking-[0.64px] text-red-700 transition hover:bg-red-50"
                >
                  Clear Cart
                </button>
              ) : null}
            </div>

            <div className="mt-6 space-y-3 bg-[var(--home-surface)] p-4 text-[13px] text-[var(--home-muted)]">
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[var(--home-gold)]" />
                Secure cart storage
              </p>
              <p className="flex items-center gap-2">
                <Truck className="size-4 text-[var(--home-gold)]" />
                Shipping will be calculated later
              </p>
              <p className="flex items-center gap-2">
                <PackageCheck className="size-4 text-[var(--home-gold)]" />
                Format availability shown per book
              </p>
              <p className="flex items-center gap-2">
                <LockKeyhole className="size-4 text-[var(--home-gold)]" />
                Checkout uses live Stripe session creation
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
            {books.slice(0, 4).map((product) => (
              <article
                key={product.slug}
                className="flex h-full flex-col border border-[var(--home-border)] bg-white p-3"
              >
                <Link
                  href={`/book/${product.slug}`}
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
                  <Link
                    href={`/book/${product.slug}`}
                    className="text-[15px] font-bold leading-[1.25] transition hover:text-[var(--home-green)]"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-[13px] text-[var(--home-muted)]">
                    {product.author}
                  </p>
                  <p className="mt-4 text-[15px] font-bold text-[var(--home-green)]">
                    {product.price}
                  </p>
                  <AddToCartButton
                    bookId={product.slug}
                    formatId={product.formats[0]?.id}
                    className="mt-4 flex h-10 items-center justify-center border border-[var(--home-gold)] text-[11px] font-bold uppercase tracking-[0.52px] text-[var(--home-gold)] transition hover:bg-[var(--home-gold)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  />
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
