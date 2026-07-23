import { Suspense } from "react";
import { EnterOtpPage } from "@/features/website/auth/component/EnterOtpPage";

export default function VerifyOtp() {
  return (
    <Suspense fallback={null}>
      <EnterOtpPage />
    </Suspense>
  );
}
