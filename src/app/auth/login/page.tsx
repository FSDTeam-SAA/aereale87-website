import { Suspense } from "react";
import { LoginPage } from "@/features/website/auth/component/LoginPage";

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
}
