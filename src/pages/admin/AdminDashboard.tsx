import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Megaphone,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";

import {
  adminActivities,
  adminStats,
} from "../../data/admin";

function AdminDashboard() {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-NG").format(value);

  const getActivityIcon = (
    type: string,
  ) => {
    switch (type) {
      case "merchant":
        return <ShieldCheck size={18} />;

      case "advertisement":
        return <Megaphone size={18} />;

      case "order":
        return <ShoppingBag size={18} />;

      case "dispute":
        return <AlertTriangle size={18} />;

      default:
        return <Users size={18} />;
    }
  };

  const getActivityBadge = (
    type: string,
  ) => {
    switch (type) {
      case "merchant":
        return {
          text: "Merchant",
          variant: "info" as const,
        };

      case "advertisement":
        return {
          text: "Advertisement",
          variant: "warning" as const,
        };

      case "order":
        return {
          text: "Order",
          variant: "success" as const,
        };

      case "dispute":
        return {
          text: "Dispute",
          variant: "danger" as const,
        };

      default:
        return {
          text: "User",
          variant: "neutral" as const,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Admin Dashboard
            </h1>

            <Badge variant="info">
              Admin
            </Badge>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage the Crypto P2P platform.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <CheckCircle2
            size={17}
            className="text-green-600"
          />
          System Operational
        </div>
      </div>

      {/* Main Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(
                  adminStats.totalUsers,
                )}
              </p>

              <p className="mt-1 text-xs text-green-600">
                {formatNumber(
                  adminStats.activeUsers,
                )}{" "}
                active users
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Users size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Active Merchants
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(
                  adminStats.totalMerchants,
                )}
              </p>

              <p className="mt-1 text-xs text-yellow-600">
                {adminStats.pendingMerchants}{" "}
                pending approval
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <ShieldCheck size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Advertisements
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(
                  adminStats.totalAdvertisements,
                )}
              </p>

              <p className="mt-1 text-xs text-yellow-600">
                {adminStats.pendingAdvertisements}{" "}
                awaiting review
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
              <Megaphone size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Orders
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {formatNumber(
                  adminStats.totalOrders,
                )}
              </p>

              <p className="mt-1 text-xs text-blue-600">
                {adminStats.activeOrders} active
                orders
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <ShoppingBag size={21} />
            </div>
          </div>
        </Card>
      </div>

      {/* Trading Volume */}
      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Platform Trading Volume
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {formatCurrency(
                  adminStats.totalTradingVolumeNGN,
                )}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <CircleDollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BarChart3 size={16} />
              Platform Volume
            </div>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatCurrency(
                adminStats.totalTradingVolumeNGN,
              )}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ShoppingBag size={16} />
              Orders
            </div>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatNumber(
                adminStats.totalOrders,
              )}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock3 size={16} />
              Active Orders
            </div>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatNumber(
                adminStats.activeOrders,
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* Pending Actions */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Pending Actions
          </h2>

          <p className="text-sm text-slate-500">
            Items requiring administrator attention.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Merchant Applications
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {adminStats.pendingMerchants}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Awaiting approval
                </p>
              </div>

              <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
                <ShieldCheck size={20} />
              </div>
            </div>

            <button className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Review applications
              <ArrowUpRight size={16} />
            </button>
          </Card>

          <Card className="p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Advertisement Approvals
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {adminStats.pendingAdvertisements}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Awaiting review
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                <Megaphone size={20} />
              </div>
            </div>

            <button className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Review advertisements
              <ArrowUpRight size={16} />
            </button>
          </Card>

          <Card className="p-5 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Open Disputes
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {adminStats.openDisputes}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Require investigation
                </p>
              </div>

              <div className="rounded-lg bg-red-50 p-3 text-red-600">
                <AlertTriangle size={20} />
              </div>
            </div>

            <button className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              Review disputes
              <ArrowUpRight size={16} />
            </button>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-bold text-slate-900">
            Recent Platform Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest events across the platform.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {adminActivities.map(
            (activity) => {
              const badge =
                getActivityBadge(
                  activity.type,
                );

              return (
                <div
                  key={activity.id}
                  className="flex gap-4 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    {getActivityIcon(
                      activity.type,
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {activity.title}
                      </p>

                      <Badge
                        variant={
                          badge.variant
                        }
                      >
                        {badge.text}
                      </Badge>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {activity.description}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(
                        activity.createdAt,
                      ).toLocaleString(
                        "en-NG",
                        {
                          dateStyle:
                            "medium",
                          timeStyle:
                            "short",
                        },
                      )}
                    </p>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </Card>

      {/* Demo Notice */}
      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-900">
          Admin Demo Mode
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          The figures and activities displayed here
          are demonstration data. They will later be
          replaced by live platform data from the
          backend API.
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;