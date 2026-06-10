"use client";
import { useStore } from "@/providers/StoreProvider";
import { Product } from "@prisma/client";
import { useState } from "react";

export default function ProductView({ Product }: { Product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useStore();

  const attributes =
    Product.attributes && typeof Product.attributes === "object"
      ? Object.entries(Product.attributes as Record<string, any>)
      : [];

  const addToCart = (product: Product) => {
    setCartItems((prevItems: any[]) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.id,
      );

      // Product already exists
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }
      // New product
      return [
        ...prevItems,
        {
          productId: product.id,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 text-gray-800">
      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="border rounded-2xl overflow-hidden bg-white">
          <img
            src={Product.imageUrl}
            alt={Product.name}
            className="w-full h-[500px] object-cover p-6"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {Product.category}
            </p>

            <h1 className="text-4xl font-bold mt-2">{Product.name}</h1>
          </div>

          <div>
            <p className="text-4xl font-bold text-blue-600">
              ₹{Product.price.toLocaleString()}
            </p>
          </div>

          <div>
            {Product.stock > 0 ? (
              <div className="text-green-600 font-semibold">
                In Stock ({Product.stock} available)
              </div>
            ) : (
              <div className="text-red-500 font-semibold">Out Of Stock</div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-10 h-10 border rounded-lg"
            >
              -
            </button>

            <span className="text-lg font-semibold">{quantity}</span>

            <button
              onClick={() =>
                setQuantity((prev) => Math.min(Product.stock, prev + 1))
              }
              className="w-10 h-10 border rounded-lg"
            >
              +
            </button>
          </div>

          {/* Add To Cart */}
          <button
            onClick={() => addToCart(Product)}
            className="
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-semibold
              py-4
              rounded-xl
              transition
            "
          >
            Add To Cart
          </button>

          {/* Buy Now */}
          <button
            className="
              bg-black
              text-white
              font-semibold
              py-4
              rounded-xl
            "
          >
            Buy Now
          </button>

          {/* Availability */}
          <div className="border-t pt-6">
            <div className="flex justify-between">
              <span className="font-medium">Availability</span>

              <span
                className={
                  Product.stock > 0 ? "text-green-600" : "text-red-500"
                }
              >
                {Product.stock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6">Description</h2>

        <div className="bg-white border rounded-2xl p-6">
          <p className="leading-8 text-gray-700">{Product.description}</p>
        </div>
      </section>

      {/* Specifications */}
      {attributes.length > 0 && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Specifications</h2>

          <div className="bg-white border rounded-2xl overflow-hidden">
            {attributes.map(([key, value]) => (
              <div
                key={key}
                className="
                  flex
                  justify-between
                  px-6
                  py-4
                  border-b
                  last:border-b-0
                "
              >
                <span className="font-medium capitalize">{key}</span>

                <span className="text-gray-600">{String(value)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
