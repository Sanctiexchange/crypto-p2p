import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  ShoppingBag,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";

import { getOrders } from "../../utility/orderStorage";
import type { OrderStatus } from "../../types/order.types";

function Orders() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"all" | OrderStatus>("all");

  const [tradeFilter, setTradeFilter] =
    useState<"all" | "buy" | "sell">("all");

  const orders = getOrders();

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      maximumFractionDigits: 2,
    })}`;

  const statusLabel: Record<OrderStatus, string> = {
    pending: "Order Created",
    payment_pending: "Payment Pending",
    paid: "Payment Confirmed",
    crypto_released: "Crypto Released",
    completed: "Completed",
    cancelled: "Cancelled",
    disputed: "Disputed",
  };

  const statusVariant: Record<
    OrderStatus,
    "success" | "warning" | "danger" | "info" | "neutral"
  > = {
    pending: "warning",
    payment_pending: "warning",
    paid: "info",
    crypto_released: "info",
    completed: "success",
    cancelled: "danger",
    disputed: "danger",
  };

  const filteredOrders = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch =
        !searchValue ||
        order.orderNumber
          .toLowerCase()
          .includes(searchValue) ||
        order.traderName
          .toLowerCase()
          .includes(searchValue) ||
        order.traderUsername
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        order.status === statusFilter;

      const matchesTrade =
        tradeFilter === "all" ||
        order.tradeType === tradeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTrade
      );
    });
  }, [
    orders,
    search,
    statusFilter,
    tradeFilter,
  ]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          Trading
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Orders
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your P2P trading orders.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6 p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search order number or trader..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "all"
                  | OrderStatus,
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Statuses
            </option>

            <option value="pending">
              Order Created
            </option>

            <option value="payment_pending">
              Payment Pending
            </option>

            <option value="paid">
              Payment Confirmed
            </option>

            <option value="crypto_released">
              Crypto Released
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="cancelled">
              Cancelled
            </option>

            <option value="disputed">
              Disputed
            </option>
          </select>

          {/* Trade Filter */}
          <select
            value={tradeFilter}
            onChange={(event) =>
              setTradeFilter(
                event.target.value as
                  | "all"
                  | "buy"
                  | "sell",
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Trades
            </option>

            <option value="buy">
              Buy Orders
            </option>

            <option value="sell">
              Sell Orders
            </option>
          </select>
        </div>
      </Card>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredOrders.length}
          </span>{" "}
          {filteredOrders.length === 1
            ? "order"
            : "orders"}
        </p>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 ? (
        <Card className="p-10 text-center sm:p-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag
              size={25}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            No orders found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            {orders.length === 0
              ? "You have not created any P2P orders yet. Visit the marketplace to start trading."
              : "No orders match your current search or filters."}
          </p>

          {orders.length === 0 && (
            <button
              type="button"
              onClick={() => navigate("/p2p")}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Marketplace
            </button>
          )}
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
          <Card className="hidden overflow-hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Order
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Trade
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Trader
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() =>
                        navigate(
                          `/orders/${order.id}`,
                        )
                      }
                      className="cursor-pointer transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {order.orderNumber}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {new Date(
                            order.createdAt,
                          ).toLocaleString(
                            "en-NG",
                          )}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                              order.tradeType ===
                              "buy"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {order.tradeType ===
                            "buy" ? (
                              <ArrowDownLeft
                                size={17}
                              />
                            ) : (
                              <ArrowUpRight
                                size={17}
                              />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold capitalize text-slate-900">
                              {order.tradeType}{" "}
                              {order.crypto}
                            </p>

                            <p className="text-xs text-slate-400">
                              {order.paymentMethod}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {order.traderName}
                        </p>

                        <p className="text-xs text-slate-400">
                          @{order.traderUsername}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <p className="font-semibold text-slate-900">
                          {formatNaira(
                            order.fiatAmount,
                          )}
                        </p>

                        <p className="text-xs text-slate-400">
                          {order.cryptoAmount.toFixed(
                            8,
                          )}{" "}
                          {order.crypto}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <span className="font-semibold text-slate-900">
                          {formatNaira(order.price)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <Badge
                          variant={
                            statusVariant[
                              order.status
                            ]
                          }
                        >
                          {statusLabel[
                            order.status
                          ]}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Mobile / Tablet Cards */}
          <div className="space-y-4 lg:hidden">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="cursor-pointer p-5 transition hover:shadow-md"
                onClick={() =>
                  navigate(
                    `/orders/${order.id}`,
                  )
                }
              >
                <Card>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">
                      {order.orderNumber}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(
                        order.createdAt,
                      ).toLocaleString("en-NG")}
                    </p>
                  </div>

                  <Badge
                    variant={
                      statusVariant[
                        order.status
                      ]
                    }
                  >
                    {statusLabel[order.status]}
                  </Badge>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      order.tradeType === "buy"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {order.tradeType === "buy" ? (
                      <ArrowDownLeft size={19} />
                    ) : (
                      <ArrowUpRight size={19} />
                    )}
                  </div>

                  <div>
                    <p className="font-semibold capitalize text-slate-900">
                      {order.tradeType}{" "}
                      {order.crypto}
                    </p>

                    <p className="text-xs text-slate-500">
                      With {order.traderName}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Fiat Amount
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {formatNaira(
                        order.fiatAmount,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Crypto Amount
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {order.cryptoAmount.toFixed(
                        8,
                      )}{" "}
                      {order.crypto}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Price
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {formatNaira(order.price)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Payment
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;