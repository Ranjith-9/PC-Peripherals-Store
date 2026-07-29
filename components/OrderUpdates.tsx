"use client";
import { useEffect, useState } from "react";
import { OrderStatus as OrderStatuses } from "@prisma/client";
import type { Orders } from "@/types/order";

export default function OrderUpdates() {
  const [orders, setOrders] = useState<Orders[]>([]);

  const [expandedOrders, setExpandedOrders] = useState(new Set<string>());

  const toggleOrder = (id: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const [changedOrders, setChangedOrders] = useState(
    new Map<string, OrderStatuses>(),
  );

  // fetch orders
  useEffect(() => {
    async function fetchOrders() {
      const res = await fetch("/api/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      const editableOrders = result.map((order: Orders) => ({
        ...order,
        status: order.status as OrderStatuses,
        originalStatus: order.status as OrderStatuses,
      }));

      setOrders(editableOrders);
    }

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderStatuses) => {
    // Find current order BEFORE updating state
    const currentOrder = orders ? orders.find((o) => o.id === orderId) : null;

    if (!currentOrder) return;

    // Update UI immediately
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    // Update changed orders
    setChangedOrders((prev) => {
      const updated = new Map(prev);

      if (newStatus === currentOrder.originalStatus) {
        // User reverted back to DB value
        updated.delete(orderId);
      } else {
        // User changed value
        updated.set(orderId, newStatus);
      }

      return updated;
    });
  };

  const saveChanges = async () => {
    const payload = Array.from(changedOrders.entries()).map(([id, status]) => ({
      id,
      status,
    }));

    console.log(payload);

    /*
      await fetch("/api/orders/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      */

    // Once backend succeeds...
    setOrders((prev) =>
      prev.map((order) =>
        changedOrders.has(order.id)
          ? {
              ...order,
              originalStatus: order.status,
            }
          : order,
      ),
    );

    setChangedOrders(new Map());
  };

  return (
    <div>
      <h1>Orders</h1>

      <div className="flex flex-col gap-3">
        {orders &&
          orders.map((order) => (
            <div key={order.id}>
              <div
                className={`flex items-center gap-5 p-2 bg-gray-100 text-black rounded-md ${expandedOrders.has(order.id) ? "rounded-b-none" : ""}`}
                onClick={() => {
                  toggleOrder(order.id);
                }}
              >
                <div>{order.id}</div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value as OrderStatuses,
                    )
                  }
                >
                  {Object.values(OrderStatuses).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <div>{order.paymentMethod}</div>
                <div> {order.totalAmount}</div>
                <div>
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </div>
              </div>
              <div>
                <div
                  className={`px-5 overflow-hidden transition-all duration-300 ease-in-out bg-gray-300 text-black rounded-b-md ${
                    expandedOrders.has(order.id)
                      ? "py-2 max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-5">
                      <div>{item.product.name}</div>
                      <div>{item.quantity}</div>
                      <div>{item.subtotal}</div>
                    </div>
                  ))}

                  <div>Total : {order.totalAmount}</div>
                </div>
              </div>
            </div>
          ))}

        {changedOrders.size > 0 && (
          <button onClick={saveChanges} className="border p-2 rounded">
            Save Changes ({changedOrders.size})
          </button>
        )}
      </div>
    </div>
  );
}
