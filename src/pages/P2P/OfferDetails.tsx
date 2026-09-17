import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { p2pOffers } from "../../data/p2pOffers";
import { sellOffers } from "../../data/sellOffers";

function OfferDetails() {
  const navigate = useNavigate();

  const { offerId } = useParams();

  const [amount, setAmount] = useState("");

  const allOffers = useMemo(() => {
    return [...p2pOffers, ...sellOffers];
  }, []);

  const offer = allOffers.find(
    (item) => item.id === offerId,
  );

  if (!offer) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="p-10 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Offer not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The offer you're looking for does not exist.
          </p>

          <Button
            className="mt-6"
            onClick={() => navigate("/p2p")}
          >
            Back to Marketplace
          </Button>
        </Card>
      </div>
    );
  }

  const tradeAmount = Number(amount);

  const cryptoAmount =
    tradeAmount > 0
      ? tradeAmount / offer.price
      : 0;

  const isBelowMinimum =
    tradeAmount > 0 &&
    tradeAmount < offer.minimumAmount;

  const isAboveMaximum =
    tradeAmount > offer.maximumAmount;

  const isWithinLimits =
    tradeAmount > 0 &&
    !isBelowMinimum &&
    !isAboveMaximum;

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="mx-auto max-w-4xl">
      {/* BACK */}
      <button
        type="button"
        onClick={() => navigate("/p2p")}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Marketplace
      </button>

      {/* HEADER */}
      <div className="mb-6">
        <p className="text-sm font-medium text-blue-600">
          {offer.tradeType === "buy"
            ? "Buy"
            : "Sell"}{" "}
          {offer.crypto}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Trade with {offer.trader.displayName}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review this trader's offer before continuing.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* TRADER INFORMATION */}
        <Card className="p-5">
          <h2 className="mb-5 text-sm font-bold text-slate-900">
            Trader Information
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {offer.trader.displayName
                .slice(0, 2)
                .toUpperCase()}

              {offer.trader.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-slate-900">
                  {offer.trader.displayName}
                </p>

                {offer.trader.verificationStatus ===
                  "verified" && (
                  <CheckCircle2
                    size={16}
                    className="text-blue-600"
                  />
                )}
              </div>

              <p className="text-xs text-slate-500">
                @{offer.trader.username}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400">
                Completion
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {offer.trader.completionRate}%
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400">
                Orders
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {offer.trader.completedOrders.toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400">
                Response
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {offer.trader.responseTimeMinutes} min
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400">
                Status
              </p>

              <p className="mt-1 font-bold text-green-600">
                {offer.trader.isOnline
                  ? "Online"
                  : "Offline"}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-medium text-slate-400">
              Payment Methods
            </p>

            <div className="flex flex-wrap gap-2">
              {offer.paymentMethods.map(
                (method) => (
                  <Badge
                    key={method.id}
                    variant="info"
                  >
                    {method.displayName}
                  </Badge>
                ),
              )}
            </div>
          </div>
        </Card>

        {/* TRADE PANEL */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">
                Price
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatNaira(offer.price)}
              </p>

              <p className="text-xs text-slate-500">
                per {offer.crypto}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
              {offer.fiatCurrency}
            </div>
          </div>

          <div className="my-6 border-t border-slate-100" />

          <label className="text-sm font-semibold text-slate-800">
            Enter amount
          </label>

          <p className="mt-1 text-xs text-slate-500">
            Amount in Nigerian Naira
          </p>

          <div className="relative mt-3">
            <span className="absolute left-3 top-3 font-semibold text-slate-500">
              ₦
            </span>

            <input
              type="number"
              min="0"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="0.00"
              className="h-12 w-full rounded-lg border border-slate-200 pl-8 pr-4 text-lg font-semibold outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-2 flex justify-between text-xs">
            <span className="text-slate-400">
              Min: {formatNaira(offer.minimumAmount)}
            </span>

            <span className="text-slate-400">
              Max: {formatNaira(offer.maximumAmount)}
            </span>
          </div>

          {/* CALCULATION */}
          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                You pay
              </span>

              <span className="font-semibold text-slate-900">
                {formatNaira(tradeAmount)}
              </span>
            </div>

            <div className="mt-3 flex justify-between">
              <span className="text-sm text-slate-500">
                You receive
              </span>

              <span className="font-bold text-slate-900">
                {cryptoAmount.toFixed(8)} {offer.crypto}
              </span>
            </div>
          </div>

          {/* LIMIT WARNING */}
          {isBelowMinimum && (
            <p className="mt-3 text-xs font-medium text-red-600">
              Amount is below the trader's minimum limit.
            </p>
          )}

          {isAboveMaximum && (
            <p className="mt-3 text-xs font-medium text-red-600">
              Amount exceeds the trader's maximum limit.
            </p>
          )}

          {/* SECURITY */}
          <div className="mt-5 flex gap-3 rounded-lg border border-green-100 bg-green-50 p-3">
            <ShieldCheck
              size={18}
              className="shrink-0 text-green-600"
            />

            <p className="text-xs leading-5 text-green-700">
              Your crypto will remain protected during
              the P2P transaction process.
            </p>
          </div>

          {/* CONTINUE */}
          <Button
            size="lg"
            disabled={!isWithinLimits}
            className="mt-5 w-full"
          >
            Continue to Trade
          </Button>
        </Card>
      </div>

      {/* TERMS */}
      {offer.terms && (
        <Card className="mt-6 p-5">
          <h2 className="text-sm font-bold text-slate-900">
            Trader Terms
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {offer.terms}
          </p>
        </Card>
      )}
    </div>
  );
}

export default OfferDetails;