import {
  Banknote,
  CheckCircle2,
  CreditCard,
  CirclePlus,
  MoreVertical,
  Smartphone,
  Trash2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import type {
  PaymentMethod,
  PaymentMethodType,
} from "../../types/payment.types";

import {
  deletePaymentMethod,
  getPaymentMethods,
  setDefaultPaymentMethod,
} from "../../utility/paymentMethodStorage";

function PaymentMethods() {
  const [
    paymentMethods,
    setPaymentMethods,
  ] = useState<PaymentMethod[]>([]);

  const [showForm, setShowForm] =
    useState(false);

  const [methodType, setMethodType] =
    useState<PaymentMethodType>(
      "bank_transfer",
    );

  const [accountName, setAccountName] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [bankName, setBankName] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    setPaymentMethods(
      getPaymentMethods(),
    );
  }, []);

  const resetForm = () => {
    setMethodType("bank_transfer");
    setAccountName("");
    setAccountNumber("");
    setBankName("");
    setError("");
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };

  const getDisplayName = (
    type: PaymentMethodType,
  ) => {
    const names: Record<
      PaymentMethodType,
      string
    > = {
      bank_transfer: "Bank Transfer",
      opay: "OPay",
      palmpay: "PalmPay",
      moniepoint: "Moniepoint",
      cash_deposit: "Cash Deposit",
    };

    return names[type];
  };

  const getIcon = (
    type: PaymentMethodType,
  ) => {
    if (type === "bank_transfer") {
      return <Banknote size={21} />;
    }

    if (type === "cash_deposit") {
      return <CreditCard size={21} />;
    }

    return <Smartphone size={21} />;
  };

  const getIconBackground = (
    type: PaymentMethodType,
  ) => {
    if (type === "bank_transfer") {
      return "bg-blue-50 text-blue-600";
    }

    if (type === "opay") {
      return "bg-green-50 text-green-600";
    }

    if (type === "palmpay") {
      return "bg-purple-50 text-purple-600";
    }

    return "bg-slate-100 text-slate-600";
  };

  const handleAddPaymentMethod = () => {
    setError("");

    if (!accountName.trim()) {
      setError(
        "Please enter the account name.",
      );
      return;
    }

    if (!accountNumber.trim()) {
      setError(
        "Please enter the account number.",
      );
      return;
    }

    if (
      methodType === "bank_transfer" &&
      !bankName.trim()
    ) {
      setError(
        "Please enter the bank name.",
      );
      return;
    }

    const newPaymentMethod: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type: methodType,
      name: methodType,
      displayName:
        getDisplayName(methodType),
      accountName:
        accountName.trim(),
      accountNumber:
        accountNumber.trim(),
      bankName:
        methodType === "bank_transfer"
          ? bankName.trim()
          : undefined,
      isDefault:
        paymentMethods.length === 0,
      isActive: true,
    };

    const updated = [
      ...paymentMethods,
      newPaymentMethod,
    ];

    localStorage.setItem(
      "cryptoP2PPaymentMethods",
      JSON.stringify(updated),
    );

    setPaymentMethods(updated);

    closeForm();
  };

  const handleDelete = (
    paymentMethodId: string,
  ) => {
    deletePaymentMethod(
      paymentMethodId,
    );

    setPaymentMethods(
      getPaymentMethods(),
    );
  };

  const handleSetDefault = (
    paymentMethodId: string,
  ) => {
    setDefaultPaymentMethod(
      paymentMethodId,
    );

    setPaymentMethods(
      getPaymentMethods(),
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl min-w-0">
      {/* Header */}
      <div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-blue-600">
            Account
          </p>

          <h1 className="mt-1 wrap-break-words text-2xl font-bold text-slate-900">
            Payment Methods
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Manage the payment accounts you use for P2P
            trading.
          </p>
        </div>

        <Button
          onClick={() =>
            setShowForm(true)
          }
          className="w-full shrink-0 sm:w-auto"
        >
          <CirclePlus
            size={18}
            className="mr-2"
          />
          Add Payment Method
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="mb-6 min-w-0 overflow-hidden p-4 sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Add Payment Method
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Add the account details buyers or sellers
              will use during P2P trades.
            </p>
          </div>

          <div className="grid min-w-0 gap-5 sm:grid-cols-2">
            {/* Payment Type */}
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Payment Type
              </label>

              <select
                value={methodType}
                onChange={(event) =>
                  setMethodType(
                    event.target
                      .value as PaymentMethodType,
                  )
                }
                className="w-full min-w-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="bank_transfer">
                  Bank Transfer
                </option>

                <option value="opay">
                  OPay
                </option>

                <option value="palmpay">
                  PalmPay
                </option>

                <option value="moniepoint">
                  Moniepoint
                </option>

                <option value="cash_deposit">
                  Cash Deposit
                </option>
              </select>
            </div>

            {/* Account Name */}
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Account Name
              </label>

              <input
                type="text"
                value={accountName}
                onChange={(event) =>
                  setAccountName(
                    event.target.value,
                  )
                }
                placeholder="e.g. Sanctus Ekeh"
                className="w-full min-w-0 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Account Number */}
            <div className="min-w-0">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Account Number
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={accountNumber}
                onChange={(event) =>
                  setAccountNumber(
                    event.target.value,
                  )
                }
                placeholder="Enter account number"
                className="w-full min-w-0 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Bank */}
            {methodType ===
              "bank_transfer" && (
              <div className="min-w-0">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Bank Name
                </label>

                <input
                  type="text"
                  value={bankName}
                  onChange={(event) =>
                    setBankName(
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Access Bank"
                  className="w-full min-w-0 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="mt-5 wrap-break-words rounded-lg border border-red-100 bg-red-50 p-3 text-sm leading-5 text-red-700">
              {error}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={closeForm}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              onClick={
                handleAddPaymentMethod
              }
              className="w-full sm:w-auto"
            >
              Save Payment Method
            </Button>
          </div>
        </Card>
      )}

      {/* Payment Methods */}
      {paymentMethods.length === 0 ? (
        <Card className="min-w-0 overflow-hidden p-8 text-center sm:p-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <CreditCard
              size={25}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            No payment methods
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Add a payment method to start creating and
            accepting P2P offers.
          </p>

          <Button
            className="mt-6 w-full sm:w-auto"
            onClick={() =>
              setShowForm(true)
            }
          >
            Add Payment Method
          </Button>
        </Card>
      ) : (
        <div className="min-w-0 space-y-4">
          {paymentMethods.map(
            (method) => (
              <Card
                key={method.id}
                className="min-w-0 overflow-hidden p-4 sm:p-6"
              >
                {/* Main Method Information */}
                <div className="flex min-w-0 flex-col gap-5">
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${getIconBackground(
                        method.type,
                      )}`}
                    >
                      {getIcon(
                        method.type,
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <h2 className="min-w-0 wrap-break-words font-bold text-slate-900">
                          {method.displayName}
                        </h2>

                        {method.isDefault && (
                          <Badge variant="success">
                            Default
                          </Badge>
                        )}

                        {method.isActive && (
                          <Badge variant="info">
                            Active
                          </Badge>
                        )}
                      </div>

                      <p className="mt-1 wrap-break-words text-sm text-slate-500">
                        {method.accountName}
                      </p>

                      <p className="mt-1 break-all text-xs leading-5 text-slate-400">
                        {method.accountNumber}

                        {method.bankName &&
                          ` • ${method.bankName}`}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex min-w-0 flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleSetDefault(
                            method.id,
                          )
                        }
                        className="w-full sm:w-auto"
                      >
                        Set Default
                      </Button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          method.id,
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>

                    <button
                      type="button"
                      className="hidden rounded-lg p-2.5 text-slate-400 hover:bg-slate-100 sm:block"
                      title="More options"
                    >
                      <MoreVertical
                        size={18}
                      />
                    </button>
                  </div>
                </div>

                {/* Security / Usage Notice */}
                <div className="mt-5 flex min-w-0 items-start gap-2 rounded-lg bg-slate-50 p-3">
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <p className="min-w-0 wrap-break-words text-xs leading-5 text-slate-500">
                    This payment method can be used when
                    creating or accepting P2P trading offers.
                  </p>
                </div>
              </Card>
            ),
          )}
        </div>
      )}

      {/* Security Notice */}
      <Card className="mt-6 min-w-0 overflow-hidden border-blue-100 bg-blue-50 p-4 sm:p-5">
        <p className="text-sm font-semibold text-blue-800">
          Payment Security
        </p>

        <p className="mt-1 wrap-break-words text-xs leading-5 text-blue-700">
          Payment details are currently stored locally in
          your browser for this frontend prototype. In the
          production version, sensitive payment information
          will be protected by the backend and appropriate
          security controls.
        </p>
      </Card>
    </div>
  );
}

export default PaymentMethods;