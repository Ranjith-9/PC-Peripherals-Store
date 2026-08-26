"use client";

import { ShoppingCart, Logs } from "lucide-react";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";
import type { Session } from "@/types/user";
import { useStore } from "@/providers/StoreProvider";
import Link from "next/link";

import { useRouter } from "next/navigation";

interface NavBarProps {
  session: Session | null;
  isAdmin?: boolean;
}

export default function NavBar({ session, isAdmin = false }: NavBarProps) {
  const router = useRouter();
  const { cartOpen, setCartOpen, cartItems, searchBarOpen } = useStore();

  return (
    <nav className="bg-[#171717] p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left */}
        <Link href="/shop/mouse">
          <div className="items-baseline">
            <span className="text-xl font-bold tracking-tight">
              GAMING STORE{" "}
              <span className="text-orange-300 text-[12px] font-bold">
                XYZ.LAB
              </span>{" "}
            </span>
          </div>
        </Link>
        {/* Middle */}
        {searchBarOpen && <SearchBar />}
        {/* Right */}
        <div className="flex items-center space-x-4">
          <div>
            {session?.user.image && (
              <img
                src={session.user.image}
                alt="User"
                className="rounded-full w-10 h-10"
              />
            )}
          </div>
          <LoginButton session={session} />
          {!isAdmin && (
            <>
              {session && (
                <Logs
                  className="cursor-pointer"
                  onClick={() => router.push("/orders/users")}
                />
              )}
              <div
                className="flex items-center gap-1 border border-white rounded px-2 py-1 cursor-pointer"
                onClick={() => setCartOpen(!cartOpen)}
              >
                <ShoppingCart className="text-white  w-6 h-6" />
                <span>{cartItems.length}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
