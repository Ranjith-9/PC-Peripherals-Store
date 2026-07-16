"use client";

import { useEffect, useState } from "react";
import AddProductForm from "./AddProductForm";
import UpdateProducts from "./UpdateProducts";
import type { Product } from "@prisma/client";
import OrderUpdates from "./OrderUpdates";
import { useStore } from "@/providers/StoreProvider";

interface AdminDashboardProps {
  initialProducts: Product[];
  categories: string[];
}

export default function AdminDashboard({
  initialProducts,
  categories,
}: AdminDashboardProps) {
  const [activePage, setActivePage] = useState<"add" | "modify" | "orders">(
    "orders",
  );

  const { setSearchBarOpen } = useStore();

  useEffect(() => {
    if (activePage === "modify") {
      setSearchBarOpen(true);
    } else {
      setSearchBarOpen(false);
    }
  }, [activePage]);

  // useEffect(() => {
  //   async function getOrders() {
  //     const res = await fetch("/api/order", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const result = await res.json();
  //     console.log("result from useEffect", result);
  //   }
  //   getOrders();
  // }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-100 p-4 text-black">
        <button
          onClick={() => setActivePage("add")}
          className={`w-full rounded p-3 text-left ${
            activePage === "add"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          Add Product
        </button>

        <button
          onClick={() => setActivePage("modify")}
          className={`mt-2 w-full rounded p-3 text-left ${
            activePage === "modify"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          Modify Products
        </button>

        <button
          onClick={() => setActivePage("orders")}
          className={`mt-2 w-full rounded p-3 text-left ${
            activePage === "orders"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          Orders
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className={activePage === "add" ? "block" : "hidden"}>
          <AddProductForm isEdit={false} />
        </div>

        <div className={activePage === "modify" ? "block" : "hidden"}>
          <UpdateProducts
            initialProducts={initialProducts}
            categories={categories}
          />
        </div>

        <div className={activePage === "orders" ? "block" : "hidden"}>
          <OrderUpdates />
        </div>
      </main>
    </div>
  );
}
