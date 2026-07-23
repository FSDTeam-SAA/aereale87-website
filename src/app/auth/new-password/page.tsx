import { Suspense } from "react";
import { NewPasswordPage } from "@/features/website/auth/component/NewPasswordPage";

export default function NewPassword() {
  return (
    <Suspense fallback={null}>
      <NewPasswordPage />
    </Suspense>
  );
}
