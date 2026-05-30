import apiClient from "./client";
import type { Book } from "../types/book.types";

export interface BookFilters {
  title?: string;
  author?: string;
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getBooks = async (filters?: BookFilters): Promise<Book[]> => {
  const response = await apiClient.get("/books", { params: filters });
  return response.data;
};

export const getBookById = async (id: string): Promise<Book> => {
  const response = await apiClient.get(`/books/${id}`);
  return response.data;
};
