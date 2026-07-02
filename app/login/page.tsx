"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();

  const callbackUrl = params.get("callbackUrl") || "/";

  return (
    <button onClick={() => signIn("google", { callbackUrl })}>
      Continue with Google
    </button>
  );
}
