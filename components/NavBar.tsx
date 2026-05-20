"use client";

import { ShoppingCart, UserRound } from "lucide-react";
import LoginButton from "./LoginButton";
import SearchBar from "./SearchBar";

export default function NavBar({
  session,
  addToCart,
  removeFromCart,
  cartItems,
  setCartOpen,
  filters,
  setFilters,
  cartOpen,
}: any) {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left */}
        <div>Gaming Store XYZ</div>
        {/* Middle */}
        <SearchBar filters={filters} setFilters={setFilters} />
        {/* Right */}
        <div className="flex items-center space-x-4">
          <div>
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt="User"
                className="rounded-full w-10 h-10"
              />
            )}
          </div>
          <LoginButton session={session} />
          <ShoppingCart
            className="text-white cursor-pointer"
            size={35}
            onClick={() => setCartOpen(!cartOpen)}
          />
          <span>{cartItems.length}</span>
        </div>
      </div>
    </nav>
  );
}
