import axios from "axios";

import type { ApiEnvelope, AuthResponse, UserRole } from "../types/auth.types";

const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Extract<UserRole, "READER" | "AUTHOR">;
};

export const authApi = {
  register: async (input: RegisterInput) =>
    (await publicApi.post<AuthResponse>("/auth/register", input)).data,

  verifyEmail: async (input: { email: string; code: string }) =>
    (
      await publicApi.post<ApiEnvelope<{ message: string }>>(
        "/auth/verify-email",
        input,
      )
    ).data,

  resendVerification: async (email: string) =>
    (
      await publicApi.post<ApiEnvelope<{ message: string }>>(
        "/auth/resend-verification",
        { email },
      )
    ).data,

  forgotPassword: async (email: string) =>
    (
      await publicApi.post<ApiEnvelope<{ message: string }>>(
        "/auth/forgot-password",
        { email },
      )
    ).data,

  resendPasswordReset: async (email: string) =>
    (
      await publicApi.post<ApiEnvelope<{ message: string }>>(
        "/auth/resend-password-reset",
        { email },
      )
    ).data,

  verifyPasswordResetOtp: async (input: { email: string; otp: string }) =>
    (
      await publicApi.post<ApiEnvelope<{ message: string }>>(
        "/auth/verify-password-reset-otp",
        input,
      )
    ).data,

  resetPassword: async (input: {
    email: string;
    otp: string;
    password: string;
  }) =>
    (
      await publicApi.post<ApiEnvelope<{ message: string }>>(
        "/auth/reset-password",
        input,
      )
    ).data,
};

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    if (error.code === "ECONNABORTED") {
      return "The server took too long to respond. Please try again.";
    }
    return (
      error.response?.data?.message || "The request could not be completed."
    );
  }
  return error instanceof Error ? error.message : "Something went wrong.";
}
