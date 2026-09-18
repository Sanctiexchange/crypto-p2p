import {
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Megaphone,
  Pause,
  Play,
  Search,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";

import {
  getAdvertisements,
  updateAdvertisementStatus,
} from "../../utility/advertisementStorage";

import type {
  P2PAdvertisement,
} from "../../types/advertisement.types";

import { adminMerchants } from "../../data/adminMerchants";

type StatusFilter =
  | "all"
  | "pending"
  | "approved"
  | "rejected"
  | "paused";

function AdminAdvertisements() {
  const navigate = useNavigate();

  const [
    advertisements,
    setAdvertisements,
  ] = useState<P2PAdvertisement[]>(
    getAdvertisements(),
  );

  const [search, setSearch] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>("all");

  const [
    selectedAdvertisement,
    setSelectedAdvertisement,
  ] =
    useState<P2PAdvertisement | null>(
      null,
    );

  const getMerchantName = (
    merchantId: string,
  ) => {
    const merchant =
      adminMerchants.find(
        (item) =>
          item.id === merchantId,
      );

    return (
      merchant?.displayName ??
      "Unknown Merchant"
    );
  };

  const refreshAdvertisements =
    () => {
      setAdvertisements(
        getAdvertisements(),
      );
    };

  const filteredAdvertisements =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      return advertisements.filter(
        (advertisement) => {
          const merchantName =
            getMerchantName(
              advertisement.merchantId,
            );

          const matchesSearch =
            !query ||
            advertisement.id
              .toLowerCase()
              .includes(query) ||
            advertisement.crypto
              .toLowerCase()
              .includes(query) ||
            advertisement.fiatCurrency
              .toLowerCase()
              .includes(query) ||
            merchantName
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "all" ||
            advertisement.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      advertisements,
      search,
      statusFilter,
    ]);

  const pendingCount =
    advertisements.filter(
      (item) =>
        item.status === "pending",
    ).length;

  const approvedCount =
    advertisements.filter(
      (item) =>
        item.status === "approved",
    ).length;

  const rejectedCount =
    advertisements.filter(
      (item) =>
        item.status === "rejected",
    ).length;

  const pausedCount =
    advertisements.filter(
      (item) =>
        item.status === "paused",
    ).length;

  const handleApprove = (
    advertisementId: string,
  ) => {
    updateAdvertisementStatus(
      advertisementId,
      "approved",
    );

    refreshAdvertisements();

    setSelectedAdvertisement(null);
  };

  const handleReject = (
    advertisementId: string,
  ) => {
    const reason =
      window.prompt(
        "Enter the reason for rejecting this advertisement:",
      );

    if (!reason?.trim()) {
      return;
    }

    updateAdvertisementStatus(
      advertisementId,
      "rejected",
      reason.trim(),
    );

    refreshAdvertisements();

    setSelectedAdvertisement(null);
  };

  const handlePause = (
    advertisementId: string,
  ) => {
    updateAdvertisementStatus(
      advertisementId,
      "paused",
    );

    refreshAdvertisements();
  };

  const handleResume = (
    advertisementId: string,
  ) => {
    updateAdvertisementStatus(
      advertisementId,
      "approved",
    );

    refreshAdvertisements();
  };

  const getStatusBadge = (
    status: P2PAdvertisement["status"],
  ) => {
    if (status === "pending") {
      return (
        <Badge variant="warning">
          Pending
        </Badge>
      );
    }

    if (status === "approved") {
      return (
        <Badge variant="success">
          Approved
        </Badge>
      );
    }

    if (status === "rejected") {
      return (
        <Badge variant="danger">
          Rejected
        </Badge>
      );
    }

    if (status === "paused") {
      return (
        <Badge variant="neutral">
          Paused
        </Badge>
      );
    }

    return (
      <Badge variant="info">
        Completed
      </Badge>
    );
  };

  const formatNumber = (
    value: number,
  ) =>
    new Intl.NumberFormat(
      "en-NG",
    ).format(value);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Megaphone
              size={22}
              className="text-blue-600"
            />

            <span className="text-sm font-semibold text-blue-600">
              Administration
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Advertisement Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review and manage merchant P2P
            advertisements.
          </p>
        </div>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-lg bg-yellow-50 p-2 text-yellow-600">
              <Clock size={19} />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              REVIEW
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {pendingCount}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Pending
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-lg bg-green-50 p-2 text-green-600">
              <CheckCircle size={19} />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              LIVE
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {approvedCount}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Approved
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-lg bg-red-50 p-2 text-red-600">
              <XCircle size={19} />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              BLOCKED
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {rejectedCount}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Rejected
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
              <Pause size={19} />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              PAUSED
            </span>
          </div>

          <p className="text-2xl font-bold text-slate-900">
            {pausedCount}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Paused
          </p>
        </div>
      </div>

      {/* Search + Filters */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search by advertisement ID, crypto, fiat or merchant..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter
              size={18}
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

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>

              <option value="paused">
                Paused
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Advertisement List */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredAdvertisements.length ===
        0 ? (
          <div className="px-6 py-16 text-center">
            <Megaphone
              size={40}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No advertisements found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no advertisements
              matching your current filters.
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
                      Advertisement
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Merchant
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Price
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Limits
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
                  {filteredAdvertisements.map(
                    (advertisement) => (
                      <tr
                        key={
                          advertisement.id
                        }
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                              {advertisement.crypto.charAt(
                                0,
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                {advertisement.type ===
                                "buy"
                                  ? "Buy"
                                  : "Sell"}{" "}
                                {
                                  advertisement.crypto
                                }
                              </p>

                              <p className="text-xs text-slate-500">
                                {
                                  advertisement.id
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-900">
                            {getMerchantName(
                              advertisement.merchantId,
                            )}
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              advertisement.merchantId
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            ₦
                            {formatNumber(
                              advertisement.price,
                            )}
                          </p>

                          <p className="text-xs text-slate-500">
                            per{" "}
                            {
                              advertisement.crypto
                            }
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm text-slate-700">
                            ₦
                            {formatNumber(
                              advertisement.minimumAmount,
                            )}{" "}
                            - ₦
                            {formatNumber(
                              advertisement.maximumAmount,
                            )}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          {getStatusBadge(
                            advertisement.status,
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                setSelectedAdvertisement(
                                  advertisement,
                                )
                              }
                              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                              title="View"
                            >
                              <Eye
                                size={17}
                              />
                            </button>

                            {advertisement.status ===
                              "pending" && (
                              <>
                                <button
                                  onClick={() =>
                                    handleApprove(
                                      advertisement.id,
                                    )
                                  }
                                  className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                                  title="Approve"
                                >
                                  <CheckCircle
                                    size={17}
                                  />
                                </button>

                                <button
                                  onClick={() =>
                                    handleReject(
                                      advertisement.id,
                                    )
                                  }
                                  className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                                  title="Reject"
                                >
                                  <XCircle
                                    size={17}
                                  />
                                </button>
                              </>
                            )}

                            {advertisement.status ===
                              "approved" && (
                              <button
                                onClick={() =>
                                  handlePause(
                                    advertisement.id,
                                  )
                                }
                                className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                                title="Pause"
                              >
                                <Pause
                                  size={17}
                                />
                              </button>
                            )}

                            {advertisement.status ===
                              "paused" && (
                              <button
                                onClick={() =>
                                  handleResume(
                                    advertisement.id,
                                  )
                                }
                                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                                title="Resume"
                              >
                                <Play
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
              {filteredAdvertisements.map(
                (advertisement) => (
                  <div
                    key={
                      advertisement.id
                    }
                    className="space-y-4 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                          {advertisement.crypto.charAt(
                            0,
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {advertisement.type ===
                            "buy"
                              ? "Buy"
                              : "Sell"}{" "}
                            {
                              advertisement.crypto
                            }
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              advertisement.id
                            }
                          </p>
                        </div>
                      </div>

                      {getStatusBadge(
                        advertisement.status,
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
                      <div>
                        <p className="text-xs text-slate-500">
                          Merchant
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {getMerchantName(
                            advertisement.merchantId,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Price
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          ₦
                          {formatNumber(
                            advertisement.price,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Minimum
                        </p>

                        <p className="mt-1 text-sm text-slate-900">
                          ₦
                          {formatNumber(
                            advertisement.minimumAmount,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Maximum
                        </p>

                        <p className="mt-1 text-sm text-slate-900">
                          ₦
                          {formatNumber(
                            advertisement.maximumAmount,
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setSelectedAdvertisement(
                            advertisement,
                          )
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      {advertisement.status ===
                        "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(
                                advertisement.id,
                              )
                            }
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white"
                          >
                            <CheckCircle
                              size={16}
                            />
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleReject(
                                advertisement.id,
                              )
                            }
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                          >
                            <XCircle
                              size={16}
                            />
                            Reject
                          </button>
                        </>
                      )}

                      {advertisement.status ===
                        "approved" && (
                        <button
                          onClick={() =>
                            handlePause(
                              advertisement.id,
                            )
                          }
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                        >
                          <Pause size={16} />
                          Pause
                        </button>
                      )}

                      {advertisement.status ===
                        "paused" && (
                        <button
                          onClick={() =>
                            handleResume(
                              advertisement.id,
                            )
                          }
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                        >
                          <Play size={16} />
                          Resume
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
          Advertisement approval currently
          uses localStorage. Backend
          authorization, audit logs and
          role-based access control will be
          connected during backend
          integration.
        </p>
      </div>

      {/* Advertisement Modal */}

      {selectedAdvertisement && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Advertisement Details
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {
                    selectedAdvertisement.id
                  }
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedAdvertisement(
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
                    {selectedAdvertisement.type ===
                    "buy"
                      ? "Buy"
                      : "Sell"}{" "}
                    {
                      selectedAdvertisement.crypto
                    }
                  </p>

                  <p className="text-sm text-slate-500">
                    {
                      selectedAdvertisement.fiatCurrency
                    }
                  </p>
                </div>

                {getStatusBadge(
                  selectedAdvertisement.status,
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Merchant
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {getMerchantName(
                      selectedAdvertisement.merchantId,
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Price
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    ₦
                    {formatNumber(
                      selectedAdvertisement.price,
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Available
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {formatNumber(
                      selectedAdvertisement.availableAmount,
                    )}{" "}
                    {
                      selectedAdvertisement.crypto
                    }
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Limits
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    ₦
                    {formatNumber(
                      selectedAdvertisement.minimumAmount,
                    )}{" "}
                    - ₦
                    {formatNumber(
                      selectedAdvertisement.maximumAmount,
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Payment Methods
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedAdvertisement.paymentMethods.map(
                    (method) => (
                      <span
                        key={method}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                      >
                        {method}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Merchant Terms
                </p>

                <div className="mt-2 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {
                    selectedAdvertisement.terms
                  }
                </div>
              </div>

              {selectedAdvertisement.rejectionReason && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="text-sm font-semibold text-red-800">
                    Rejection Reason
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    {
                      selectedAdvertisement.rejectionReason
                    }
                  </p>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4">
                {selectedAdvertisement.status ===
                  "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleReject(
                          selectedAdvertisement.id,
                        )
                      }
                      className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() =>
                        handleApprove(
                          selectedAdvertisement.id,
                        )
                      }
                      className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Approve Advertisement
                    </button>
                  </>
                )}

                {selectedAdvertisement.status ===
                  "approved" && (
                  <button
                    onClick={() =>
                      handlePause(
                        selectedAdvertisement.id,
                      )
                    }
                    className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Pause Advertisement
                  </button>
                )}

                {selectedAdvertisement.status ===
                  "paused" && (
                  <button
                    onClick={() =>
                      handleResume(
                        selectedAdvertisement.id,
                      )
                    }
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Resume Advertisement
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

export default AdminAdvertisements;