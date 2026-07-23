export type UserOrderItem = {
  id: string;
  title: string;
  format: string;
  quantity: number;
  totalPrice: string;
  cover: string;
};

export type UserOrderRecord = {
  id: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  totalAmount: string;
  createdAt: string;
  items: UserOrderItem[];
};

export type UserOrdersData = {
  orders: UserOrderRecord[];
};
