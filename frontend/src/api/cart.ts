import apiClient from "./client";
import type { Cart } from "../types/cart.types";

export const getCart = async (): Promise<Cart> => {
  const response = await apiClient.get("/cart")
  return response.data;
};
