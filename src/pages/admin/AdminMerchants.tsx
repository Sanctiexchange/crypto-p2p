import {
  CheckCircle2,
  Eye,
  Search,
  ShieldCheck,
  Store,
  UserCheck,
  UserX,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";

import {
  adminMerchants,
  type AdminMerchant,
} from "../../data/adminMerchants";

function AdminMerchants() {
  const [merchants, setMerchants] =
    useState<AdminMerchant[]>(
      adminMerchants,
    );

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [tierFilter, setTierFilter] =
    useState("all");

  const [selectedMerchant, setSelectedMerchant] =
    useState<AdminMerchant | null>(null);

  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        merchant.displayName
          .toLowerCase()
          .includes(searchValue) ||
        merchant.username
          .toLowerCase()
          .includes(searchValue) ||
        merchant.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        merchant.status === statusFilter;

      const matchesTier =
        tierFilter === "all" ||
        merchant.tier === tierFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTier
      );
    });
  }, [
    merchants,
    search,
    statusFilter,
    tierFilter,
  ]);

  const approvedCount = merchants.filter(
    (merchant) =>
      merchant.status === "approved",
  ).length;

  const pendingCount = merchants.filter(
    (merchant) =>
      merchant.status === "pending",
  ).length;

  const suspendedCount =
    merchants.filter(
      (merchant) =>
        merchant.status === "suspended",
    ).length;

  const proCount = merchants.filter(
    (merchant) =>
      merchant.tier === "pro",
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
    status: AdminMerchant["status"],
  ) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="success">
            Approved
          </Badge>
        );

      case "suspended":
        return (
          <Badge variant="danger">
            Suspended
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

  const getTierBadge = (
    tier: AdminMerchant["tier"],
  ) => {
    switch (tier) {
      case "pro":
        return (
          <Badge variant="info">
            Pro
          </Badge>
        );

      case "verified":
        return (
          <Badge variant="success">
            Verified
          </Badge>
        );

      default:
        return (
          <Badge variant="neutral">
            Standard
          </Badge>
        );
    }
  };

  const updateMerchantStatus = (
    merchantId: string,
    status: AdminMerchant["status"],
  ) => {
    setMerchants((current) =>
      current.map((merchant) =>
        merchant.id === merchantId
          ? {
              ...merchant,
              status,
              approvedAt:
                status === "approved"
                  ? merchant.approvedAt ??
                    new Date().toISOString()
                  : merchant.approvedAt,
            }
          : merchant,
      ),
    );
  };

  const handleStatusChange = (
    merchant: AdminMerchant,
  ) => {
    if (merchant.status === "pending") {
      updateMerchantStatus(
        merchant.id,
        "approved",
      );
      return;
    }

    if (merchant.status === "approved") {
      updateMerchantStatus(
        merchant.id,
        "suspended",
      );
      return;
    }

    updateMerchantStatus(
      merchant.id,
      "approved",
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">
            Merchant Management
          </h1>

          <Badge variant="info">
            Admin
          </Badge>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Review, approve and manage P2P merchants.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Merchants
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {merchants.length}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Store size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Approved
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {approvedCount}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <UserCheck size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
              <ShieldCheck size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Suspended
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {suspendedCount}
              </p>

              <p className="mt-1 text-xs text-blue-600">
                {proCount} Pro merchants
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <UserX size={21} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
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
              placeholder="Search merchant..."
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
              All Statuses
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="suspended">
              Suspended
            </option>
          </select>

          <select
            value={tierFilter}
            onChange={(event) =>
              setTierFilter(
                event.target.value,
              )
            }
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Merchant Tiers
            </option>

            <option value="standard">
              Standard
            </option>

            <option value="verified">
              Verified
            </option>

            <option value="pro">
              Pro
            </option>
          </select>
        </div>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Merchant
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tier
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Orders
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Completion
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Volume
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredMerchants.map(
                (merchant) => (
                  <tr
                    key={merchant.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {merchant.displayName}
                      </p>

                      <p className="text-xs text-slate-500">
                        @{merchant.username}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {merchant.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      {getStatusBadge(
                        merchant.status,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {getTierBadge(
                        merchant.tier,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {
                          merchant.completedOrders
                        }
                      </p>

                      <p className="text-xs text-slate-500">
                        of {merchant.totalOrders}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {merchant.completionRate.toFixed(
                          1,
                        )}
                        %
                      </p>

                      <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{
                            width: `${Math.min(
                              merchant.completionRate,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {formatCurrency(
                          merchant.totalVolumeNGN,
                        )}
                      </p>

                      <p className="text-xs text-slate-500">
                        {merchant.activeAds} active ads
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            setSelectedMerchant(
                              merchant,
                            )
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          title="View merchant"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleStatusChange(
                              merchant,
                            )
                          }
                          className={`rounded-lg p-2 ${
                            merchant.status ===
                            "suspended"
                              ? "text-green-600 hover:bg-green-50"
                              : merchant.status ===
                                "pending"
                              ? "text-blue-600 hover:bg-blue-50"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                          title={
                            merchant.status ===
                            "pending"
                              ? "Approve merchant"
                              : merchant.status ===
                                "suspended"
                              ? "Activate merchant"
                              : "Suspend merchant"
                          }
                        >
                          {merchant.status ===
                          "suspended" ? (
                            <CheckCircle2
                              size={17}
                            />
                          ) : merchant.status ===
                            "pending" ? (
                            <UserCheck
                              size={17}
                            />
                          ) : (
                            <XCircle
                              size={17}
                            />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        {filteredMerchants.length === 0 && (
          <div className="p-10 text-center">
            <Store
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No merchants found
            </p>
          </div>
        )}
      </Card>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredMerchants.map(
          (merchant) => (
            <Card
              key={merchant.id}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">
                    {merchant.displayName}
                  </p>

                  <p className="text-xs text-slate-500">
                    @{merchant.username}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {getStatusBadge(
                      merchant.status,
                    )}

                    {getTierBadge(
                      merchant.tier,
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Orders
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {
                      merchant.completedOrders
                    }{" "}
                    / {merchant.totalOrders}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Completion
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {merchant.completionRate.toFixed(
                      1,
                    )}
                    %
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Trading Volume
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatCurrency(
                      merchant.totalVolumeNGN,
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Active Ads
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {merchant.activeAds}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() =>
                    setSelectedMerchant(
                      merchant,
                    )
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(
                      merchant,
                    )
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                    merchant.status ===
                    "suspended"
                      ? "bg-green-50 text-green-700"
                      : merchant.status ===
                        "pending"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {merchant.status ===
                  "pending" ? (
                    <>
                      <UserCheck
                        size={16}
                      />
                      Approve
                    </>
                  ) : merchant.status ===
                    "suspended" ? (
                    <>
                      <CheckCircle2
                        size={16}
                      />
                      Activate
                    </>
                  ) : (
                    <>
                      <XCircle size={16} />
                      Suspend
                    </>
                  )}
                </button>
              </div>
            </Card>
          ),
        )}

        {filteredMerchants.length === 0 && (
          <Card className="p-10 text-center">
            <Store
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No merchants found
            </p>
          </Card>
        )}
      </div>

      {/* Details Modal */}
      {selectedMerchant && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Merchant Details
                </h2>

                <p className="text-sm text-slate-500">
                  @{selectedMerchant.username}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedMerchant(
                    null,
                  )
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs uppercase text-slate-400">
                  Merchant
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {
                    selectedMerchant.displayName
                  }
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {getStatusBadge(
                  selectedMerchant.status,
                )}

                {getTierBadge(
                  selectedMerchant.tier,
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Completion Rate
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {selectedMerchant.completionRate.toFixed(
                      1,
                    )}
                    %
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Response Time
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {selectedMerchant.responseTimeMinutes}{" "}
                    min
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Completed Orders
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {
                      selectedMerchant.completedOrders
                    }
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Active Ads
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {
                      selectedMerchant.activeAds
                    }
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Trading Volume
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatCurrency(
                    selectedMerchant.totalVolumeNGN,
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-400">
                  Application Date
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {formatDate(
                    selectedMerchant.appliedAt,
                  )}
                </p>
              </div>

              <button
                onClick={() => {
                  handleStatusChange(
                    selectedMerchant,
                  );

                  setSelectedMerchant(
                    null,
                  );
                }}
                className={`w-full rounded-lg px-4 py-3 text-sm font-semibold ${
                  selectedMerchant.status ===
                  "suspended"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : selectedMerchant.status ===
                      "pending"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {selectedMerchant.status ===
                "pending"
                  ? "Approve Merchant"
                  : selectedMerchant.status ===
                    "suspended"
                  ? "Activate Merchant"
                  : "Suspend Merchant"}
              </button>
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
          Merchant records and status changes are
          demonstration data. These actions will
          later connect to the backend and require
          proper administrator authorization.
        </p>
      </div>
    </div>
  );
}

export default AdminMerchants;