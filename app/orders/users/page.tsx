"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Package, CreditCard, MapPin } from "lucide-react";

import type { Orders } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [expandedOrders, setExpandedOrders] = useState(new Set<string>());

  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/user/order");

      if (!res.ok) return;

      const data = await res.json();

      setOrders(data);
    }

    fetchOrders();
  }, []);

  const toggleOrder = (id: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);

      if (next.has(id)) next.delete(id);
      else next.add(id);

      return next;
    });
  };

  const statusColor = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PROCESSING: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div className="mx-auto max-w-7xl p-8 text-black">
      <h1 className="mb-8 text-4xl font-bold">My Orders</h1>

      {orders.length === 0 && (
        <div className="rounded-xl border bg-white p-12 text-center text-gray-500">
          No orders yet.
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id}>
          <div
            key={order.id}
            className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            {/* Header */}

            <button
              onClick={() => toggleOrder(order.id)}
              className="flex w-full items-center justify-between p-6 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-5">
                <div className="rounded-xl bg-blue-100 p-3">
                  <Package className="h-7 w-7 text-blue-600" />
                </div>

                <div className="text-left">
                  <h2 className="text-xl font-semibold">
                    Order #{order.id.slice(-8).toUpperCase()}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {/* Status */}

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    statusColor[order.status as keyof typeof statusColor]
                  }`}
                >
                  {order.status}
                </span>

                {/* Number of Items */}

                <div className="hidden text-center md:block">
                  <p className="text-sm text-gray-500">Items</p>

                  <p className="font-semibold">{order.items.length}</p>
                </div>

                {/* Total */}

                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>

                  <p className="text-xl font-bold">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>

                {/* Arrow */}

                <ChevronDown
                  className={`h-6 w-6 transition-transform duration-300 ${
                    expandedOrders.has(order.id) ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Expanded section goes here */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedOrders.has(order.id) ? "max-h-[3000px]" : "max-h-0"
              }`}
            >
              <div className="border-t bg-gray-50 p-6">
                {/* Order Items */}

                <h3 className="mb-5 text-xl font-semibold">Order Items</h3>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-5 rounded-xl border bg-white p-4"
                    >
                      <div className="relative h-24 w-24 overflow-hidden rounded-lg border">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="object-cover h-24 w-24"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">
                            {item.product.name}
                          </h4>

                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.description}
                          </p>
                        </div>

                        <div className="mt-3 flex justify-between text-sm">
                          <div className="flex gap-6">
                            <p>
                              Qty:
                              <span className="ml-1 font-semibold">
                                {item.quantity}
                              </span>
                            </p>

                            <p>
                              Unit Price:
                              <span className="ml-1 font-semibold">
                                ₹{item.unitPrice.toFixed(2)}
                              </span>
                            </p>
                          </div>

                          <p className="text-lg font-bold">
                            ₹{item.subtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom */}

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  {/* Shipping */}

                  <div className="rounded-xl border bg-white p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />

                      <h3 className="text-lg font-semibold">
                        Shipping Address
                      </h3>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="font-semibold text-black">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>

                      <p>{order.shippingAddress.addressLine1}</p>

                      {order.shippingAddress.addressLine2 && (
                        <p>{order.shippingAddress.addressLine2}</p>
                      )}

                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>

                      <p>{order.shippingAddress.postalCode}</p>

                      <p>{order.shippingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Billing */}

                  <div className="rounded-xl border bg-white p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-500" />

                      <h3 className="text-lg font-semibold">Billing Address</h3>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="font-semibold text-black">
                        {order.billingAddress.firstName}{" "}
                        {order.billingAddress.lastName}
                      </p>

                      <p>{order.billingAddress.addressLine1}</p>

                      {order.billingAddress.addressLine2 && (
                        <p>{order.billingAddress.addressLine2}</p>
                      )}

                      <p>
                        {order.billingAddress.city},{" "}
                        {order.billingAddress.state}
                      </p>

                      <p>{order.billingAddress.postalCode}</p>

                      <p>{order.billingAddress.phone}</p>
                    </div>
                  </div>

                  {/* Summary */}

                  <div className="rounded-xl border bg-white p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-purple-500" />

                      <h3 className="text-lg font-semibold">Order Summary</h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Payment</span>

                        <span className="font-medium">
                          {order.paymentMethod}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>

                        <span className="font-medium">
                          {order.shippingMethod}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Status</span>

                        <span className="font-medium">{order.status}</span>
                      </div>

                      <hr />

                      <div className="flex justify-between">
                        <span>Items Total</span>

                        <span>₹{order.totalAmount.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Shipping Fee</span>

                        <span className="font-medium text-green-600">FREE</span>
                      </div>

                      <hr />

                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>

                        <span>₹{order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
