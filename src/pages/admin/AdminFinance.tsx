import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  Filter,
  Flag,
  Search,
  ShieldCheck,
  WalletCards,
  XCircle,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import Badge from "../../components/common/Badge";

import {
  adminFinancialTransactions,
} from "../../data/adminFinancialTransactions";

import type {
  AdminFinancialTransaction,
  AdminFinancialTransactionStatus,
} from "../../types/adminFinance.types";

type TransactionFilter =
  | "all"
  | "deposit"
  | "withdrawal"
  | "p2p_buy"
  | "p2p_sell";

type StatusFilter =
  | "all"
  | AdminFinancialTransactionStatus;

function AdminFinance() {
  const [
    transactions,
    setTransactions,
  ] = useState<
    AdminFinancialTransaction[]
  >(
    adminFinancialTransactions,
  );

  const [search, setSearch] =
    useState("");

  const [
    transactionFilter,
    setTransactionFilter,
  ] =
    useState<TransactionFilter>(
      "all",
    );

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>(
    "all",
  );

  const [
    selectedTransaction,
    setSelectedTransaction,
  ] =
    useState<AdminFinancialTransaction | null>(
      null,
    );

  const totalDeposits =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "deposit" &&
          transaction.status ===
            "completed",
      )
      .reduce(
        (total, transaction) =>
          total +
          transaction.fiatAmount,
        0,
      );

  const totalWithdrawals =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
            "withdrawal" &&
          transaction.status !==
            "failed",
      )
      .reduce(
        (total, transaction) =>
          total +
          transaction.fiatAmount,
        0,
      );

  const tradingVolume =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
            "p2p_buy" ||
          transaction.type ===
            "p2p_sell",
      )
      .reduce(
        (total, transaction) =>
          total +
          transaction.fiatAmount,
        0,
      );

  const flaggedCount =
    transactions.filter(
      (transaction) =>
        transaction.isFlagged,
    ).length;

  const filteredTransactions =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return transactions.filter(
        (transaction) => {
          const matchesSearch =
            !query ||
            transaction.reference
              .toLowerCase()
              .includes(query) ||
            transaction.userName
              .toLowerCase()
              .includes(query) ||
            transaction.crypto
              .toLowerCase()
              .includes(query) ||
            transaction.id
              .toLowerCase()
              .includes(query);

          const matchesType =
            transactionFilter ===
              "all" ||
            transaction.type ===
              transactionFilter;

          const matchesStatus =
            statusFilter ===
              "all" ||
            transaction.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesType &&
            matchesStatus
          );
        },
      );
    }, [
      transactions,
      search,
      transactionFilter,
      statusFilter,
    ]);

  const formatNumber = (
    value: number,
  ) =>
    new Intl.NumberFormat(
      "en-NG",
    ).format(value);

  const formatTransactionType =
    (
      type: AdminFinancialTransaction["type"],
    ) => {
      switch (type) {
        case "deposit":
          return "Deposit";

        case "withdrawal":
          return "Withdrawal";

        case "p2p_buy":
          return "P2P Buy";

        case "p2p_sell":
          return "P2P Sell";

        default:
          return type;
      }
    };

  const getStatusBadge = (
    status: AdminFinancialTransactionStatus,
  ) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="success">
            Completed
          </Badge>
        );

      case "pending":
        return (
          <Badge variant="warning">
            Pending
          </Badge>
        );

      case "review":
        return (
          <Badge variant="warning">
            Review
          </Badge>
        );

      case "failed":
        return (
          <Badge variant="danger">
            Failed
          </Badge>
        );

      case "cancelled":
        return (
          <Badge variant="danger">
            Cancelled
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

  const handleFlag = (
    transaction: AdminFinancialTransaction,
  ) => {
    const note =
      window.prompt(
        transaction.isFlagged
          ? "Update the admin review note:"
          : "Why are you flagging this transaction?",
      );

    if (!note?.trim()) {
      return;
    }

    setTransactions(
      (current) =>
        current.map((item) =>
          item.id ===
          transaction.id
            ? {
                ...item,
                isFlagged:
                  !item.isFlagged,
                adminNote:
                  note.trim(),
                status:
                  !item.isFlagged
                    ? "review"
                    : item.status,
              }
            : item,
        ),
    );

    setSelectedTransaction(
      null,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <div className="mb-2 flex items-center gap-2">
          <WalletCards
            size={22}
            className="text-blue-600"
          />

          <span className="text-sm font-semibold text-blue-600">
            Administration
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Financial & Wallet Management
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor platform financial activity,
          wallet movements and P2P volume.
        </p>
      </div>

      {/* Financial Overview */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <FinanceCard
          title="Completed Deposits"
          value={`₦${formatNumber(
            totalDeposits,
          )}`}
          icon={
            <ArrowDownToLine
              size={19}
            />
          }
        />

        <FinanceCard
          title="Withdrawals"
          value={`₦${formatNumber(
            totalWithdrawals,
          )}`}
          icon={
            <ArrowUpFromLine
              size={19}
            />
          }
        />

        <FinanceCard
          title="P2P Volume"
          value={`₦${formatNumber(
            tradingVolume,
          )}`}
          icon={
            <WalletCards size={19} />
          }
        />

        <FinanceCard
          title="Flagged"
          value={flaggedCount}
          icon={
            <Flag size={19} />
          }
        />
      </div>

      {/* Security Notice */}

      <div className="flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
        <ShieldCheck
          size={20}
          className="mt-0.5 shrink-0 text-green-600"
        />

        <div>
          <p className="text-sm font-semibold text-green-900">
            Financial Monitoring
          </p>

          <p className="mt-1 text-sm leading-6 text-green-800">
            This dashboard is currently a
            frontend monitoring simulation.
            Real wallet balances, blockchain
            transactions, payment processing and
            withdrawal authorization will be
            handled by the backend.
          </p>
        </div>
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
              placeholder="Search reference, user, crypto..."
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
                value={
                  transactionFilter
                }
                onChange={(event) =>
                  setTransactionFilter(
                    event.target
                      .value as TransactionFilter,
                  )
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="all">
                  All Transactions
                </option>

                <option value="deposit">
                  Deposits
                </option>

                <option value="withdrawal">
                  Withdrawals
                </option>

                <option value="p2p_buy">
                  P2P Buy
                </option>

                <option value="p2p_sell">
                  P2P Sell
                </option>
              </select>
            </div>

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

              <option value="completed">
                Completed
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="review">
                Review
              </option>

              <option value="failed">
                Failed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredTransactions.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <WalletCards
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No transactions found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or
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
                      Transaction
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      User
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Type
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
                  {filteredTransactions.map(
                    (transaction) => (
                      <tr
                        key={
                          transaction.id
                        }
                        className="hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {
                              transaction.reference
                            }
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {new Date(
                              transaction.createdAt,
                            ).toLocaleString(
                              "en-NG",
                            )}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-900">
                            {
                              transaction.userName
                            }
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              transaction.userId
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-900">
                            {formatTransactionType(
                              transaction.type,
                            )}
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              transaction.crypto
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            ₦
                            {formatNumber(
                              transaction.fiatAmount,
                            )}
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              transaction.cryptoAmount
                            }{" "}
                            {
                              transaction.crypto
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(
                              transaction.status,
                            )}

                            {transaction.isFlagged && (
                              <Flag
                                size={15}
                                className="text-red-600"
                              />
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                setSelectedTransaction(
                                  transaction,
                                )
                              }
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                              title="View"
                            >
                              <Eye
                                size={17}
                              />
                            </button>

                            <button
                              onClick={() =>
                                handleFlag(
                                  transaction,
                                )
                              }
                              className={`rounded-lg p-2 ${
                                transaction.isFlagged
                                  ? "bg-red-100 text-red-600"
                                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                              title={
                                transaction.isFlagged
                                  ? "Update flag"
                                  : "Flag transaction"
                              }
                            >
                              <Flag
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
              {filteredTransactions.map(
                (transaction) => (
                  <div
                    key={
                      transaction.id
                    }
                    className="space-y-4 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {
                            transaction.reference
                          }
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {
                            transaction.userName
                          }
                        </p>
                      </div>

                      {getStatusBadge(
                        transaction.status,
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
                      <div>
                        <p className="text-xs text-slate-500">
                          Type
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {formatTransactionType(
                            transaction.type,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Amount
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          ₦
                          {formatNumber(
                            transaction.fiatAmount,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Crypto
                        </p>

                        <p className="mt-1 text-sm text-slate-900">
                          {
                            transaction.cryptoAmount
                          }{" "}
                          {
                            transaction.crypto
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Payment
                        </p>

                        <p className="mt-1 text-sm text-slate-900">
                          {transaction.paymentMethod ||
                            "N/A"}
                        </p>
                      </div>
                    </div>

                    {transaction.isFlagged && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                        <div className="flex items-center gap-2">
                          <Flag
                            size={16}
                            className="text-red-600"
                          />

                          <p className="text-sm font-semibold text-red-800">
                            Flagged for review
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setSelectedTransaction(
                            transaction,
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        onClick={() =>
                          handleFlag(
                            transaction,
                          )
                        }
                        className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white"
                      >
                        <Flag size={16} />
                        {transaction.isFlagged
                          ? "Update Review"
                          : "Flag"}
                      </button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        )}
      </div>

      {/* Transaction Modal */}

      {selectedTransaction && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Transaction Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {
                    selectedTransaction.reference
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedTransaction(
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
                    {formatTransactionType(
                      selectedTransaction.type,
                    )}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {
                      selectedTransaction.cryptoAmount
                    }{" "}
                    {
                      selectedTransaction.crypto
                    }
                  </p>
                </div>

                {getStatusBadge(
                  selectedTransaction.status,
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  label="User"
                  value={
                    selectedTransaction.userName
                  }
                />

                <DetailItem
                  label="User ID"
                  value={
                    selectedTransaction.userId
                  }
                />

                <DetailItem
                  label="Reference"
                  value={
                    selectedTransaction.reference
                  }
                />

                <DetailItem
                  label="Fiat Amount"
                  value={`₦${formatNumber(
                    selectedTransaction.fiatAmount,
                  )}`}
                />

                <DetailItem
                  label="Crypto Amount"
                  value={`${selectedTransaction.cryptoAmount} ${selectedTransaction.crypto}`}
                />

                <DetailItem
                  label="Payment Method"
                  value={
                    selectedTransaction.paymentMethod ||
                    "N/A"
                  }
                />

                <DetailItem
                  label="Currency"
                  value={
                    selectedTransaction.fiatCurrency
                  }
                />

                <DetailItem
                  label="Transaction ID"
                  value={
                    selectedTransaction.id
                  }
                />
              </div>

              {selectedTransaction.isFlagged && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center gap-2">
                    <Flag
                      size={18}
                      className="text-red-600"
                    />

                    <p className="text-sm font-semibold text-red-900">
                      Transaction Flagged
                    </p>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-red-800">
                    {selectedTransaction.adminNote ||
                      "This transaction requires administrative review."}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  onClick={() =>
                    handleFlag(
                      selectedTransaction,
                    )
                  }
                  className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  {selectedTransaction.isFlagged
                    ? "Update Review"
                    : "Flag for Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface FinanceCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function FinanceCard({
  title,
  value,
  icon,
}: FinanceCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
          {icon}
        </div>
      </div>

      <p className="break-words text-xl font-bold text-slate-900 sm:text-2xl">
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

export default AdminFinance;