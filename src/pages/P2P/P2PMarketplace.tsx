import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  Search,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { p2pOffers } from "../../data/p2pOffers";

import type { CryptoSymbol } from "../../types/crypto.types";
import type { TradeType } from "../../types/p2p.types";

function P2PMarketplace() {
  const [tradeType, setTradeType] = useState<TradeType>("buy");
  const [selectedCrypto, setSelectedCrypto] =
    useState<CryptoSymbol>("BTC");

  const [showFilters, setShowFilters] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOffers = useMemo(() => {
    return p2pOffers.filter((offer) => {
      const matchesTradeType =
        offer.tradeType === tradeType;

      const matchesCrypto =
        offer.crypto === selectedCrypto;

      const matchesPayment =
        paymentFilter === "All" ||
        offer.paymentMethods.some(
          (method) =>
            method.displayName === paymentFilter,
        );

      const matchesSearch =
        offer.trader.displayName
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchesTradeType &&
        matchesCrypto &&
        matchesPayment &&
        matchesSearch
      );
    });
  }, [
    tradeType,
    selectedCrypto,
    paymentFilter,
    search,
  ]);

  const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG")}`;

  return (
    <div className="mx-auto max-w-7xl">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-blue-600"
              />

              <span className="text-sm font-medium text-blue-600">
                Secure P2P Trading
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              P2P Marketplace
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Buy and sell crypto directly with verified traders.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />

            <span className="text-xs font-semibold text-green-700">
              Marketplace Online
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTROL CARD */}
      <Card className="mb-6 overflow-hidden">
        {/* BUY / SELL TABS */}
        <div className="border-b border-slate-200 px-4 pt-4 sm:px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setTradeType("buy")}
              className={`relative pb-4 text-sm font-semibold transition ${
                tradeType === "buy"
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Buy Crypto

              {tradeType === "buy" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
              )}
            </button>

            <button
              onClick={() => setTradeType("sell")}
              className={`relative pb-4 text-sm font-semibold transition ${
                tradeType === "sell"
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Sell Crypto

              {tradeType === "sell" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="p-4 sm:p-6">
          <div className="grid gap-3 md:grid-cols-[180px_180px_1fr_auto]">
            {/* CRYPTO SELECTOR */}
            <div className="relative">
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                Crypto
              </label>

              <div className="relative">
                <select
                  value={selectedCrypto}
                  onChange={(e) =>
                    setSelectedCrypto(
                      e.target.value as CryptoSymbol,
                    )
                  }
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500"
                >
                  <option value="BTC">
                    ₿ Bitcoin (BTC)
                  </option>

                  <option value="ETH">
                    Ξ Ethereum (ETH)
                  </option>

                  <option value="USDT">
                    ₮ Tether (USDT)
                  </option>

                  <option value="USDC">
                    $ USD Coin (USDC)
                  </option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3 text-slate-400"
                />
              </div>
            </div>

            {/* CURRENCY */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                Fiat Currency
              </label>

              <div className="flex h-[42px] items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700">
                🇳🇬 NGN — Nigerian Naira
              </div>
            </div>

            {/* SEARCH */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500">
                Search Trader
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search trader..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="h-[42px] w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500"
                />
              </div>
            </div>

            {/* FILTER BUTTON */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() =>
                  setShowFilters(!showFilters)
                }
                className="h-[42px] w-full md:w-auto"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* FILTER PANEL */}
          {showFilters && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="w-full sm:max-w-xs">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Payment Method
                  </label>

                  <select
                    value={paymentFilter}
                    onChange={(e) =>
                      setPaymentFilter(e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="All">
                      All Payment Methods
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>

                    <option value="OPay">
                      OPay
                    </option>

                    <option value="PalmPay">
                      PalmPay
                    </option>

                    <option value="Moniepoint">
                      Moniepoint
                    </option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setPaymentFilter("All");
                    setSearch("");
                  }}
                  className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-red-500"
                >
                  <X size={15} />
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* MARKETPLACE SUMMARY */}
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {tradeType === "buy"
              ? "Buy Offers"
              : "Sell Offers"}
          </h2>

          <p className="text-sm text-slate-500">
            {filteredOffers.length} offers available
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock3 size={15} />
          Prices shown are demo marketplace data
        </div>
      </div>

      {/* OFFER LIST */}
      <div className="space-y-4">
        {filteredOffers.length === 0 ? (
          <Card className="p-10 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <Search
                size={22}
                className="text-slate-400"
              />
            </div>

            <h3 className="font-semibold text-slate-900">
              No offers found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your filters or search.
            </p>
          </Card>
        ) : (
          filteredOffers.map((offer) => (
            <Card
              key={offer.id}
              className="overflow-hidden transition hover:shadow-md"
            >
              <div className="p-4 sm:p-5">
                <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-center">
                  {/* TRADER */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                        {offer.trader.displayName
                          .slice(0, 2)
                          .toUpperCase()}

                        {offer.trader.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {offer.trader.displayName}
                          </p>

                          {offer.trader.verificationStatus ===
                            "verified" && (
                            <CheckCircle2
                              size={15}
                              className="shrink-0 text-blue-600"
                            />
                          )}
                        </div>

                        <p className="text-xs text-slate-500">
                          @{offer.trader.username}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="success">
                        {`${offer.trader.completionRate}% completion`}
                      </Badge>

                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <UserCheck size={13} />
                        {offer.trader.completedOrders.toLocaleString()} orders
                      </span>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Price
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {formatNaira(offer.price)}
                    </p>

                    <p className="text-xs text-slate-500">
                      per {offer.crypto}
                    </p>
                  </div>

                  {/* AMOUNT */}
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Available
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatNaira(
                        offer.availableAmount,
                      )}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Limit:{" "}
                      {formatNaira(
                        offer.minimumAmount,
                      )}{" "}
                      -{" "}
                      {formatNaira(
                        offer.maximumAmount,
                      )}
                    </p>
                  </div>

                  {/* ACTION */}
                  <div className="lg:text-right">
                    <Button
                      size="md"
                      className="w-full lg:min-w-28 lg:w-auto"
                    >
                      {tradeType === "buy"
                        ? "Buy"
                        : "Sell"}{" "}
                      {offer.crypto}
                    </Button>
                  </div>
                </div>

                {/* BOTTOM INFORMATION */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="mb-2 text-xs font-medium text-slate-400">
                        Payment Methods
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {offer.paymentMethods.map(
                          (method) => (
                            <span
                              key={method.id}
                              className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700"
                            >
                              {method.displayName}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck
                        size={15}
                        className="text-green-600"
                      />

                      <span>
                        Verified trader • Response{" "}
                        {offer.trader.responseTimeMinutes} min
                      </span>
                    </div>
                  </div>

                  {offer.terms && (
                    <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2">
                      <p className="text-xs leading-5 text-slate-500">
                        <span className="font-semibold text-slate-700">
                          Trader terms:
                        </span>{" "}
                        {offer.terms}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default P2PMarketplace;