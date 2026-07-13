export type AccountType = {
  id: "author" | "reader";
  title: string;
  description: string;
};

export type OtpDigit = {
  id: string;
  value?: string;
};
