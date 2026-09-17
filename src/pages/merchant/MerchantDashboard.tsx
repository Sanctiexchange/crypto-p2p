import {
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  BarChart3,
  CheckCircle2,
  Clock3,
  Plus,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { merchantProfile } from "../../data/merchant";

function MerchantDashboard() {
  const navigate = useNavigate();

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      maximumFractionDigits: 0,
    })}`;

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">
            P2P Merchant
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Merchant Dashboard
            </h1>

            <Badge variant="success">
              Verified Merchant
            </Badge>
          </div>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Manage your P2P advertisements and trading
            activity.
          </p>
        </div>

        <Button
          onClick={() =>
            navigate("/merchant/ads/create")
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

      {/* Merchant Profile */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
            SP
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                {merchantProfile.displayName}
              </h2>

              <Badge variant="success">
                Approved
              </Badge>

              <Badge variant="info">
                {merchantProfile.tier
                  .charAt(0)
                  .toUpperCase() +
                  merchantProfile.tier.slice(1)}
              </Badge>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Merchant ID: {merchantProfile.id}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 px-4 py-3">
            <p className="text-xs font-semibold text-green-700">
              Response Time
            </p>

            <p className="mt-1 text-lg font-bold text-green-800">
              {merchantProfile.responseTimeMinutes} min
            </p>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <CheckCircle2 size={20} />
            </div>

            <span className="text-xs font-semibold text-green-600">
              +12.4%
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Completed Orders
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {merchantProfile.completedOrders.toLocaleString()}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <BarChart3 size={20} />
            </div>

            <span className="text-xs font-semibold text-green-600">
              {merchantProfile.completionRate}%
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Completion Rate
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {merchantProfile.completionRate}%
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Wallet size={20} />
            </div>

            <span className="text-xs text-slate-400">
              Lifetime
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Trading Volume
          </p>

          <p className="mt-1 wrap-break-words text-2xl font-bold text-slate-900">
            {formatNaira(
              merchantProfile.totalVolumeNGN,
            )}
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <Activity size={20} />
            </div>

            <span className="text-xs text-slate-400">
              Currently
            </span>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Active Advertisements
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {merchantProfile.activeAds}
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ArrowDownToLine size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900">
                Buy Crypto
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Create advertisements to buy crypto from
                other P2P users.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/merchant/ads/create?type=buy",
                  )
                }
                className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Create Buy Advertisement →
              </button>
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ArrowUpFromLine size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="text-sm font-bold text-slate-900">
                Sell Crypto
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Create advertisements to sell crypto to
                other P2P users.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/merchant/ads/create?type=sell",
                  )
                }
                className="mt-4 text-xs font-semibold text-green-600 hover:text-green-700"
              >
                Create Sell Advertisement →
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Merchant Performance */}
      <Card className="mb-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck
              size={19}
              className="text-blue-600"
            />

            <h2 className="text-sm font-bold text-slate-900">
              Merchant Performance
            </h2>
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Your current performance indicators as a P2P
            merchant.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Total Orders
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {merchantProfile.totalOrders.toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Completion Rate
            </p>

            <p className="mt-1 text-lg font-bold text-green-600">
              {merchantProfile.completionRate}%
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Average Response
            </p>

            <p className="mt-1 flex items-center gap-1 text-lg font-bold text-slate-900">
              <Clock3 size={17} />
              {merchantProfile.responseTimeMinutes} min
            </p>
          </div>
        </div>
      </Card>

      {/* Demo Notice */}
      <Card className="border-blue-100 bg-blue-50 p-4 sm:p-5">
        <p className="text-sm font-semibold text-blue-800">
          Merchant Demo
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          Merchant statistics and status are currently
          simulated for the frontend prototype. Real merchant
          verification, balances, trading volume and
          performance calculations will be connected to the
          backend later.
        </p>
      </Card>
    </div>
  );
}

export default MerchantDashboard;