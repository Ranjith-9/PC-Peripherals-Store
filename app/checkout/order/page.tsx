"use client";
import { useStore } from "@/providers/StoreProvider";
import {
  CircleCheck,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function orderPage() {
  const { placedOrder } = useStore();

  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    if (!placedOrder) return;

    const fetchProducts = async () => {
      const response = await fetch("/api/product", {
        method: "POST",
        body: JSON.stringify(placedOrder),
      });

      const products = await response.json();

      const lookup = new Map(products.map((p: any) => [p.id, p]));

      setOrderItems(
        placedOrder.cartItems.map((item: any) => ({
          ...item,
          ...lookup.get(item.productId)!,
        })),
      );
    };

    fetchProducts();
  }, [placedOrder]);

  if (placedOrder) {
    return (
      <>
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
          <div className="w-full max-w-[1000px] text-black rounded-2xl border border-gray-100 shadow-xl bg-white overflow-hidden">
            <div className="D1 flex flex-col border-b border-gray-100 bg-gradient-to-b from-green-50/60 to-white">
              <div className="f1 flex flex-col items-center pt-12">
                <div className="absolute w-36 h-36 rounded-full bg-green-300/20 blur-3xl" />
                <div className="relative w-16 h-16 rounded-full bg-white shadow-md ring-1 ring-green-100 flex items-center justify-center">
                  <CircleCheck className="text-green-600 w-8 h-8" />
                </div>

                <h1 className="mt-4 text-xs font-semibold tracking-wide text-green-700 uppercase">
                  Payment Successful
                </h1>
              </div>
              <div className="f2 flex flex-col items-center mt-3">
                <h1 className="font-bold text-3xl md:text-4xl text-gray-900 text-center">
                  Thank you for your order!
                </h1>
              </div>
              <div className="f3 flex flex-col items-center mt-3 text-sm text-gray-500 text-center px-6">
                Order "#sd10220" has been placed successfully and is now being
                processed
              </div>
              <div className="f4 flex flex-col items-center mt-8 mb-10 text-xs text-gray-400 italic">
                WORK IN PROGRESS FOR TRACK
              </div>
            </div>
            <div className="D2 flex flex-col md:flex-row gap-6 p-6 md:p-10 bg-white">
              <div className="d1 w-full md:w-[70%]">
                <div className="rounded-xl w-full border border-gray-100 shadow-sm overflow-hidden">
                  <div className="k1 font-semibold text-base border-b border-gray-100 p-4 bg-gray-50 text-gray-800">
                    Order Items
                  </div>
                  {placedOrder ? (
                    <>
                      <div className="divide-y divide-gray-100">
                        {orderItems.map((product, index) => (
                          <div key={index} className="px-4 py-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden mr-4 shrink-0">
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium text-gray-900">
                                    {product.name}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    Quantity: {product.quantity}
                                  </span>
                                </div>
                              </div>

                              <div className="font-medium text-gray-900">
                                {product.price}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col bg-gray-50/60">
                        <div className="flex justify-between px-4 py-4 text-sm">
                          <div className="flex flex-col gap-1 text-gray-500">
                            <span>Subtotal</span>
                            <span>Shipping</span>
                            <span>Tax</span>
                          </div>
                          <div className="flex flex-col gap-1 text-gray-700 text-right">
                            <div>{placedOrder.totalAmount}</div>
                            <div>Free</div>
                            <div>
                              {(placedOrder.totalAmount * 0.1).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center px-4 py-4 bg-green-50 border-t border-green-100">
                          <span className="font-semibold text-gray-900">
                            Total
                          </span>
                          <div className="font-bold text-green-700">
                            {(placedOrder.totalAmount * 1.1).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <> null </>
                  )}
                </div>
              </div>
              <div className="d2 w-full md:w-[30%] flex flex-col gap-4">
                <div className="rounded-xl border border-gray-100 shadow-sm bg-white p-5">
                  <div className="font-semibold text-gray-800 mb-2">
                    Shipping Address
                  </div>
                  <div className="text-sm text-gray-500 leading-relaxed">
                    {placedOrder.shippingAddress.addressLine1},{" "}
                    {placedOrder.shippingAddress.addressLine2
                      ? placedOrder.shippingAddress.addressLine2
                      : null}
                    {placedOrder.shippingAddress.city},
                    {placedOrder.shippingAddress.state}
                    <div>{placedOrder.shippingAddress.postalCode}</div>
                  </div>
                </div>
                <div className="g2 rounded-xl border border-gray-100 shadow-sm bg-white p-5">
                  <div className="font-semibold text-gray-800 mb-2">
                    Payment Method
                  </div>
                  <div className="text-sm text-gray-500">
                    {placedOrder.paymentMethod}
                  </div>
                </div>
                <div className="g3">
                  <button className="flex justify-center items-center bg-green-700 hover:bg-green-800 transition-colors w-full rounded-lg h-12 text-white font-semibold shadow-sm">
                    <span className="mr-2">Track your order</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="g4 flex justify-between gap-3">
                  <button className="flex-1 flex border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg py-2 px-3 justify-center items-center text-sm text-gray-700">
                    <Download size={15} />
                    <span className="px-2">Receipt</span>
                  </button>
                  <button className="flex-1 flex border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg py-2 px-3 justify-center items-center text-sm text-gray-700">
                    <ExternalLink size={15} />
                    <span className="px-2">Support</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
