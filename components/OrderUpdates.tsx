"use client";
import { useMemo, useState } from "react";
import { OrderStatus as OrderStatuses } from "@prisma/client";
import type { Orders } from "@/types/order";
import { fakeOrders } from "@/DataSeed/fakeDataOrder/orderData";

type SortKey = "date-desc" | "date-asc" | "amount-desc" | "amount-asc";

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> =
  {
    pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    confirmed: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
    processing: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
    shipped: {
      bg: "bg-violet-50",
      text: "text-violet-700",
      dot: "bg-violet-500",
    },
    delivered: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
    refunded: { bg: "bg-gray-100", text: "text-gray-700", dot: "bg-gray-400" },
  };

function getStatusStyle(status: string) {
  return (
    STATUS_STYLES[status.toLowerCase()] ?? {
      bg: "bg-gray-50",
      text: "text-gray-700",
      dot: "bg-gray-400",
    }
  );
}

const inr = (n: number) =>
  n.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

export default function OrderUpdates() {
  const [orders, setOrders] = useState<Orders[]>(fakeOrders);
  const [expandedOrders, setExpandedOrders] = useState(new Set<string>());
  const [changedOrders, setChangedOrders] = useState(
    new Map<string, OrderStatuses>(),
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("date-desc");

  // // fetch orders
  // useEffect(() => {
  //   async function fetchOrders() {
  //     const res = await fetch("/api/order", {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     const result = await res.json();
  //     const editableOrders = result.map((order: Orders) => ({
  //       ...order,
  //       status: order.status as OrderStatuses,
  //       originalStatus: order.status as OrderStatuses,
  //     }));
  //     setOrders(editableOrders);
  //   }
  //   fetchOrders();
  // }, []);

  const toggleOrder = (id: string) => {
    setExpandedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatuses) => {
    const currentOrder = orders.find((o) => o.id === orderId);
    if (!currentOrder) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );

    setChangedOrders((prev) => {
      const updated = new Map(prev);
      if (newStatus === currentOrder.originalStatus) {
        updated.delete(orderId);
      } else {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      */

    setOrders((prev) =>
      prev.map((order) =>
        changedOrders.has(order.id)
          ? { ...order, originalStatus: order.status }
          : order,
      ),
    );

    setChangedOrders(new Map());
  };

  // ---- Analytics ----
  const analytics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    const statusCounts = new Map<string, number>();
    for (const o of orders) {
      statusCounts.set(o.status, (statusCounts.get(o.status) ?? 0) + 1);
    }

    const now = new Date();
    const thisMonthCount = orders.filter((o) => {
      const d = new Date(o.createdAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;

    const monthly: { label: string; revenue: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString("en-IN", { month: "short" });
      const revenue = orders
        .filter((o) => {
          const od = new Date(o.createdAt);
          return (
            od.getMonth() === d.getMonth() &&
            od.getFullYear() === d.getFullYear()
          );
        })
        .reduce((sum, o) => sum + o.totalAmount, 0);
      monthly.push({ label, revenue });
    }
    const maxMonthly = Math.max(1, ...monthly.map((m) => m.revenue));

    return {
      totalOrders,
      totalRevenue,
      avgOrderValue,
      statusCounts,
      thisMonthCount,
      monthly,
      maxMonthly,
    };
  }, [orders]);

  // ---- Filtering + sorting ----
  const visibleOrders = useMemo(() => {
    let list = [...orders];

    if (statusFilter !== "ALL") {
      list = list.filter((o) => o.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((o) => {
        const name =
          `${o.shippingAddress.firstName} ${o.shippingAddress.lastName}`.toLowerCase();
        return o.id.toLowerCase().includes(q) || name.includes(q);
      });
    }

    list.sort((a, b) => {
      switch (sortKey) {
        case "date-asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "amount-desc":
          return b.totalAmount - a.totalAmount;
        case "amount-asc":
          return a.totalAmount - b.totalAmount;
        case "date-desc":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return list;
  }, [orders, statusFilter, search, sortKey]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500">
          Track performance and manage order status
        </p>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={inr(analytics.totalRevenue)} />
        <StatCard label="Total Orders" value={analytics.totalOrders} />
        <StatCard
          label="Avg Order Value"
          value={inr(analytics.avgOrderValue)}
        />
        <StatCard label="Orders This Month" value={analytics.thisMonthCount} />
      </section>

      {/* Status breakdown + revenue trend */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            Status breakdown
          </h2>
          <div className="space-y-2">
            {Object.values(OrderStatuses).map((status) => {
              const count = analytics.statusCounts.get(status) ?? 0;
              const pct = analytics.totalOrders
                ? (count / analytics.totalOrders) * 100
                : 0;
              const style = getStatusStyle(status);
              return (
                <div key={status} className="flex items-center gap-3 text-sm">
                  <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                  <span className="w-24 text-gray-600 capitalize">
                    {status.toLowerCase()}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${style.dot}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-gray-500">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            Revenue, last 6 months
          </h2>
          <div className="flex items-end gap-3 h-32">
            {analytics.monthly.map((m) => (
              <div
                key={m.label}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full bg-gray-900/80 rounded-t"
                  style={{
                    height: `${(m.revenue / analytics.maxMonthly) * 100}%`,
                    minHeight: 2,
                  }}
                  title={inr(m.revenue)}
                />
                <span className="text-xs text-gray-500">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID or customer"
          className="border border-neutral-500 rounded-md px-3 py-2 text-sm text-zinc-900 flex-1 min-w-[220px]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-neutral-500 text-zinc-900 rounded-md px-3 py-2 text-sm"
        >
          <option value="ALL">All statuses</option>
          {Object.values(OrderStatuses).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="border border-neutral-500 text-zinc-900  rounded-md px-3 py-2 text-sm"
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Amount: high to low</option>
          <option value="amount-asc">Amount: low to high</option>
        </select>
      </section>

      {/* Order history */}
      <section className="space-y-3">
        {visibleOrders.length === 0 && (
          <p className="text-sm text-gray-500 py-8 text-center">
            No orders match your filters.
          </p>
        )}

        {visibleOrders.map((order) => {
          const isExpanded = expandedOrders.has(order.id);
          const style = getStatusStyle(order.status);
          const isChanged = changedOrders.has(order.id);

          return (
            <div
              key={order.id}
              className="border rounded-lg overflow-hidden bg-white"
            >
              <div
                className="flex flex-wrap items-center gap-4 p-3 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="font-mono text-xs text-gray-500 w-28 truncate">
                  {order.id}
                </div>

                <div className="text-sm text-gray-700 flex-1 min-w-[140px]">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${style.bg} ${style.text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value as OrderStatuses,
                    )
                  }
                  className="border rounded-md px-2 py-1 text-xs border-neutral-500 text-zinc-900 "
                >
                  {Object.values(OrderStatuses).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <div className="text-xs text-gray-500 w-24">
                  {order.paymentMethod}
                </div>
                <div className="text-sm font-medium text-gray-900 w-24 text-right">
                  {inr(order.totalAmount)}
                </div>
                <div className="text-xs text-gray-500 w-24 text-right">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </div>

                {isChanged && (
                  <span className="text-xs text-amber-600">unsaved</span>
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 border-t ${
                  isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 space-y-4 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">
                        Shipping to
                      </h3>
                      <p className="text-gray-700">
                        {order.shippingAddress.addressLine1}
                        {order.shippingAddress.addressLine2 &&
                          `, ${order.shippingAddress.addressLine2}`}
                        <br />
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.postalCode}
                        <br />
                        {order.shippingAddress.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-gray-500 uppercase mb-1">
                        Billing
                      </h3>
                      <p className="text-gray-700">
                        {order.billingAddress.addressLine1}
                        {order.billingAddress.addressLine2 &&
                          `, ${order.billingAddress.addressLine2}`}
                        <br />
                        {order.billingAddress.city},{" "}
                        {order.billingAddress.state}{" "}
                        {order.billingAddress.postalCode}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
                      Items
                    </h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          {item.product.imageUrl && (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-10 h-10 rounded object-cover border"
                            />
                          )}
                          <div className="flex-1">{item.product.name}</div>
                          <div className="text-gray-500">x{item.quantity}</div>
                          <div className="font-medium">
                            {inr(item.subtotal)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between border-t pt-2 font-medium text-gray-900">
                    <span>Total</span>
                    <span>{inr(order.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {changedOrders.size > 0 && (
        <div className="sticky bottom-4 flex justify-end">
          <button
            onClick={saveChanges}
            className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg text-sm font-medium hover:bg-gray-800"
          >
            Save changes ({changedOrders.size})
          </button>
        </div>
      )}
    </div>
  );
}
