import type { AccountType, OtpDigit } from "../types/auth.types";

export const accountTypes: AccountType[] = [
  {
    id: "author",
    title: "Join as Author",
    description: "Upload manuscripts, publish audiobooks, and manage revenue.",
  },
  {
    id: "reader",
    title: "Join as Reader",
    description: "Build your library, save favorites, and track orders.",
  },
];

export const demoOtpDigits: OtpDigit[] = [
  { id: "otp-1", value: "4" },
  { id: "otp-2", value: "2" },
  { id: "otp-3", value: "6" },
  { id: "otp-4" },
  { id: "otp-5" },
  { id: "otp-6" },
];
