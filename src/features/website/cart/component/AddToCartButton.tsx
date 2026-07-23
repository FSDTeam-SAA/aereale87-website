"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addCartItem } from "../api/cart.api";

type AddToCartButtonProps = {
  bookId: string;
  formatId?: string;
  quantity?: number;
  className: string;
  children?: React.ReactNode;
};

function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("401") || msg.includes("unauthorized")) return true;
  }
  const axiosLike = error as {
    response?: { status?: number };
    status?: number;
  };
  if (axiosLike?.response?.status === 401 || axiosLike?.status === 401)
    return true;
  return false;
}

export function AddToCartButton({
  bookId,
  formatId,
  quantity = 1,
  className,
  children = "Add To Cart",
}: AddToCartButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      if (!bookId || !formatId) {
        throw new Error("This book has no available format.");
      }
      return addCartItem({ bookId, formatId, quantity });
    },
    onSuccess: () => {
      toast.success("Added to cart.");
      void queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast.error("Please login to add items to cart.");
        router.push("/auth/login");
        return;
      }
      const message =
        error instanceof Error ? error.message : "Unable to add to cart.";
      toast.error(message);
    },
  });

  return (
    <button
      type="button"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending || !bookId || !formatId}
      className={className}
    >
      {mutation.isPending ? "Adding..." : children}
    </button>
  );
}
