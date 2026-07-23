import { CreateAccount } from "@/features/website/auth/component/CreateAccount";
import { Suspense } from "react";

export default function Register() {
  return (
    <Suspense fallback={null}>
      <CreateAccount />
    </Suspense>
  );
}
