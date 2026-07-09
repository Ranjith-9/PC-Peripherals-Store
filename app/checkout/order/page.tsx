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

  const placeHolder = {
    status: "pending",
    paymentMethod: "PAYPAL",
    shippingMethod: "STANDARD",
    shippingAddress: {
      id: "cmr0qn7750008buxvu415ik9b",
      userId: "cmpguj5jp0000sy2e80kmj3x1",
      firstName: "Ranjith",
      lastName: "Ramesh",
      phone: "08870596277",
      addressLine1: "9Z SIS Meridian , 100 Ft Road , Velachery SIS Meridian",
      addressLine2: "",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600042",
      isDefault: false,
    },
    billingAddress: {
      id: "cmr0qn7750008buxvu415ik9b",
      userId: "cmpguj5jp0000sy2e80kmj3x1",
      firstName: "Ranjith",
      lastName: "Ramesh",
      phone: "08870596277",
      addressLine1: "9Z SIS Meridian , 100 Ft Road , Velachery SIS Meridian",
      addressLine2: "",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600042",
      isDefault: false,
    },
    totalAmount: 179.99,
    cartItems: [
      {
        productId: "cmp6kb9gk000zaibdunh3pc1k",
        quantity: 1,
        price: 179.99,
        subtotal: 179.99,
        imageUrl:
          "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  };

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
        <div className="h-screen flex justify-center items-center overflow-hidden">
          <div className=" w-[1000px] h-[90%] text-black p-10 shadow-2xl rounded-3xl">
            <div className="D1 h-[40%] flex flex-col">
              <div className="f1 flex flex-col items-center mt-10">
                <CircleCheck size={80} color="green" />
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
            <div className="D2 flex h-[60%]">
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
                      <div className=" flex justify-between p-5">
                        <div className="flex flex-col mt-2">
                          <span>Subtotal</span>
                          <span>Shipping</span>
                          <span>Tax</span>
                          <span>Total</span>
                        </div>
                        <div className="mt-2">
                          <div>{placedOrder.totalAmount}</div>
                          <div>Free</div>
                          <div>
                            {(placedOrder.totalAmount * 0.1).toFixed(2)}
                          </div>
                          <div>
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
                  <button className="flex justify-center items-center bg-gray-700 w-full rounded-md h-12 text-white font-bold shadow-xl">
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
