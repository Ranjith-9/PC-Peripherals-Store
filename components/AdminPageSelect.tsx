"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function AdminPageSelect() {
  const [activePage, setActivePage] = useState<"add" | "modify" | "orders">(
    "orders",
  );
  const router = useRouter();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-gray-100 p-4 text-black">
        <button
          onClick={() => {
            setActivePage("add");
            router.push("/admin/addproduct");
          }}
          className={`w-full rounded p-3 text-left ${
            activePage === "add"
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          Add Product
        </button>

        <button
          onClick={() => {
            setActivePage("modify");
            router.push("/admin/updateproduct/mouse");
          }}
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
    </div>
  );
}
