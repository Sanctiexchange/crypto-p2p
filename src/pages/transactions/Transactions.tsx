import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowUpFromLine,
  Search,
  WalletCards,
} from "lucide-react";

import { useMemo, useState } from "react";

import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";

import { transactions } from "../../data/transactions";

import type {
  TransactionStatus,
  TransactionType,
} from "../../types/transaction.types";

function Transactions() {
  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState<"all" | TransactionType>("all");

  const [statusFilter, setStatusFilter] =
    useState<"all" | TransactionStatus>("all");

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      maximumFractionDigits: 2,
    })}`;

  const typeLabel: Record<TransactionType, string> = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    p2p_buy: "P2P Buy",
    p2p_sell: "P2P Sell",
  };

  const statusLabel: Record<
    TransactionStatus,
    string
  > = {
    pending: "Pending",
    completed: "Completed",
    failed: "Failed",
    cancelled: "Cancelled",
  };

  const filteredTransactions = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return transactions.filter(
      (transaction) => {
        const matchesSearch =
          !searchValue ||
          transaction.reference
            .toLowerCase()
            .includes(searchValue) ||
          transaction.crypto
            .toLowerCase()
            .includes(searchValue) ||
          transaction.counterparty
            ?.toLowerCase()
            .includes(searchValue);

        const matchesType =
          typeFilter === "all" ||
          transaction.type === typeFilter;

        const matchesStatus =
          statusFilter === "all" ||
          transaction.status === statusFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesStatus
        );
      },
    );
  }, [
    search,
    typeFilter,
    statusFilter,
  ]);

  const getStatusVariant = (
    status: TransactionStatus,
  ) => {
    if (status === "completed") {
      return "success";
    }

    if (status === "pending") {
      return "warning";
    }

    if (status === "failed") {
      return "danger";
    }

    return "neutral";
  };

  const getTransactionIcon = (
    type: TransactionType,
  ) => {
    if (type === "deposit") {
      return <ArrowDownLeft size={18} />;
    }

    if (type === "withdrawal") {
      return <ArrowUpFromLine size={18} />;
    }

    if (type === "p2p_buy") {
      return <ArrowDownLeft size={18} />;
    }

    return <ArrowUpRight size={18} />;
  };

  const getIconStyle = (
    type: TransactionType,
  ) => {
    if (
      type === "deposit" ||
      type === "p2p_buy"
    ) {
      return "bg-green-50 text-green-600";
    }

    return "bg-red-50 text-red-600";
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          Activity
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Transactions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Track deposits, withdrawals and P2P transactions.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <WalletCards size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Total Transactions
              </p>

              <p className="text-xl font-bold text-slate-900">
                {transactions.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <ArrowDownLeft size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Completed
              </p>

              <p className="text-xl font-bold text-slate-900">
                {
                  transactions.filter(
                    (transaction) =>
                      transaction.status ===
                      "completed",
                  ).length
                }
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <ArrowUpFromLine size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Pending
              </p>

              <p className="text-xl font-bold text-slate-900">
                {
                  transactions.filter(
                    (transaction) =>
                      transaction.status ===
                      "pending",
                  ).length
                }
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6 p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
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
              placeholder="Search reference, asset or trader..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value as
                  | "all"
                  | TransactionType,
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Types
            </option>

            <option value="deposit">
              Deposits
            </option>

            <option value="withdrawal">
              Withdrawals
            </option>

            <option value="p2p_buy">
              P2P Buys
            </option>

            <option value="p2p_sell">
              P2P Sells
            </option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as
                  | "all"
                  | TransactionStatus,
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Statuses
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="failed">
              Failed
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </div>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredTransactions.length}
          </span>{" "}
          transactions
        </p>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Search
              size={24}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            No transactions found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          {/* Desktop */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[2fr_1.2fr_1.5fr_1.5fr_1.2fr] border-b border-slate-200 bg-slate-50 px-5 py-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Transaction
              </span>

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </span>

              <span className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Amount
              </span>

              <span className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Fiat Value
              </span>

              <span className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredTransactions.map(
                (transaction) => (
                  <div
                    key={transaction.id}
                    className="grid grid-cols-[2fr_1.2fr_1.5fr_1.5fr_1.2fr] items-center px-5 py-5 transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${getIconStyle(
                          transaction.type,
                        )}`}
                      >
                        {getTransactionIcon(
                          transaction.type,
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {transaction.reference}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {new Date(
                            transaction.createdAt,
                          ).toLocaleString(
                            "en-NG",
                          )}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {typeLabel[
                          transaction.type
                        ]}
                      </p>

                      {transaction.counterparty && (
                        <p className="mt-1 text-xs text-slate-400">
                          {transaction.counterparty}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        {transaction.cryptoAmount}{" "}
                        {transaction.crypto}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        {formatNaira(
                          transaction.fiatAmount,
                        )}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {transaction.fiatCurrency}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Badge
                        variant={getStatusVariant(
                          transaction.status,
                        )}
                      >
                        {statusLabel[
                          transaction.status
                        ]}
                      </Badge>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Mobile / Tablet */}
          <div className="divide-y divide-slate-100 lg:hidden">
            {filteredTransactions.map(
              (transaction) => (
                <div
                  key={transaction.id}
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getIconStyle(
                          transaction.type,
                        )}`}
                      >
                        {getTransactionIcon(
                          transaction.type,
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {transaction.reference}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {typeLabel[
                            transaction.type
                          ]}
                        </p>
                      </div>
                    </div>

                    <Badge
                      variant={getStatusVariant(
                        transaction.status,
                      )}
                    >
                      {statusLabel[
                        transaction.status
                      ]}
                    </Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Crypto Amount
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {transaction.cryptoAmount}{" "}
                        {transaction.crypto}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">
                        Fiat Value
                      </p>

                      <p className="mt-1 font-semibold text-slate-900">
                        {formatNaira(
                          transaction.fiatAmount,
                        )}
                      </p>
                    </div>
                  </div>

                  {transaction.counterparty && (
                    <div className="mt-4 rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Counterparty
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {transaction.counterparty}
                      </p>
                    </div>
                  )}

                  <p className="mt-4 text-xs text-slate-400">
                    {new Date(
                      transaction.createdAt,
                    ).toLocaleString("en-NG")}
                  </p>
                </div>
              ),
            )}
          </div>
        </Card>
      )}

      {/* Demo Notice */}
      <Card className="mt-6 border-blue-100 bg-blue-50 p-5">
        <p className="text-sm font-semibold text-blue-800">
          Transaction Ledger
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          These transactions are simulated frontend data.
          Later, this ledger will receive transaction records
          from the backend and blockchain/payment services.
        </p>
      </Card>
    </div>
  );
}

export default Transactions;