import {
  ArrowLeft,
  ArrowUpRight,
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";

import type {
  P2POrder,
  OrderStatus,
} from "../../types/order.types";

import {
  getOrders,
} from "../../utility/orderStorage";

function MerchantOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] =
    useState<P2POrder[]>([]);

  const [filter, setFilter] =
    useState<"all" | "active" | "completed" | "cancelled">(
      "all",
    );

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const storedOrders = getOrders();

    setOrders(storedOrders);
  };

  const activeStatuses: OrderStatus[] = [
    "pending",
    "payment_pending",
    "paid",
    "crypto_released",
  ];

  const completedStatuses: OrderStatus[] = [
    "completed",
  ];

  const cancelledStatuses: OrderStatus[] = [
    "cancelled",
    "disputed",
  ];

  const filteredOrders = useMemo(() => {
    if (filter === "all") {
      return orders;
    }

    if (filter === "active") {
      return orders.filter((order) =>
        activeStatuses.includes(
          order.status,
        ),
      );
    }

    if (filter === "completed") {
      return orders.filter((order) =>
        completedStatuses.includes(
          order.status,
        ),
      );
    }

    return orders.filter((order) =>
      cancelledStatuses.includes(
        order.status,
      ),
    );
  }, [orders, filter]);

  const getStatusBadge = (
    status: OrderStatus,
  ) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success">
            Completed
          </Badge>
        );

      case "cancelled":
        return (
          <Badge variant="danger">
            Cancelled
          </Badge>
        );

      case "disputed":
        return (
          <Badge variant="danger">
            Disputed
          </Badge>
        );

      case "paid":
        return (
          <Badge variant="info">
            Paid
          </Badge>
        );

      case "crypto_released":
        return (
          <Badge variant="success">
            Crypto Released
          </Badge>
        );

      case "payment_pending":
        return (
          <Badge variant="warning">
            Payment Pending
          </Badge>
        );

      default:
        return (
          <Badge variant="warning">
            Pending
          </Badge>
        );
    }
  };

  const getTypeBadge = (
    type: P2POrder["tradeType"],
  ) => {
    if (type === "buy") {
      return (
        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          Buy
        </span>
      );
    }

    return (
      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
        Sell
      </span>
    );
  };

  const activeCount =
    orders.filter((order) =>
      activeStatuses.includes(
        order.status,
      ),
    ).length;

  const completedCount =
    orders.filter((order) =>
      completedStatuses.includes(
        order.status,
      ),
    ).length;

  const cancelledCount =
    orders.filter((order) =>
      cancelledStatuses.includes(
        order.status,
      ),
    ).length;

  const totalVolume =
    orders
      .filter(
        (order) =>
          order.status ===
          "completed",
      )
      .reduce(
        (total, order) =>
          total + order.fiatAmount,
        0,
      );

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            navigate("/merchant")
          }
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Merchant Dashboard
        </button>

        <p className="text-sm font-semibold text-blue-600">
          P2P Merchant
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Merchant Orders
        </h1>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Monitor and manage orders created from your
          advertisements.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Total Orders
            </p>

            <ClipboardList
              size={18}
              className="text-slate-400"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {orders.length}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Active Orders
            </p>

            <Clock3
              size={18}
              className="text-yellow-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {activeCount}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Completed
            </p>

            <CheckCircle2
              size={18}
              className="text-green-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {completedCount}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500">
            Completed Volume
          </p>

          <p className="mt-2 text-xl font-bold text-slate-900">
            ₦{totalVolume.toLocaleString()}
          </p>

          {cancelledCount > 0 && (
            <p className="mt-1 text-xs text-red-500">
              {cancelledCount} cancelled/disputed
            </p>
          )}
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-5 overflow-hidden">
        <div className="flex gap-2 overflow-x-auto p-3">
          {[
            {
              value: "all",
              label: "All Orders",
            },
            {
              value: "active",
              label: "Active",
            },
            {
              value: "completed",
              label: "Completed",
            },
            {
              value: "cancelled",
              label: "Cancelled",
            },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setFilter(
                  item.value as
                    | "all"
                    | "active"
                    | "completed"
                    | "cancelled",
                )
              }
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                filter === item.value
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <Card className="p-8 sm:p-12">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              {filter === "cancelled" ? (
                <XCircle
                  size={26}
                  className="text-slate-400"
                />
              ) : (
                <ClipboardList
                  size={26}
                  className="text-slate-400"
                />
              )}
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No orders found
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Orders created from your P2P advertisements
              will appear here.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(
            (order) => (
              <Card
                key={order.id}
                className="overflow-hidden"
              >
                {/* Desktop / Tablet */}
                <div className="hidden lg:block">
                  <div className="grid grid-cols-[1.2fr_0.8fr_1fr_1fr_1fr_auto] items-center gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-500">
                    <span>Order</span>
                    <span>Type</span>
                    <span>Asset</span>
                    <span>Customer</span>
                    <span>Status</span>
                    <span />
                  </div>

                  <div className="grid grid-cols-[1.2fr_0.8fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {order.orderNumber}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(
                          order.createdAt,
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      {getTypeBadge(
                        order.tradeType,
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {order.cryptoAmount}{" "}
                        {order.crypto}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        ₦{order.fiatAmount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {order.traderName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        @{order.traderUsername}
                      </p>
                    </div>

                    <div>
                      {getStatusBadge(
                        order.status,
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/orders/${order.id}`,
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      aria-label="View order"
                    >
                      <ArrowUpRight
                        size={17}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-slate-100 px-5 py-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Price
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        ₦{order.price.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Payment Method
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {order.paymentMethod}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Order ID
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                        {order.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile */}
                <div className="p-5 lg:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getTypeBadge(
                          order.tradeType,
                        )}

                        {getStatusBadge(
                          order.status,
                        )}
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-900">
                        {order.orderNumber}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(
                          order.createdAt,
                        ).toLocaleString()}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/orders/${order.id}`,
                        )
                      }
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500"
                    >
                      <ArrowUpRight
                        size={17}
                      />
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Asset
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {order.cryptoAmount}{" "}
                        {order.crypto}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Fiat Amount
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        ₦{order.fiatAmount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Customer
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {order.traderName}
                      </p>

                      <p className="text-xs text-slate-400">
                        @{order.traderUsername}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Price
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        ₦{order.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-xs text-slate-400">
                        Payment Method
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(
                        `/orders/${order.id}`,
                      )
                    }
                    className="mt-5 w-full"
                  >
                    View Order
                    <ArrowUpRight
                      size={15}
                      className="ml-2"
                    />
                  </Button>
                </div>
              </Card>
            ),
          )}
        </div>
      )}

      {/* Demo notice */}
      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-xs leading-5 text-blue-700">
          <strong>Demo mode:</strong>{" "}
          Merchant orders currently use the frontend order
          storage. Later, the backend will return only orders
          belonging to this merchant's advertisements.
        </p>
      </div>
    </div>
  );
}

export default MerchantOrders;