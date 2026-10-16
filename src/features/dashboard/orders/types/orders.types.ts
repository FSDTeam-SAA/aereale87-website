export type UserOrderItem = {
  id: string;
  bookId?: string;
  title: string;
  authorName?: string;
  category?: string;
  format: string;
  unitPrice?: string;
  quantity: number;
  totalPrice: string;
  cover: string;
};

export type UserOrderRecord = {
  id: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  subtotal: string;
  taxAmount: string;
  totalAmount: string;
  currency: string;
  createdAt: string;
  rawCreatedAt?: string;
  itemCount: number;
  items: UserOrderItem[];
};

export type UserOrdersData = {
  orders: UserOrderRecord[];
};
