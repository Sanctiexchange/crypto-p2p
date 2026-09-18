import {
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";

import {
  getOrders,
  updateOrderStatus,
} from "../../utility/orderStorage";

import type {
  P2POrder,
} from "../../types/order.types";

function AdminDisputes() {
  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState<P2POrder[]>(
      getOrders(),
    );

  const [search, setSearch] =
    useState("");

  const [
    tradeFilter,
    setTradeFilter,
  ] = useState<
    "all" | "buy" | "sell"
  >("all");

  const [
    selectedDispute,
    setSelectedDispute,
  ] = useState<P2POrder | null>(
    null,
  );

  const refreshDisputes = () => {
    setOrders(getOrders());
  };

  /*
   * Only disputed orders belong
   * on the dispute management page.
   */
  const disputes = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.status ===
          "disputed",
      ),
    [orders],
  );

  const filteredDisputes =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return disputes.filter(
        (order) => {
          const matchesSearch =
            !query ||
            order.orderNumber
              .toLowerCase()
              .includes(query) ||
            order.id
              .toLowerCase()
              .includes(query) ||
            order.traderName
              .toLowerCase()
              .includes(query) ||
            order.traderUsername
              .toLowerCase()
              .includes(query) ||
            order.crypto
              .toLowerCase()
              .includes(query) ||
            order.disputeReason
              ?.toLowerCase()
              .includes(query);

          const matchesTrade =
            tradeFilter === "all" ||
            order.tradeType ===
              tradeFilter;

          return (
            matchesSearch &&
            matchesTrade
          );
        },
      );
    }, [
      disputes,
      search,
      tradeFilter,
    ]);

  const totalDisputes =
    disputes.length;

  const buyDisputes =
    disputes.filter(
      (order) =>
        order.tradeType === "buy",
    ).length;

  const sellDisputes =
    disputes.filter(
      (order) =>
        order.tradeType === "sell",
    ).length;

  const totalDisputedValue =
    disputes.reduce(
      (total, order) =>
        total + order.fiatAmount,
      0,
    );

  const formatNumber = (
    value: number,
  ) =>
    new Intl.NumberFormat(
      "en-NG",
    ).format(value);

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

    refreshDisputes();

    setSelectedDispute(null);
  };

  const handleCancel = (
    order: P2POrder,
  ) => {
    const confirmed =
      window.confirm(
        `Cancel disputed order ${order.orderNumber}?`,
      );

    if (!confirmed) {
      return;
    }

    updateOrderStatus(
      order.id,
      "cancelled",
      "Order cancelled by administrator after dispute review.",
    );

    refreshDisputes();

    setSelectedDispute(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <div className="mb-2 flex items-center gap-2">
          <ShieldAlert
            size={22}
            className="text-red-600"
          />

          <span className="text-sm font-semibold text-red-600">
            Administration
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Dispute Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review, investigate and resolve
          disputed P2P trades.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Open Disputes"
          value={totalDisputes}
          icon={
            <AlertTriangle
              size={19}
            />
          }
        />

        <StatCard
          title="Buy Disputes"
          value={buyDisputes}
          icon={
            <CheckCircle
              size={19}
            />
          }
        />

        <StatCard
          title="Sell Disputes"
          value={sellDisputes}
          icon={
            <XCircle size={19} />
          }
        />

        <StatCard
          title="Disputed Value"
          value={`₦${formatNumber(
            totalDisputedValue,
          )}`}
          icon={
            <ShieldAlert
              size={19}
            />
          }
          textValue
        />
      </div>

      {/* Search & Filter */}

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
              placeholder="Search order, trader, crypto or dispute reason..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter
              size={17}
              className="text-slate-500"
            />

            <select
              value={tradeFilter}
              onChange={(event) =>
                setTradeFilter(
                  event.target
                    .value as
                    | "all"
                    | "buy"
                    | "sell",
                )
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="all">
                Buy & Sell
              </option>

              <option value="buy">
                Buy Disputes
              </option>

              <option value="sell">
                Sell Disputes
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Disputes */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredDisputes.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <CheckCircle
              size={44}
              className="mx-auto text-green-500"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No open disputes
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are currently no
              disputed P2P trades requiring
              administrative attention.
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
                      Value
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Dispute Reason
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredDisputes.map(
                    (order) => (
                      <tr
                        key={order.id}
                        className="transition hover:bg-slate-50"
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

                        <td className="max-w-xs px-5 py-4">
                          <p className="truncate text-sm text-slate-600">
                            {order.disputeReason ||
                              "No reason provided"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                setSelectedDispute(
                                  order,
                                )
                              }
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                              title="Review dispute"
                            >
                              <Eye
                                size={17}
                              />
                            </button>

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
              {filteredDisputes.map(
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

                      <Badge variant="danger">
                        Disputed
                      </Badge>
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
                          Value
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          ₦
                          {formatNumber(
                            order.fiatAmount,
                          )}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <p className="text-xs text-slate-500">
                          Dispute Reason
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                          {order.disputeReason ||
                            "No reason provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setSelectedDispute(
                            order,
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        <Eye size={16} />
                        Review
                      </button>

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
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}
      </div>

      {/* Demo Notice */}

      <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4">
        <p className="text-sm font-semibold text-yellow-900">
          Demo Dispute Management
        </p>

        <p className="mt-1 text-sm leading-6 text-yellow-800">
          This dispute center currently
          operates with localStorage data.
          Production dispute evidence,
          escrow controls, administrator
          permissions, audit trails and
          irreversible settlement actions will
          be handled by the backend.
        </p>
      </div>

      {/* Dispute Modal */}

      {selectedDispute && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldAlert
                    size={20}
                    className="text-red-600"
                  />

                  <h2 className="text-lg font-bold text-slate-900">
                    Dispute Review
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  {
                    selectedDispute.orderNumber
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedDispute(
                    null,
                  )
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="space-y-5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    {selectedDispute.tradeType ===
                    "buy"
                      ? "Buy"
                      : "Sell"}{" "}
                    {
                      selectedDispute.crypto
                    }
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      selectedDispute.cryptoAmount
                    }{" "}
                    {
                      selectedDispute.crypto
                    }
                  </p>
                </div>

                <Badge variant="danger">
                  Disputed
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  label="Order Number"
                  value={
                    selectedDispute.orderNumber
                  }
                />

                <DetailItem
                  label="Trader"
                  value={
                    selectedDispute.traderName
                  }
                />

                <DetailItem
                  label="Username"
                  value={`@${selectedDispute.traderUsername}`}
                />

                <DetailItem
                  label="Fiat Amount"
                  value={`₦${formatNumber(
                    selectedDispute.fiatAmount,
                  )}`}
                />

                <DetailItem
                  label="Price"
                  value={`₦${formatNumber(
                    selectedDispute.price,
                  )}`}
                />

                <DetailItem
                  label="Payment Method"
                  value={
                    selectedDispute.paymentMethod
                  }
                />

                <DetailItem
                  label="Currency"
                  value={
                    selectedDispute.fiatCurrency
                  }
                />

                <DetailItem
                  label="Order ID"
                  value={
                    selectedDispute.id
                  }
                />
              </div>

              {/* Dispute Reason */}

              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    size={18}
                    className="text-red-600"
                  />

                  <p className="text-sm font-semibold text-red-900">
                    Dispute Reason
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-red-800">
                  {selectedDispute.disputeReason ||
                    "No dispute reason was provided."}
                </p>

                {selectedDispute.disputedAt && (
                  <p className="mt-3 text-xs text-red-600">
                    Opened{" "}
                    {new Date(
                      selectedDispute.disputedAt,
                    ).toLocaleString(
                      "en-NG",
                    )}
                  </p>
                )}
              </div>

              {/* Admin Note */}

              {selectedDispute.adminNote && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">
                    Existing Admin Note
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-800">
                    {
                      selectedDispute.adminNote
                    }
                  </p>
                </div>
              )}

              {/* Actions */}

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  onClick={() => {
                    setSelectedDispute(
                      null,
                    );

                    navigate(
                      `/orders/${selectedDispute.id}`,
                    );
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Open Order
                </button>

                <button
                  onClick={() =>
                    handleCancel(
                      selectedDispute,
                    )
                  }
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Cancel Order
                </button>

                <button
                  onClick={() =>
                    handleResolve(
                      selectedDispute,
                    )
                  }
                  className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Resolve Dispute
                </button>
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
  value: number | string;
  icon: React.ReactNode;
  textValue?: boolean;
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

      <p className="mt-1 wrap-break-words text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default AdminDisputes;