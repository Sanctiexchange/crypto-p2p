import {
  CheckCircle2,
  Eye,
  Megaphone,
  PauseCircle,
  PlayCircle,
  Search,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";

import type {
  P2PAdvertisement,
} from "../../types/advertisement.types";

import {
  getAdvertisements,
  updateAdvertisementStatus,
} from "../../utility/advertisementStorage";

function AdminAdvertisements() {
  const [advertisements, setAdvertisements] =
    useState<P2PAdvertisement[]>(
      getAdvertisements(),
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedAdvertisement, setSelectedAdvertisement] =
    useState<P2PAdvertisement | null>(
      null,
    );

  const refreshAdvertisements = () => {
    setAdvertisements(
      getAdvertisements(),
    );
  };

  const filteredAdvertisements =
    useMemo(() => {
      return advertisements.filter(
        (advertisement) => {
          const searchValue =
            search.toLowerCase();

          const matchesSearch =
            advertisement.id
              .toLowerCase()
              .includes(searchValue) ||
            advertisement.crypto
              .toLowerCase()
              .includes(searchValue) ||
            advertisement.fiatCurrency
              .toLowerCase()
              .includes(searchValue) ||
            advertisement.merchantId
              .toLowerCase()
              .includes(searchValue);

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

  const formatCurrency = (
    amount: number,
  ) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );

  const getStatusBadge = (
    status: P2PAdvertisement["status"],
  ) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="success">
            Approved
          </Badge>
        );

      case "pending":
        return (
          <Badge variant="warning">
            Pending
          </Badge>
        );

      case "rejected":
        return (
          <Badge variant="danger">
            Rejected
          </Badge>
        );

      case "paused":
        return (
          <Badge variant="neutral">
            Paused
          </Badge>
        );

      default:
        return (
          <Badge variant="info">
            Completed
          </Badge>
        );
    }
  };

  const handleApprove = (
    id: string,
  ) => {
    updateAdvertisementStatus(
      id,
      "approved",
    );

    refreshAdvertisements();
  };

  const handleReject = (
    id: string,
  ) => {
    const reason = window.prompt(
      "Enter a rejection reason:",
    );

    if (!reason?.trim()) {
      return;
    }

    updateAdvertisementStatus(
      id,
      "rejected",
      reason.trim(),
    );

    refreshAdvertisements();
  };

  const handlePause = (
    id: string,
  ) => {
    updateAdvertisementStatus(
      id,
      "paused",
    );

    refreshAdvertisements();
  };

  const handleResume = (
    id: string,
  ) => {
    updateAdvertisementStatus(
      id,
      "approved",
    );

    refreshAdvertisements();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">
            Advertisement Approval
          </h1>

          <Badge variant="info">
            Admin
          </Badge>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Review and control advertisements submitted
          by P2P merchants.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {pendingCount}
          </p>

          <div className="mt-3 text-yellow-600">
            <Megaphone size={20} />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Approved
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {approvedCount}
          </p>

          <div className="mt-3 text-green-600">
            <CheckCircle2 size={20} />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Rejected
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {rejectedCount}
          </p>

          <div className="mt-3 text-red-600">
            <XCircle size={20} />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-slate-500">
            Paused
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {pausedCount}
          </p>

          <div className="mt-3 text-slate-500">
            <PauseCircle size={20} />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
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
              placeholder="Search advertisement, crypto or merchant..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value,
              )
            }
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Advertisement Status
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

            <option value="completed">
              Completed
            </option>
          </select>
        </div>
      </Card>

      {/* Desktop */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
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

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Created
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAdvertisements.map(
                (advertisement) => (
                  <tr
                    key={advertisement.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Megaphone
                            size={19}
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {advertisement.type.toUpperCase()}{" "}
                            {advertisement.crypto}
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              advertisement.fiatCurrency
                            }{" "}
                            •{" "}
                            {advertisement.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {advertisement.merchantId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {formatCurrency(
                          advertisement.price,
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">
                        {formatCurrency(
                          advertisement.minimumAmount,
                        )}
                      </p>

                      <p className="text-xs text-slate-500">
                        to{" "}
                        {formatCurrency(
                          advertisement.maximumAmount,
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      {getStatusBadge(
                        advertisement.status,
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(
                        advertisement.createdAt,
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
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          title="View"
                        >
                          <Eye size={17} />
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
                              className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                              title="Approve"
                            >
                              <CheckCircle2
                                size={17}
                              />
                            </button>

                            <button
                              onClick={() =>
                                handleReject(
                                  advertisement.id,
                                )
                              }
                              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
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
                            className="rounded-lg p-2 text-yellow-600 hover:bg-yellow-50"
                            title="Pause"
                          >
                            <PauseCircle
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
                            className="rounded-lg p-2 text-green-600 hover:bg-green-50"
                            title="Resume"
                          >
                            <PlayCircle
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

        {filteredAdvertisements.length ===
          0 && (
          <div className="p-10 text-center">
            <Megaphone
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No advertisements found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </Card>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredAdvertisements.map(
          (advertisement) => (
            <Card
              key={advertisement.id}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    {advertisement.type.toUpperCase()}{" "}
                    {advertisement.crypto}/
                    {
                      advertisement.fiatCurrency
                    }
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {advertisement.merchantId}
                  </p>
                </div>

                {getStatusBadge(
                  advertisement.status,
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Price
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatCurrency(
                      advertisement.price,
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Available
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {
                      advertisement.availableAmount
                    }
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Minimum
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatCurrency(
                      advertisement.minimumAmount,
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Maximum
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatCurrency(
                      advertisement.maximumAmount,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() =>
                    setSelectedAdvertisement(
                      advertisement,
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
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
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700"
                    >
                      <CheckCircle2
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
                      className="flex items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-red-700"
                    >
                      <XCircle size={16} />
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
                    className="flex items-center justify-center rounded-lg bg-yellow-50 px-3 py-2 text-yellow-700"
                  >
                    <PauseCircle
                      size={16}
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
                    className="flex items-center justify-center rounded-lg bg-green-50 px-3 py-2 text-green-700"
                  >
                    <PlayCircle
                      size={16}
                    />
                  </button>
                )}
              </div>
            </Card>
          ),
        )}

        {filteredAdvertisements.length ===
          0 && (
          <Card className="p-10 text-center">
            <Megaphone
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No advertisements found
            </p>
          </Card>
        )}
      </div>

      {/* Details Modal */}
      {selectedAdvertisement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="font-bold text-slate-900">
                  Advertisement Details
                </h2>

                <p className="text-xs text-slate-500">
                  {selectedAdvertisement.id}
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

            <div className="space-y-4 p-5">
              <div className="flex flex-wrap gap-2">
                {getStatusBadge(
                  selectedAdvertisement.status,
                )}

                <Badge variant="info">
                  {selectedAdvertisement.type.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Asset
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      selectedAdvertisement.crypto
                    }
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Fiat
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {
                      selectedAdvertisement.fiatCurrency
                    }
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Price
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatCurrency(
                    selectedAdvertisement.price,
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Merchant
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {
                    selectedAdvertisement.merchantId
                  }
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Order Limits
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {formatCurrency(
                    selectedAdvertisement.minimumAmount,
                  )}{" "}
                  —{" "}
                  {formatCurrency(
                    selectedAdvertisement.maximumAmount,
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Payment Methods
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedAdvertisement.paymentMethods.map(
                    (method) => (
                      <Badge
                        key={method}
                        variant="neutral"
                      >
                        {method}
                      </Badge>
                    ),
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Terms
                </p>

                <p className="mt-1 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                  {
                    selectedAdvertisement.terms
                  }
                </p>
              </div>

              {selectedAdvertisement.rejectionReason && (
                <div className="rounded-lg border border-red-100 bg-red-50 p-3">
                  <p className="text-xs font-semibold text-red-700">
                    Rejection Reason
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    {
                      selectedAdvertisement.rejectionReason
                    }
                  </p>
                </div>
              )}

              {selectedAdvertisement.status ===
                "pending" && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      handleApprove(
                        selectedAdvertisement.id,
                      );
                      setSelectedAdvertisement(
                        null,
                      );
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <CheckCircle2
                      size={17}
                    />
                    Approve
                  </button>

                  <button
                    onClick={() => {
                      handleReject(
                        selectedAdvertisement.id,
                      );
                      setSelectedAdvertisement(
                        null,
                      );
                    }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    <XCircle size={17} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Demo Notice */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-900">
          Admin Demo Mode
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          Advertisement approvals currently use
          local browser storage. Backend authorization,
          audit logs and permanent approval records
          will be implemented during backend integration.
        </p>
      </div>
    </div>
  );
}

export default AdminAdvertisements;