"use client";
import type { Product } from "@/types/product";

interface ProductPanelProps {
  addToCart: (product: Product) => void;
  productData: Product;
}

export default function ProductPanel({
  addToCart,
  productData,
}: ProductPanelProps) {
  return (
    <div className="">
      <div
        className="
        bg-gray-200
        relative group
        w-72 h-[360px]
        rounded-md
        shadow-lg overflow-hidden
        hover:shadow-2xl
        transition-shadow duration-300
      "
      >
        {/* Image */}
        <div className="h-[260px] overflow-hidden">
          <img
            src={productData.imageUrl}
            alt={productData.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

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
            <button
              className="
        mt-4 w-full
        bg-black text-white
        py-2 rounded-xl
        hover:bg-gray-800
        transition-colors
      "
              onClick={() => addToCart(productData)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
