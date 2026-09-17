import {
  CheckCircle2,
  Eye,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  XCircle,
} from "lucide-react";

import { useMemo, useState } from "react";

import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";

import {
  adminUsers,
  type AdminUser,
} from "../../data/adminUsers";

function AdminUsers() {
  const [users, setUsers] =
    useState<AdminUser[]>(adminUsers);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [
    verificationFilter,
    setVerificationFilter,
  ] = useState("all");

  const [selectedUser, setSelectedUser] =
    useState<AdminUser | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        user.fullName
          .toLowerCase()
          .includes(searchValue) ||
        user.username
          .toLowerCase()
          .includes(searchValue) ||
        user.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        user.status === statusFilter;

      const matchesVerification =
        verificationFilter === "all" ||
        user.verificationStatus ===
          verificationFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification
      );
    });
  }, [
    users,
    search,
    statusFilter,
    verificationFilter,
  ]);

  const activeUsers = users.filter(
    (user) => user.status === "active",
  ).length;

  const suspendedUsers = users.filter(
    (user) => user.status === "suspended",
  ).length;

  const pendingUsers = users.filter(
    (user) => user.status === "pending",
  ).length;

  const verifiedUsers = users.filter(
    (user) =>
      user.verificationStatus ===
      "verified",
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
    status: AdminUser["status"],
  ) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success">
            Active
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

  const getVerificationBadge = (
    status: AdminUser["verificationStatus"],
  ) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="success">
            Verified
          </Badge>
        );

      case "pending":
        return (
          <Badge variant="warning">
            Pending
          </Badge>
        );

      default:
        return (
          <Badge variant="neutral">
            Unverified
          </Badge>
        );
    }
  };

  const toggleUserStatus = (
    userId: string,
  ) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status ===
                "suspended"
                  ? "active"
                  : "suspended",
            }
          : user,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">
            User Management
          </h1>

          <Badge variant="info">
            Admin
          </Badge>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          View and manage users registered on
          the platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {users.length}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Users size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Active Users
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {activeUsers}
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
                Verified Users
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {verifiedUsers}
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
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
                {suspendedUsers}
              </p>

              <p className="mt-1 text-xs text-yellow-600">
                {pendingUsers} pending accounts
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
        <div className="grid gap-3 lg:grid-cols-3">
          <div className="relative">
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
              placeholder="Search name, username or email..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value,
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Account Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="suspended">
              Suspended
            </option>

            <option value="pending">
              Pending
            </option>
          </select>

          <select
            value={verificationFilter}
            onChange={(event) =>
              setVerificationFilter(
                event.target.value,
              )
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Verification Status
            </option>

            <option value="verified">
              Verified
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="unverified">
              Unverified
            </option>
          </select>
        </div>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  User
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Verification
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Orders
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Volume
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Registered
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(
                (user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {user.fullName}
                        </p>

                        <p className="text-xs text-slate-500">
                          @{user.username}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {getVerificationBadge(
                        user.verificationStatus,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      {getStatusBadge(
                        user.status,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {user.completedOrders}
                      </p>

                      <p className="text-xs text-slate-500">
                        of {user.totalOrders}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {formatCurrency(
                          user.tradingVolumeNGN,
                        )}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(
                        user.registeredAt,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            setSelectedUser(
                              user,
                            )
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          title="View user"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() =>
                            toggleUserStatus(
                              user.id,
                            )
                          }
                          className={`rounded-lg p-2 ${
                            user.status ===
                            "suspended"
                              ? "text-green-600 hover:bg-green-50"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                          title={
                            user.status ===
                            "suspended"
                              ? "Activate user"
                              : "Suspend user"
                          }
                        >
                          {user.status ===
                          "suspended" ? (
                            <CheckCircle2
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

        {filteredUsers.length === 0 && (
          <div className="p-10 text-center">
            <Users
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No users found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </Card>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {filteredUsers.map(
          (user) => (
            <Card
              key={user.id}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {user.fullName}
                  </p>

                  <p className="text-xs text-slate-500">
                    @{user.username}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {user.email}
                  </p>
                </div>

                {getStatusBadge(
                  user.status,
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Verification
                  </p>

                  <div className="mt-1">
                    {getVerificationBadge(
                      user.verificationStatus,
                    )}
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Orders
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {user.completedOrders} /{" "}
                    {user.totalOrders}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Trading Volume
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatCurrency(
                      user.tradingVolumeNGN,
                    )}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">
                    Registered
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {formatDate(
                      user.registeredAt,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() =>
                    setSelectedUser(user)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() =>
                    toggleUserStatus(
                      user.id,
                    )
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                    user.status ===
                    "suspended"
                      ? "bg-green-50 text-green-700 hover:bg-green-100"
                      : "bg-red-50 text-red-700 hover:bg-red-100"
                  }`}
                >
                  {user.status ===
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

        {filteredUsers.length === 0 && (
          <Card className="p-10 text-center">
            <Users
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No users found
            </p>
          </Card>
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  User Details
                </h2>

                <p className="text-sm text-slate-500">
                  @{selectedUser.username}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Full Name
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {selectedUser.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Email
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {selectedUser.phone}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Account Status
                  </p>

                  <div className="mt-1">
                    {getStatusBadge(
                      selectedUser.status,
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Verification
                  </p>

                  <div className="mt-1">
                    {getVerificationBadge(
                      selectedUser.verificationStatus,
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Completed Orders
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {
                      selectedUser.completedOrders
                    }
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">
                    Trading Volume
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatCurrency(
                      selectedUser.tradingVolumeNGN,
                    )}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  toggleUserStatus(
                    selectedUser.id,
                  );
                  setSelectedUser(null);
                }}
                className={`w-full rounded-lg px-4 py-3 text-sm font-semibold ${
                  selectedUser.status ===
                  "suspended"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {selectedUser.status ===
                "suspended"
                  ? "Activate User"
                  : "Suspend User"}
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
          User records are demonstration data.
          Account status changes currently exist
          only in the frontend state and will later
          be connected to the backend.
        </p>
      </div>
    </div>
  );
}

export default AdminUsers;