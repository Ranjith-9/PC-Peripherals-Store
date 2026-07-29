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

      const lookup = new Map(products.map((p) => [p.id, p]));

      setOrderItems(
        placedOrder.cartItems.map((item) => ({
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
        <div className="h-screen flex justify-center items-center overflow-hidden rounded-3xl">
          <div className=" w-[1000px] text-black shadow-2xl rounded-3xl bg-gradient-to-br from-white via-green-50 to-white">
            <div className="D1 h-[40%] flex flex-col border  rounded-t-xl shadow-xl border-gray-300">
              <div className="f1 flex flex-col items-center mt-10">
                <div className="absolute w-36 h-36 rounded-full bg-green-300/30  blur-3xl" />
                <div className="relative w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center ">
                  <CircleCheck className="text-green-600 w-17 h-17" />
                </div>

                <h1>Payment Successful</h1>
              </div>
              <div className="f2 flex flex-col items-center mt-10">
                <h1 className="font-bold text-4xl">
                  Thank you for your order!
                </h1>
              </div>
              <div className="f3 flex flex-col items-center mt-2">
                Order "#sd10220" has been placed Successfully and is now being
                processed
              </div>
              <div className="f4 flex flex-col items-center mt-12">
                WORK IN PROGRESS FOR TRACK
              </div>
            </div>
            <div className="D2 flex h-[60%] p-10 bg-white overflow-hidden rounded-b-xl">
              <div className="d1 w-[70%] p-5 mt-2 ">
                <div className="rounded-xl  w-full shadow-2xl  overflow-hidden">
                  <div className="k1 font-bold text-xl border-b p-5 bg-gray-300">
                    {" "}
                    Order Items
                  </div>
                  {placedOrder ? (
                    <>
                      {orderItems.map((product, index) => (
                        <div
                          key={index}
                          className="px-5 pt-2 border-b last: border-b-0"
                        >
                          <div className="flex justify-between">
                            <div className="flex">
                              <div className="w-20 h-20 bg-gray-100 flex items-center overflow-hidden mr-3">
                                {" "}
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="flex flex-col mt-2">
                                <div> {product.name}</div>
                                <div> Quanity : {product.quantity}</div>
                              </div>
                            </div>

                            <div className="mt-2">{product.price}</div>
                          </div>
                        </div>
                      ))}
                      <div className="flex flex-col">
                        {" "}
                        <div className=" flex justify-between p-5">
                          <div className="flex flex-col mt-2">
                            <span>Subtotal</span>
                            <span>Shipping</span>
                            <span>Tax</span>
                          </div>
                          <div className="mt-2">
                            <div>{placedOrder.totalAmount}</div>
                            <div>Free</div>
                            <div>
                              {(placedOrder.totalAmount * 0.1).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between p-5 bg-green-100">
                          {" "}
                          <span>Total</span>{" "}
                          <div>
                            {(placedOrder.totalAmount * 1.1).toFixed(2)}
                          </div>{" "}
                        </div>
                      </div>
                    </>
                  ) : (
                    <> null </>
                  )}
                </div>
              </div>
              <div className="d2 w-[30%] p-2 mt-5">
                <div className=" rounded-md bg-white shadow-xl py-1 px-4">
                  <div className="py-4 font-bold">Shipping Address</div>{" "}
                  <div>
                    {placedOrder.shippingAddress.addressLine1},{" "}
                    {placedOrder.shippingAddress.addressLine2
                      ? placedOrder.shippingAddress.addressLine2
                      : null}
                    {placedOrder.shippingAddress.city},
                    {placedOrder.shippingAddress.state}
                    <div>{placedOrder.shippingAddress.postalCode}</div>
                  </div>
                </div>
                <div className="g2 rounded-md bg-white shadow-xl mt-5 px-4">
                  <div className="font-bold py-3">Payment Method</div>
                  <div className="pb-3">{placedOrder.paymentMethod}</div>
                </div>
                <div className="g3 mt-6">
                  <button className="flex justify-center items-center bg-green-700 w-full rounded-md h-12 text-white font-bold shadow-xl">
                    <span className="mr-2">Track your order</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="g4 mt-3">
                  <div className="flex justify-between">
                    <button className="flex border rounded-md py-1 px-2 justify-center items-center shadow-xl">
                      <Download size={15} />{" "}
                      <span className="px-2">Receipt</span>
                    </button>
                    <button className="flex border rounded-md py-1 px-2 justify-center items-center shadow-xl">
                      <ExternalLink size={15} />{" "}
                      <span className="px-2">Support</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
