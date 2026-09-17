import {
  ArrowRight,
  BarChart3,
  Clock3,
  Plus,
  ShoppingBag,
  TrendingUp,
  WalletCards,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

import { merchantProfile } from "../../data/merchant";

function MerchantDashboard() {
  const navigate = useNavigate();

  const formatCurrency = (
    amount: number,
  ) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600">
          P2P Merchant
        </p>

        <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Merchant Dashboard
            </h1>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Manage your P2P advertisements, orders and
              merchant performance.
            </p>
          </div>

          <Badge variant="success">
            Verified Merchant
          </Badge>
        </div>
      </div>

      {/* Merchant identity */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
              SP
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {merchantProfile.displayName}
                </h2>

                <Badge variant="info">
                  {merchantProfile.tier
                    .charAt(0)
                    .toUpperCase() +
                    merchantProfile.tier.slice(
                      1,
                    )}
                </Badge>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock3 size={14} />
                  {merchantProfile.responseTimeMinutes} min
                  response
                </span>

                <span>
                  {merchantProfile.completedOrders.toLocaleString()}{" "}
                  completed orders
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={() =>
              navigate(
                "/merchant/ads/create",
              )
            }
            className="w-full sm:w-auto"
          >
            <Plus
              size={18}
              className="mr-2"
            />
            Create Advertisement
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Completed Orders
            </p>

            <ShoppingBag
              size={18}
              className="text-slate-400"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {merchantProfile.completedOrders.toLocaleString()}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            of {merchantProfile.totalOrders.toLocaleString()} total
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Completion Rate
            </p>

            <TrendingUp
              size={18}
              className="text-green-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {merchantProfile.completionRate}%
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Trading performance
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Trading Volume
            </p>

            <BarChart3
              size={18}
              className="text-blue-500"
            />
          </div>

          <p className="mt-2 text-xl font-bold text-slate-900">
            {formatCurrency(
              merchantProfile.totalVolumeNGN,
            )}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Total processed volume
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Active Ads
            </p>

            <WalletCards
              size={18}
              className="text-purple-500"
            />
          </div>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {merchantProfile.activeAds}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Currently trading
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-bold text-slate-900">
          Merchant Tools
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/merchant/ads",
              )
            }
            className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <WalletCards size={20} />
              </div>

              <ArrowRight
                size={18}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600"
              />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              My Advertisements
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Create, edit, pause and manage your P2P offers.
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/merchant/orders",
              )
            }
            className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <ShoppingBag size={20} />
              </div>

              <ArrowRight
                size={18}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600"
              />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              Merchant Orders
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Monitor orders generated from your advertisements.
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/merchant/ads/create",
              )
            }
            className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Plus size={20} />
              </div>

              <ArrowRight
                size={18}
                className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-600"
              />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-900">
              New Advertisement
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Publish a new buy or sell advertisement.
            </p>
          </button>
        </div>
      </div>

      {/* Performance */}
      <Card className="mb-6 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Merchant Performance
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your current P2P trading metrics.
            </p>
          </div>

          <BarChart3
            size={20}
            className="text-slate-400"
          />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-500">
              Completion Rate
            </p>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  width: `${merchantProfile.completionRate}%`,
                }}
              />
            </div>

            <p className="mt-2 text-sm font-bold text-slate-900">
              {merchantProfile.completionRate}%
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Response Time
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {merchantProfile.responseTimeMinutes} min
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Average response
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Total Volume
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatCurrency(
                merchantProfile.totalVolumeNGN,
              )}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Processed volume
            </p>
          </div>
        </div>
      </Card>

      {/* Protection */}
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-xs leading-5 text-blue-700">
          <strong>Demo mode:</strong>{" "}
          Merchant statistics and advertisement data are
          currently frontend data. Live merchant performance,
          escrow, balances and order synchronization will be
          connected to the backend later.
        </p>
      </div>
    </div>
  );
}

export default MerchantDashboard;