import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  EyeOff,
  History,
  LockKeyhole,
  WalletCards,
} from "lucide-react";

import { useMemo, useState } from "react";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import {
  walletAssets,
  walletTransactions,
} from "../../data/wallet";

function Wallet() {
  const [showBalance, setShowBalance] =
    useState(true);

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      maximumFractionDigits: 2,
    })}`;

  const totalAvailable = useMemo(() => {
    return walletAssets.reduce(
      (total, asset) =>
        total +
        asset.availableBalance *
          asset.priceNGN,
      0,
    );
  }, []);

  const totalLocked = useMemo(() => {
    return walletAssets.reduce(
      (total, asset) =>
        total +
        asset.lockedBalance *
          asset.priceNGN,
      0,
    );
  }, []);

  const totalPortfolio =
    totalAvailable + totalLocked;

  const maskBalance = "••••••••";

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          Assets
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Wallet
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your crypto assets and wallet balances.
        </p>
      </div>

      {/* Portfolio Summary */}
      <Card className="overflow-hidden">
        <div className="bg-slate-900 p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-400">
                  Total Portfolio Value
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowBalance(
                      (current) => !current,
                    )
                  }
                  className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                  aria-label="Toggle balance visibility"
                >
                  {showBalance ? (
                    <Eye size={17} />
                  ) : (
                    <EyeOff size={17} />
                  )}
                </button>
              </div>

              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                {showBalance
                  ? formatNaira(totalPortfolio)
                  : maskBalance}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Estimated value based on current demo prices
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <WalletCards size={24} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                  <WalletCards size={16} />
                </div>

                <span className="text-sm text-slate-400">
                  Available
                </span>
              </div>

              <p className="mt-3 text-lg font-bold">
                {showBalance
                  ? formatNaira(totalAvailable)
                  : maskBalance}
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/20 text-yellow-400">
                  <LockKeyhole size={16} />
                </div>

                <span className="text-sm text-slate-400">
                  Locked
                </span>
              </div>

              <p className="mt-3 text-lg font-bold">
                {showBalance
                  ? formatNaira(totalLocked)
                  : maskBalance}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:p-6">
          <Button
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowDownToLine
              size={18}
              className="mr-2"
            />
            Deposit
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowUpFromLine
              size={18}
              className="mr-2"
            />
            Withdraw
          </Button>
        </div>
      </Card>

      {/* Assets */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Your Assets
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Crypto balances available in your wallet.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="hidden border-b border-slate-200 bg-slate-50 px-5 py-4 lg:grid lg:grid-cols-[2fr_1.5fr_1.5fr_1.5fr]">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Asset
            </span>

            <span className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Available
            </span>

            <span className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Locked
            </span>

            <span className="text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Value
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {walletAssets.map((asset) => {
              const totalAmount =
                asset.availableBalance +
                asset.lockedBalance;

              const totalValue =
                totalAmount *
                asset.priceNGN;

              return (
                <div
                  key={asset.symbol}
                  className="p-5 transition hover:bg-slate-50"
                >
                  {/* Desktop */}
                  <div className="hidden lg:grid lg:grid-cols-[2fr_1.5fr_1.5fr_1.5fr] lg:items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                        {asset.icon}
                      </div>

                      <div>
                        <p className="font-bold text-slate-900">
                          {asset.symbol}
                        </p>

                        <p className="text-xs text-slate-500">
                          {asset.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        {showBalance
                          ? asset.availableBalance.toFixed(
                              8,
                            )
                          : maskBalance}
                      </p>

                      <p className="text-xs text-slate-400">
                        {asset.symbol}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-slate-700">
                        {showBalance
                          ? asset.lockedBalance.toFixed(
                              8,
                            )
                          : maskBalance}
                      </p>

                      <p className="text-xs text-slate-400">
                        {asset.symbol}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        {showBalance
                          ? formatNaira(totalValue)
                          : maskBalance}
                      </p>

                      <p className="text-xs text-slate-400">
                        ₦
                        {asset.priceNGN.toLocaleString(
                          "en-NG",
                        )}{" "}
                        / {asset.symbol}
                      </p>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="lg:hidden">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white">
                          {asset.icon}
                        </div>

                        <div>
                          <p className="font-bold text-slate-900">
                            {asset.symbol}
                          </p>

                          <p className="text-xs text-slate-500">
                            {asset.name}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          {showBalance
                            ? formatNaira(totalValue)
                            : maskBalance}
                        </p>

                        <p className="text-xs text-slate-400">
                          Total Value
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Available
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {showBalance
                            ? asset.availableBalance.toFixed(
                                8,
                              )
                            : maskBalance}{" "}
                          {asset.symbol}
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Locked
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {showBalance
                            ? asset.lockedBalance.toFixed(
                                8,
                              )
                            : maskBalance}{" "}
                          {asset.symbol}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Wallet Activity */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Wallet Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recent deposits, withdrawals and wallet movements.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="divide-y divide-slate-100">
            {walletTransactions.map(
              (transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <History size={18} />
                    </div>

                    <div>
                      <p className="font-semibold capitalize text-slate-900">
                        {transaction.type}
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

                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {transaction.amount}{" "}
                      {transaction.crypto}
                    </p>

                    <div className="mt-1">
                      <Badge
                        variant={
                          transaction.status ===
                          "completed"
                            ? "success"
                            : transaction.status ===
                                "pending"
                              ? "warning"
                              : "danger"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </Card>
      </div>

      {/* Demo Notice */}
      <Card className="mt-6 border-blue-100 bg-blue-50 p-5">
        <p className="text-sm font-semibold text-blue-800">
          Demo Wallet
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          These balances and transactions are simulated
          frontend data. Real blockchain wallets, deposits,
          withdrawals and on-chain balances will be connected
          during backend and blockchain integration.
        </p>
      </Card>
    </div>
  );
}

export default Wallet;