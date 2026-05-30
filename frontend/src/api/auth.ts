import apiClient from "./client";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/auth.types";

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
};
