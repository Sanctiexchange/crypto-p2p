import {
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter,
  Search,
  ShoppingBag,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";

import {
  disputeOrder,
  getOrders,
  updateOrderStatus,
} from "../../utility/orderStorage";

import type {
  OrderStatus,
  P2POrder,
} from "../../types/order.types";

type StatusFilter =
  | "all"
  | OrderStatus;

type TradeFilter =
  | "all"
  | "buy"
  | "sell";

function AdminOrders() {
  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState<P2POrder[]>(
      getOrders(),
    );

  const [search, setSearch] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>("all");

  const [
    tradeFilter,
    setTradeFilter,
  ] = useState<TradeFilter>("all");

  const [
    selectedOrder,
    setSelectedOrder,
  ] = useState<P2POrder | null>(
    null,
  );

  const refreshOrders = () => {
    setOrders(getOrders());
  };

  const filteredOrders =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return orders.filter(
        (order) => {
          const matchesSearch =
            !query ||
            order.orderNumber
              .toLowerCase()
              .includes(query) ||
            order.id
              .toLowerCase()
              .includes(query) ||
            order.crypto
              .toLowerCase()
              .includes(query) ||
            order.traderName
              .toLowerCase()
              .includes(query) ||
            order.traderUsername
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter ===
              "all" ||
            order.status ===
              statusFilter;

          const matchesTrade =
            tradeFilter ===
              "all" ||
            order.tradeType ===
              tradeFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesTrade
          );
        },
      );
    }, [
      orders,
      search,
      statusFilter,
      tradeFilter,
    ]);

  const totalOrders =
    orders.length;

  const activeOrders =
    orders.filter(
      (order) =>
        ![
          "completed",
          "cancelled",
        ].includes(order.status),
    ).length;

  const completedOrders =
    orders.filter(
      (order) =>
        order.status ===
        "completed",
    ).length;

  const disputedOrders =
    orders.filter(
      (order) =>
        order.status ===
        "disputed",
    ).length;

  const formatNumber = (
    value: number,
  ) =>
    new Intl.NumberFormat(
      "en-NG",
    ).format(value);

  const getStatusBadge = (
    status: OrderStatus,
  ) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="warning">
            Pending
          </Badge>
        );

      case "payment_pending":
        return (
          <Badge variant="warning">
            Payment Pending
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
          <Badge variant="info">
            Crypto Released
          </Badge>
        );

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

      default:
        return (
          <Badge>
            {status}
          </Badge>
        );
    }
  };

  const handleDispute = (
    order: P2POrder,
  ) => {
    const reason =
      window.prompt(
        "Enter the reason for opening this dispute:",
      );

    if (!reason?.trim()) {
      return;
    }

    disputeOrder(
      order.id,
      reason.trim(),
    );

    refreshOrders();

    setSelectedOrder(null);
  };

  const handleResolve = (
    order: P2POrder,
  ) => {
    const note =
      window.prompt(
        "Enter the admin resolution note:",
      );

    if (!note?.trim()) {
      return;
    }

    updateOrderStatus(
      order.id,
      "completed",
      note.trim(),
    );

    refreshOrders();

    setSelectedOrder(null);
  };

  const handleCancel = (
    order: P2POrder,
  ) => {
    const confirmed =
      window.confirm(
        `Cancel order ${order.orderNumber}?`,
      );

    if (!confirmed) {
      return;
    }

    updateOrderStatus(
      order.id,
      "cancelled",
      "Cancelled by administrator.",
    );

    refreshOrders();

    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <div className="mb-2 flex items-center gap-2">
          <ShoppingBag
            size={22}
            className="text-blue-600"
          />

          <span className="text-sm font-semibold text-blue-600">
            Administration
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Orders & Trades
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor P2P trades, orders and
          disputes across the platform.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={
            <ShoppingBag size={19} />
          }
        />

        <StatCard
          title="Active Trades"
          value={activeOrders}
          icon={
            <Eye size={19} />
          }
        />

        <StatCard
          title="Completed"
          value={completedOrders}
          icon={
            <CheckCircle size={19} />
          }
        />

        <StatCard
          title="Disputed"
          value={disputedOrders}
          icon={
            <AlertTriangle size={19} />
          }
        />
      </div>

      {/* Filters */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search order number, trader, crypto..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter
                size={17}
                className="text-slate-500"
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target
                      .value as StatusFilter,
                  )
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="all">
                  All Statuses
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="payment_pending">
                  Payment Pending
                </option>

                <option value="paid">
                  Paid
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
            </div>

            <select
              value={tradeFilter}
              onChange={(event) =>
                setTradeFilter(
                  event.target
                    .value as TradeFilter,
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">
                Buy & Sell
              </option>

              <option value="buy">
                Buy
              </option>

              <option value="sell">
                Sell
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredOrders.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <ShoppingBag
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No orders found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              No orders match the selected
              filters.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Order
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Trader
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Trade
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map(
                    (order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {
                              order.orderNumber
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {new Date(
                              order.createdAt,
                            ).toLocaleDateString(
                              "en-NG",
                            )}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-900">
                            {
                              order.traderName
                            }
                          </p>

                          <p className="text-xs text-slate-500">
                            @
                            {
                              order.traderUsername
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                              order.tradeType ===
                              "buy"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.tradeType ===
                            "buy"
                              ? "Buy"
                              : "Sell"}{" "}
                            {
                              order.crypto
                            }
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            ₦
                            {formatNumber(
                              order.fiatAmount,
                            )}
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              order.cryptoAmount
                            }{" "}
                            {
                              order.crypto
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {getStatusBadge(
                            order.status,
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  order,
                                )
                              }
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                              title="View order"
                            >
                              <Eye
                                size={17}
                              />
                            </button>

                            {order.status !==
                              "disputed" &&
                              order.status !==
                                "completed" &&
                              order.status !==
                                "cancelled" && (
                                <button
                                  onClick={() =>
                                    handleDispute(
                                      order,
                                    )
                                  }
                                  className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                                  title="Dispute"
                                >
                                  <AlertTriangle
                                    size={17}
                                  />
                                </button>
                              )}

                            {order.status ===
                              "disputed" && (
                              <button
                                onClick={() =>
                                  handleResolve(
                                    order,
                                  )
                                }
                                className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                                title="Resolve"
                              >
                                <CheckCircle
                                  size={17}
                                />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile */}

            <div className="divide-y divide-slate-100 lg:hidden">
              {filteredOrders.map(
                (order) => (
                  <div
                    key={order.id}
                    className="space-y-4 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {
                            order.orderNumber
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            order.traderName
                          }
                        </p>
                      </div>

                      {getStatusBadge(
                        order.status,
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
                      <div>
                        <p className="text-xs text-slate-500">
                          Trade
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {order.tradeType ===
                          "buy"
                            ? "Buy"
                            : "Sell"}{" "}
                          {
                            order.crypto
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Fiat Amount
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          ₦
                          {formatNumber(
                            order.fiatAmount,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Crypto
                        </p>

                        <p className="mt-1 text-sm text-slate-900">
                          {
                            order.cryptoAmount
                          }{" "}
                          {
                            order.crypto
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Payment
                        </p>

                        <p className="mt-1 text-sm text-slate-900">
                          {
                            order.paymentMethod
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setSelectedOrder(
                            order,
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      {order.status !==
                        "disputed" &&
                        order.status !==
                          "completed" &&
                        order.status !==
                          "cancelled" && (
                          <button
                            onClick={() =>
                              handleDispute(
                                order,
                              )
                            }
                            className="flex items-center gap-2 rounded-lg bg-yellow-500 px-3 py-2 text-sm font-semibold text-white"
                          >
                            <AlertTriangle
                              size={16}
                            />
                            Dispute
                          </button>
                        )}

                      {order.status ===
                        "disputed" && (
                        <button
                          onClick={() =>
                            handleResolve(
                              order,
                            )
                          }
                          className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white"
                        >
                          <CheckCircle
                            size={16}
                          />
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}
      </div>

      {/* Demo Notice */}

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-900">
          Demo Administration Mode
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-700">
          Order management currently uses
          localStorage. Real admin authorization,
          audit logging, escrow controls and
          dispute resolution workflows will be
          connected during backend integration.
        </p>
      </div>

      {/* Order Details Modal */}

      {selectedOrder && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Order Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {
                    selectedOrder.orderNumber
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(
                    null,
                  )
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    {selectedOrder.tradeType ===
                    "buy"
                      ? "Buy"
                      : "Sell"}{" "}
                    {
                      selectedOrder.crypto
                    }
                  </p>

                  <p className="text-sm text-slate-500">
                    {
                      selectedOrder.cryptoAmount
                    }{" "}
                    {
                      selectedOrder.crypto
                    }
                  </p>
                </div>

                {getStatusBadge(
                  selectedOrder.status,
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  label="Trader"
                  value={
                    selectedOrder.traderName
                  }
                />

                <DetailItem
                  label="Username"
                  value={`@${selectedOrder.traderUsername}`}
                />

                <DetailItem
                  label="Fiat Amount"
                  value={`₦${formatNumber(
                    selectedOrder.fiatAmount,
                  )}`}
                />

                <DetailItem
                  label="Price"
                  value={`₦${formatNumber(
                    selectedOrder.price,
                  )}`}
                />

                <DetailItem
                  label="Payment Method"
                  value={
                    selectedOrder.paymentMethod
                  }
                />

                <DetailItem
                  label="Currency"
                  value={
                    selectedOrder.fiatCurrency
                  }
                />
              </div>

              {selectedOrder.disputeReason && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm font-semibold text-yellow-900">
                    Dispute Reason
                  </p>

                  <p className="mt-1 text-sm text-yellow-800">
                    {
                      selectedOrder.disputeReason
                    }
                  </p>
                </div>
              )}

              {selectedOrder.adminNote && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">
                    Admin Note
                  </p>

                  <p className="mt-1 text-sm text-blue-800">
                    {
                      selectedOrder.adminNote
                    }
                  </p>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  onClick={() => {
                    setSelectedOrder(
                      null,
                    );

                    navigate(
                      `/orders/${selectedOrder.id}`,
                    );
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Open Order Page
                </button>

                {selectedOrder.status !==
                  "disputed" &&
                  selectedOrder.status !==
                    "completed" &&
                  selectedOrder.status !==
                    "cancelled" && (
                    <>
                      <button
                        onClick={() =>
                          handleCancel(
                            selectedOrder,
                          )
                        }
                        className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                      >
                        Cancel Order
                      </button>

                      <button
                        onClick={() =>
                          handleDispute(
                            selectedOrder,
                          )
                        }
                        className="rounded-lg bg-yellow-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-yellow-600"
                      >
                        Open Dispute
                      </button>
                    </>
                  )}

                {selectedOrder.status ===
                  "disputed" && (
                  <button
                    onClick={() =>
                      handleResolve(
                        selectedOrder,
                      )
                    }
                    className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Resolve Dispute
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
          {icon}
        </div>
      </div>

      <p className="text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {title}
      </p>
    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default AdminOrders;