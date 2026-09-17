import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { p2pOffers } from "../../data/p2pOffers";
import { sellOffers } from "../../data/sellOffers";

import { saveOrder } from "../../utility/orderStorage";

function TradeReview() {
  const navigate = useNavigate();

  const { offerId } = useParams();

  const location = useLocation();

  const amount =
    (location.state as {
      amount?: number;
    })?.amount ?? 0;

  const allOffers = useMemo(() => {
    return [...p2pOffers, ...sellOffers];
  }, []);

  const offer = allOffers.find(
    (item) => item.id === offerId,
  );

  if (!offer || amount <= 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="p-10 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Trade information unavailable
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please return to the marketplace and select
            an offer again.
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

  const cryptoAmount =
    amount / offer.price;

  const paymentMethod =
    offer.paymentMethods[0]?.displayName ??
    "Bank Transfer";

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      maximumFractionDigits: 2,
    })}`;

  const createOrder = () => {
    const order: import("../../types/order.types").P2POrder =
      {
        id: `order-${Date.now()}`,

        orderNumber: `P2P-${Math.floor(
          10000000 + Math.random() * 90000000,
        )}`,

        offerId: offer.id,

        tradeType: offer.tradeType,

        crypto: offer.crypto,

        fiatCurrency: offer.fiatCurrency,

        cryptoAmount,

        fiatAmount: amount,

        price: offer.price,

        traderName:
          offer.trader.displayName,

        traderUsername:
          offer.trader.username,

        paymentMethod,

        status: "pending",

        createdAt: new Date().toISOString(),
      };

    saveOrder(order);

    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* BACK */}
      <button
        type="button"
        onClick={() =>
          navigate(
            `/p2p/offer/${offer.id}`,
          )
        }
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={17} />

        Back to Offer
      </button>

      {/* HEADER */}
      <div className="mb-6">
        <p className="text-sm font-medium text-blue-600">
          Trade Review
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Review Your Trade
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Check the details carefully before creating
          the order.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* TRADER */}
        <Card className="p-5">
          <h2 className="mb-5 text-sm font-bold text-slate-900">
            Trader
          </h2>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {offer.trader.displayName
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-slate-900">
                  {offer.trader.displayName}
                </p>

                <CheckCircle2
                  size={16}
                  className="text-blue-600"
                />
              </div>

              <p className="text-xs text-slate-500">
                @{offer.trader.username}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <Badge variant="success">
              {offer.trader.completionRate}% completion
            </Badge>
          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Payment Method
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {paymentMethod}
            </p>
          </div>
        </Card>

        {/* TRADE SUMMARY */}
        <Card className="p-5">
          <h2 className="mb-5 text-sm font-bold text-slate-900">
            Trade Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Trade Type
              </span>

              <span className="font-semibold capitalize text-slate-900">
                {offer.tradeType} {offer.crypto}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Price
              </span>

              <span className="font-semibold text-slate-900">
                {formatNaira(offer.price)}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">
                  Fiat Amount
                </span>

                <span className="text-lg font-bold text-slate-900">
                  {formatNaira(amount)}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Crypto Amount
              </span>

              <span className="text-lg font-bold text-blue-600">
                {cryptoAmount.toFixed(8)}{" "}
                {offer.crypto}
              </span>
            </div>
          </div>

          {/* SECURITY */}
          <div className="mt-6 flex gap-3 rounded-lg border border-green-100 bg-green-50 p-4">
            <ShieldCheck
              size={20}
              className="shrink-0 text-green-600"
            />

            <div>
              <p className="text-sm font-semibold text-green-800">
                Protected P2P Trade
              </p>

              <p className="mt-1 text-xs leading-5 text-green-700">
                This is a simulated transaction. No real
                payment or cryptocurrency will be transferred.
              </p>
            </div>
          </div>

          {/* CONFIRM */}
          <Button
            size="lg"
            onClick={createOrder}
            className="mt-6 w-full"
          >
            Confirm & Create Order
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default TradeReview;