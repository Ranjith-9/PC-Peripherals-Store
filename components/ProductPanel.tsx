"use client";
import { useStore } from "@/providers/StoreProvider";
import { Product } from "@prisma/client";
import { useState } from "react";
import Link from "next/link";
import AddProductForm from "./AddProductForm";

interface ProductPanelProps {
  productData: Product;
  isAdmin: boolean;
  onUpdate?: any;
  onDelete?: any;
}

export default function ProductPanel({
  productData,
  isAdmin,
  onUpdate,
  onDelete,
}: ProductPanelProps) {
  const { addToCart } = useStore();
  const { deleteProduct } = useStore();
  const [flag, setFlag] = useState(false);

  return (
    <div className="">
      {flag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[900px] h-[700px] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <AddProductForm
              isEdit={true}
              productDetails={productData}
              onClose={() => setFlag(false)}
              onUpdate={onUpdate}
            />
          </div>
        </div>
      )}

      <div
        className="
        bg-gray-200
        relative group
        w-full max-w-sm h-[360px]
        rounded-md
        shadow-lg overflow-hidden
        hover:shadow-2xl
        transition-shadow duration-300
      "
      >
        <Link href={`/shop/product/${productData.slug}`}>
          {/* Image */}
          <div className="h-[260px] overflow-hidden">
            <img
              src={productData.imageUrl}
              alt={productData.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Link>

        {/* Sliding Bottom Section */}
        <div
          className="
    absolute bottom-0 left-0 w-full
    bg-white p-5
  "
        >
          <div className="flex justify-between items-center min-h-[60px]">
            <h2 className="text-lg font-semibold text-gray-800">
              {productData.name}
            </h2>

            <span className="text-green-600 font-bold text-lg">
              ${productData.price}
            </span>
          </div>

          {/* Animated Button Area */}
          <div
            className="
      overflow-hidden
      max-h-0
      opacity-0

      group-hover:max-h-20
      group-hover:opacity-100

      transition-all duration-700
    "
          >
            {isAdmin ? (
              <div className="flex gap-2">
                <button
                  className="
        mt-4 w-full
        bg-black text-white
        py-2 rounded-xl
        hover:bg-gray-800
        transition-colors
        transition active:scale-95
      "
                  onClick={() => {
                    setFlag(true);
                  }}
                >
                  Update
                </button>
                <button
                  className="mt-4 w-full bg-red-800 text-white py-2 rounded-xl hover:bg-red-500 transition-colors transition active:scale-95"
                  onClick={() => {
                    deleteProduct(productData.id);
                    onDelete(productData.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition-colors transition active:scale-95"
                onClick={() => addToCart(productData)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
