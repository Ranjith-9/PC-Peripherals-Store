"use client";

import { signIn, signOut } from "next-auth/react";
import { UserRound } from "lucide-react";

export default function LoginButton({ session }: any) {
  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="font-mono text-md cursor-pointer"
      >
        Logout
      </button>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="flex gap-2">
      <div>
        <UserRound className="text-white w-8 h-8" />
      </div>
      <div className="flex flex-col items-start text-md font-mono justify-center cursor-pointer">
        <p>Login</p>
      </div>
    </button>
  );
}
