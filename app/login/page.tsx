"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const params = useSearchParams();

  const callbackUrl = params.get("callbackUrl") || "/";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6 text-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center">Continue to Checkout</h1>

        <p className="mt-3 text-center text-gray-600">
          Sign in to securely access your cart, saved addresses and orders.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 py-3 font-medium transition hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <ShieldCheck size={18} />
          Secure authentication powered by Google
        </div>

        <Link
          href="/shop"
          className="mt-8 block text-center text-sm text-blue-600 hover:underline"
        >
          ← Continue Shopping
        </Link>
      </div>
    </main>
  );
}
