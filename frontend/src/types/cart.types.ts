import type { Book } from "./book.types";

export type CartStatus = "active" | "completed";

export interface Cart {
  id: string;
  status: CartStatus;
  createdAt: string;
  updatedAt: string;
  cartItems: CartItem[];
}

export interface CartItem {
  id: string;
  bookId: string;
  quantity: number;
  priceAtAdded: string;
  createdAt: string;
  book?: Book;
}
