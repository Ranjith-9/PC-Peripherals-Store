"use client";

import { signIn, signOut } from "next-auth/react";
import { UserRound } from "lucide-react";

export default function LoginButton({ session }: any) {
  if (session) {
    return <button onClick={() => signOut()}>Logout</button>;
  }

  return (
    <button onClick={() => signIn("google")} className="flex gap-2">
      <div>
        <UserRound className="text-white" size={35} />
      </div>
      <div className="flex flex-col items-start text-sm">
        <p>Login</p>
        <p>Account</p>
      </div>
    </button>
  );
}
