import {
  ArrowLeft,
  Info,
  Plus,
  ShieldCheck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import type {
  AdvertisementType,
  P2PAdvertisement,
} from "../../types/advertisement.types";

import type {
  CryptoSymbol,
  FiatCurrency,
} from "../../types/crypto.types";

import type {
  PaymentMethodType,
} from "../../types/payment.types";

import {
  getPaymentMethods,
} from "../../utility/paymentMethodStorage";

import {
  saveAdvertisement,
} from "../../utility/advertisementStorage";

function CreateAdvertisement() {
  const navigate = useNavigate();

  const location = useLocation();

  const queryParams =
    new URLSearchParams(
      location.search,
    );

  const initialType =
    queryParams.get("type") === "sell"
      ? "sell"
      : "buy";

  const [
    advertisementType,
    setAdvertisementType,
  ] =
    useState<AdvertisementType>(
      initialType,
    );

  const [crypto, setCrypto] =
    useState<CryptoSymbol>("BTC");

  const [
    fiatCurrency,
    setFiatCurrency,
  ] = useState<FiatCurrency>("NGN");

  const [price, setPrice] =
    useState("");

  const [
    availableAmount,
    setAvailableAmount,
  ] = useState("");

  const [
    minimumAmount,
    setMinimumAmount,
  ] = useState("");

  const [
    maximumAmount,
    setMaximumAmount,
  ] = useState("");

  const [terms, setTerms] =
    useState("");

  const [
    selectedPaymentMethods,
    setSelectedPaymentMethods,
  ] = useState<
    PaymentMethodType[]
  >([]);

  const [
    availablePaymentMethods,
    setAvailablePaymentMethods,
  ] = useState<
    PaymentMethodType[]
  >([]);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const methods =
      getPaymentMethods();

    setAvailablePaymentMethods(
      methods.map(
        (method) => method.type,
      ),
    );
  }, []);

  const paymentOptions: {
    value: PaymentMethodType;
    label: string;
  }[] = [
    {
      value: "bank_transfer",
      label: "Bank Transfer",
    },
    {
      value: "opay",
      label: "OPay",
    },
    {
      value: "palmpay",
      label: "PalmPay",
    },
    {
      value: "moniepoint",
      label: "Moniepoint",
    },
    {
      value: "cash_deposit",
      label: "Cash Deposit",
    },
  ];

  const togglePaymentMethod = (
    method: PaymentMethodType,
  ) => {
    setSelectedPaymentMethods(
      (current) =>
        current.includes(method)
          ? current.filter(
              (item) =>
                item !== method,
            )
          : [
              ...current,
              method,
            ],
    );
  };

  const handleSubmit = () => {
    setError("");

    const numericPrice =
      Number(price);

    const numericAvailable =
      Number(availableAmount);

    const numericMinimum =
      Number(minimumAmount);

    const numericMaximum =
      Number(maximumAmount);

    if (
      !numericPrice ||
      numericPrice <= 0
    ) {
      setError(
        "Please enter a valid price.",
      );
      return;
    }

    if (
      !numericAvailable ||
      numericAvailable <= 0
    ) {
      setError(
        "Please enter a valid available amount.",
      );
      return;
    }

    if (
      !numericMinimum ||
      numericMinimum <= 0
    ) {
      setError(
        "Please enter a valid minimum order amount.",
      );
      return;
    }

    if (
      !numericMaximum ||
      numericMaximum <= 0
    ) {
      setError(
        "Please enter a valid maximum order amount.",
      );
      return;
    }

    if (
      numericMinimum >
      numericMaximum
    ) {
      setError(
        "Minimum amount cannot be greater than maximum amount.",
      );
      return;
    }

    if (
      numericMaximum >
      numericAvailable
    ) {
      setError(
        "Maximum order amount cannot be greater than the available amount.",
      );
      return;
    }

    if (
      selectedPaymentMethods.length ===
      0
    ) {
      setError(
        "Please select at least one payment method.",
      );
      return;
    }

    if (!terms.trim()) {
      setError(
        "Please enter your trading terms.",
      );
      return;
    }

    const advertisement: P2PAdvertisement =
      {
        id: `ad-${Date.now()}`,

        merchantId:
          "merchant-001",

        type: advertisementType,

        crypto,

        fiatCurrency,

        price: numericPrice,

        availableAmount:
          numericAvailable,

        minimumAmount:
          numericMinimum,

        maximumAmount:
          numericMaximum,

        paymentMethods:
          selectedPaymentMethods,

        terms: terms.trim(),

        status: "active",

        createdAt:
          new Date().toISOString(),
      };

    saveAdvertisement(
      advertisement,
    );

    navigate("/merchant/ads");
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            navigate("/merchant")
          }
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Merchant Dashboard
        </button>

        <p className="text-sm font-semibold text-blue-600">
          P2P Merchant
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Create Advertisement
        </h1>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Create a buy or sell offer that other P2P users
          can trade against.
        </p>
      </div>

      {/* Buy / Sell */}
      <Card className="mb-6 p-5 sm:p-6">
        <h2 className="text-sm font-bold text-slate-900">
          Advertisement Type
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Choose whether you want to buy or sell crypto.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              setAdvertisementType("buy")
            }
            className={`rounded-xl border p-4 text-left transition ${
              advertisementType ===
              "buy"
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            <p
              className={`text-sm font-bold ${
                advertisementType ===
                "buy"
                  ? "text-blue-700"
                  : "text-slate-900"
              }`}
            >
              Buy Crypto
            </p>

            <p className="mt-1 text-xs text-slate-500">
              I want to buy crypto from users.
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              setAdvertisementType("sell")
            }
            className={`rounded-xl border p-4 text-left transition ${
              advertisementType ===
              "sell"
                ? "border-green-500 bg-green-50"
                : "border-slate-200 hover:bg-slate-50"
            }`}
          >
            <p
              className={`text-sm font-bold ${
                advertisementType ===
                "sell"
                  ? "text-green-700"
                  : "text-slate-900"
              }`}
            >
              Sell Crypto
            </p>

            <p className="mt-1 text-xs text-slate-500">
              I want to sell crypto to users.
            </p>
          </button>
        </div>
      </Card>

      {/* Asset */}
      <Card className="mb-6 p-5 sm:p-6">
        <h2 className="text-sm font-bold text-slate-900">
          Asset & Currency
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cryptocurrency
            </label>

            <select
              value={crypto}
              onChange={(event) =>
                setCrypto(
                  event.target
                    .value as CryptoSymbol,
                )
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="BTC">
                Bitcoin (BTC)
              </option>

              <option value="ETH">
                Ethereum (ETH)
              </option>

              <option value="USDT">
                Tether (USDT)
              </option>

              <option value="USDC">
                USD Coin (USDC)
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Fiat Currency
            </label>

            <select
              value={fiatCurrency}
              onChange={(event) =>
                setFiatCurrency(
                  event.target
                    .value as FiatCurrency,
                )
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="NGN">
                Nigerian Naira (NGN)
              </option>

              <option value="USD">
                US Dollar (USD)
              </option>

              <option value="EUR">
                Euro (EUR)
              </option>

              <option value="GBP">
                British Pound (GBP)
              </option>
            </select>
          </div>
        </div>
      </Card>

      {/* Pricing */}
      <Card className="mb-6 p-5 sm:p-6">
        <h2 className="text-sm font-bold text-slate-900">
          Pricing & Limits
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Price per {crypto}
            </label>

            <input
              type="number"
              min="0"
              value={price}
              onChange={(event) =>
                setPrice(
                  event.target.value,
                )
              }
              placeholder="e.g. 163000000"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              Price in {fiatCurrency}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Available Amount
            </label>

            <input
              type="number"
              min="0"
              value={availableAmount}
              onChange={(event) =>
                setAvailableAmount(
                  event.target.value,
                )
              }
              placeholder={`e.g. 5000000`}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              Maximum amount available for this advert.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Minimum Order
            </label>

            <input
              type="number"
              min="0"
              value={minimumAmount}
              onChange={(event) =>
                setMinimumAmount(
                  event.target.value,
                )
              }
              placeholder="e.g. 5000"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Maximum Order
            </label>

            <input
              type="number"
              min="0"
              value={maximumAmount}
              onChange={(event) =>
                setMaximumAmount(
                  event.target.value,
                )
              }
              placeholder="e.g. 5000000"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </Card>

      {/* Payment Methods */}
      <Card className="mb-6 p-5 sm:p-6">
        <h2 className="text-sm font-bold text-slate-900">
          Payment Methods
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Select the payment methods you are willing to use
          for this advertisement.
        </p>

        {availablePaymentMethods.length ===
        0 ? (
          <div className="mt-5 rounded-lg border border-yellow-100 bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <Info
                size={18}
                className="mt-0.5 shrink-0 text-yellow-600"
              />

              <div>
                <p className="text-sm font-semibold text-yellow-800">
                  No payment methods available
                </p>

                <p className="mt-1 text-xs leading-5 text-yellow-700">
                  Add a payment method in Account → Payment
                  Methods before creating an advertisement.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/settings/payment-methods",
                    )
                  }
                  className="mt-3 text-xs font-semibold text-yellow-800 underline"
                >
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {paymentOptions
              .filter(
                (option) =>
                  availablePaymentMethods.includes(
                    option.value,
                  ),
              )
              .map((option) => {
                const selected =
                  selectedPaymentMethods.includes(
                    option.value,
                  );

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      togglePaymentMethod(
                        option.value,
                      )
                    }
                    className={`flex items-center justify-between rounded-lg border p-4 text-left transition ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      {option.label}
                    </span>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        selected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300"
                      }`}
                    >
                      {selected && (
                        <span className="text-xs">
                          ✓
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
          </div>
        )}
      </Card>

      {/* Terms */}
      <Card className="mb-6 p-5 sm:p-6">
        <h2 className="text-sm font-bold text-slate-900">
          Trading Terms
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Explain any important conditions buyers or sellers
          should know before starting a trade.
        </p>

        <textarea
          value={terms}
          onChange={(event) =>
            setTerms(
              event.target.value,
            )
          }
          rows={5}
          placeholder="Example: Payment must be made from an account belonging to the verified user. Please complete payment within the order time."
          className="mt-5 w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </Card>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-700">
          {error}
        </div>
      )}

      {/* Protection */}
      <Card className="mb-6 border-green-100 bg-green-50 p-5">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-green-600"
          />

          <div>
            <p className="text-sm font-bold text-green-800">
              P2P Trade Protection
            </p>

            <p className="mt-1 text-xs leading-5 text-green-700">
              Trades created from this advertisement will be
              protected by the platform's escrow process when
              the production backend is connected.
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          onClick={() =>
            navigate("/merchant")
          }
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          className="w-full sm:w-auto"
        >
          <Plus
            size={18}
            className="mr-2"
          />
          Create Advertisement
        </Button>
      </div>
    </div>
  );
}

export default CreateAdvertisement;