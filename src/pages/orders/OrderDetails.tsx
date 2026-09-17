import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Copy,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import {
  getOrderById,
} from "../../utility/orderStorage";

function OrderDetails() {
  const navigate = useNavigate();

  const { orderId } = useParams();

  const [copied, setCopied] = useState(false);

  const order = orderId
    ? getOrderById(orderId)
    : undefined;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="p-10 text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Order not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This order does not exist or may have been
            removed.
          </p>

          <Button
            className="mt-6"
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </Button>
        </Card>
      </div>
    );
  }

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      maximumFractionDigits: 2,
    })}`;

  const copyOrderNumber = async () => {
    await navigator.clipboard.writeText(
      order.orderNumber,
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const statusLabel = {
    pending: "Order Created",
    payment_pending: "Payment Pending",
    paid: "Payment Confirmed",
    crypto_released: "Crypto Released",
    completed: "Completed",
    cancelled: "Cancelled",
    disputed: "Disputed",
  }[order.status];

  const statusVariant = {
    pending: "warning",
    payment_pending: "warning",
    paid: "info",
    crypto_released: "info",
    completed: "success",
    cancelled: "danger",
    disputed: "danger",
  } as const;

  const steps = [
    {
      label: "Order Created",
      completed: true,
    },
    {
      label: "Payment",
      completed: false,
    },
    {
      label: "Crypto Released",
      completed: false,
    },
    {
      label: "Completed",
      completed: false,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* BACK */}
      <button
        type="button"
        onClick={() => navigate("/orders")}
        className="mb-5 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={17} />

        Back to Orders
      </button>

      {/* HEADER */}
      <div className="mb-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              P2P Order
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">
                {order.orderNumber}
              </h1>

              <button
                type="button"
                onClick={copyOrderNumber}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                title="Copy order number"
              >
                <Copy size={15} />
              </button>

              {copied && (
                <span className="text-xs font-medium text-green-600">
                  Copied
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Created{" "}
              {new Date(
                order.createdAt,
              ).toLocaleString("en-NG")}
            </p>
          </div>

          <Badge
            variant={
              statusVariant[
                order.status
              ]
            }
          >
            {statusLabel}
          </Badge>
        </div>
      </div>

      {/* PROGRESS */}
      <Card className="mb-6 p-5 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Trade Progress
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Track the current state of your P2P order.
            </p>
          </div>

          <Clock3
            size={19}
            className="text-slate-400"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.label}
              className="relative"
            >
              {index > 0 && (
                <div className="absolute -left-4 top-4 hidden h-px w-4 bg-slate-200 sm:block" />
              )}

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    step.completed
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <span className="text-xs font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>

                <span
                  className={`text-xs font-semibold ${
                    step.completed
                      ? "text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* ORDER SUMMARY */}
        <Card className="p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-slate-900">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-500">
                Trade
              </span>

              <span className="font-semibold capitalize text-slate-900">
                {order.tradeType} {order.crypto}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-500">
                Price
              </span>

              <span className="font-semibold text-slate-900">
                {formatNaira(order.price)}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-sm text-slate-500">
                Crypto Amount
              </span>

              <span className="font-semibold text-slate-900">
                {order.cryptoAmount.toFixed(8)}{" "}
                {order.crypto}
              </span>
            </div>

            <div className="flex justify-between gap-4 border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500">
                Fiat Amount
              </span>

              <span className="text-xl font-bold text-slate-900">
                {formatNaira(order.fiatAmount)}
              </span>
            </div>
          </div>
        </Card>

        {/* TRADER */}
        <Card className="p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-bold text-slate-900">
            Trading With
          </h2>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              {order.traderName
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <p className="font-bold text-slate-900">
                {order.traderName}
              </p>

              <p className="text-xs text-slate-500">
                @{order.traderUsername}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Payment Method
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {order.paymentMethod}
            </p>
          </div>
        </Card>
      </div>

      {/* SECURITY */}
      <Card className="mt-6 border-green-100 bg-green-50 p-5">
        <div className="flex gap-3">
          <ShieldCheck
            size={21}
            className="shrink-0 text-green-600"
          />

          <div>
            <h2 className="text-sm font-bold text-green-800">
              P2P Trade Protection
            </h2>

            <p className="mt-1 text-xs leading-5 text-green-700">
              This order is currently protected by the
              platform's simulated escrow process. Real
              payment and blockchain settlement will be
              connected when the backend is implemented.
            </p>
          </div>
        </div>
      </Card>

      {/* ACTIONS */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button
          variant="outline"
          onClick={() => navigate("/p2p")}
          className="w-full sm:w-auto"
        >
          Back to Marketplace
        </Button>

        <Button
          variant="ghost"
          className="w-full sm:w-auto"
        >
          Contact Trader
        </Button>
      </div>
    </div>
  );
}

export default OrderDetails;