export type AccountType = {
  id: "author" | "reader";
  title: string;
  description: string;
};

export type UserRole = "READER" | "AUTHOR" | "ADMIN" | "SUPERADMIN";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  verified: boolean;
  firstName?: string;
  lastName?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type AuthResponse = ApiEnvelope<{
  tokens: AuthTokens;
  user: AuthUser;
}>;

export type OtpDigit = {
  id: string;
  value?: string;
};
