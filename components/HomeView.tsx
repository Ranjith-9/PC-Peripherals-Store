"use client";

import NavBar from "@/components/NavBar";
import ProductGrid from "@/components/ProductGrid";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import CartView from "./CartView";
import type { Filtertype } from "@/types/filter";
import SortBar from "./SortBar";

export default function Home({ session, initialProducts, categories }: any) {
  const [cartItems, setCartItems]: any = useState([]);

  const addToCart = (product: any) => {
    setCartItems((prevItems: any) => [...prevItems, product]);
  };

  const removeFromCart = (productId: any) => {
    setCartItems((prevItems: any) =>
      prevItems.filter((item: any) => item.id !== productId),
    );
  };

  const [cartOpen, setCartOpen] = useState(false);

  const [filters, setFilters] = useState<Filtertype>({
    category: [],
    sort: "latest",
    search: "",
  });

  return (
    <div>
      <NavBar
        session={session}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        cartItems={cartItems}
        setCartOpen={setCartOpen}
        cartOpen={cartOpen}
      />
      <div className="h-screen flex bg-gray-100">
        {/*Side bar*/}
        <div className="w-80 bg-gray-300">
          <SideBar
            categories={categories}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        {/*Main content*/}
        <div className="flex-1 bg-green-500">
          {/* Sort bar */}
          <div className="h-7 bg-pink-300">
            <SortBar filters={filters} setFilters={setFilters} />
          </div>
          {/* Product grid */}
          <div className="p-4">
            <ProductGrid
              addToCart={addToCart}
              productData={initialProducts}
              filters={filters}
            />
            {/* Cart */}
            <CartView cartOpen={cartOpen} setCartOpen={setCartOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Actions - Implement sorting
/*
1. Update the Filtertype to include a sort field (e.g., "latest", "price-asc", "price-desc").
2. In the SideBar component, add a new section for sorting options (e.g., a dropdown or radio buttons).
3. When the user selects a sorting option, update the filters state with the selected sort value.
4. In the ProductGrid component, modify the fetchProductsByCategory function to include the sort parameter when fetching products from the API.
5. Update the API endpoint to handle sorting based on the provided sort parameter and return products in the desired order.
*/
