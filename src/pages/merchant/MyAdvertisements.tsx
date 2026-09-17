import {
  ArrowLeft,
  Edit3,
  Pause,
  Play,
  Plus,
  Trash2,
  WalletCards,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";

import type {
  P2PAdvertisement,
} from "../../types/advertisement.types";

import {
  deleteAdvertisement,
  getAdvertisements,
  updateAdvertisement,
} from "../../utility/advertisementStorage";

function MyAdvertisements() {
  const navigate = useNavigate();

  const [advertisements, setAdvertisements] =
    useState<P2PAdvertisement[]>([]);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = () => {
    const allAdvertisements =
      getAdvertisements();

    const merchantAdvertisements =
      allAdvertisements.filter(
        (advertisement) =>
          advertisement.merchantId ===
          "merchant-001",
      );

    setAdvertisements(
      merchantAdvertisements,
    );
  };

  const handleToggleStatus = (
    advertisement: P2PAdvertisement,
  ) => {
    const updatedAdvertisement = {
      ...advertisement,
      status:
        advertisement.status === "active"
          ? "paused"
          : "active",
    } as P2PAdvertisement;

    updateAdvertisement(
      updatedAdvertisement,
    );

    loadAdvertisements();
  };

  const handleDelete = (
    advertisementId: string,
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this advertisement?",
      );

    if (!confirmed) {
      return;
    }

    deleteAdvertisement(
      advertisementId,
    );

    loadAdvertisements();
  };

  const getStatusBadge = (
    status: P2PAdvertisement["status"],
  ) => {
    if (status === "active") {
      return (
        <Badge variant="success">
          Active
        </Badge>
      );
    }

    if (status === "paused") {
      return (
        <Badge variant="warning">
          Paused
        </Badge>
      );
    }

    return (
      <Badge variant="neutral">
        Completed
      </Badge>
    );
  };

  const getTypeBadge = (
    type: P2PAdvertisement["type"],
  ) => {
    if (type === "buy") {
      return (
        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          Buy
        </span>
      );
    }

    return (
      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
        Sell
      </span>
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              P2P Merchant
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              My Advertisements
            </h1>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Manage your P2P buy and sell advertisements.
            </p>
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
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500">
            Total Ads
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {advertisements.length}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500">
            Active
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {
              advertisements.filter(
                (advertisement) =>
                  advertisement.status ===
                  "active",
              ).length
            }
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500">
            Paused
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {
              advertisements.filter(
                (advertisement) =>
                  advertisement.status ===
                  "paused",
              ).length
            }
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500">
            Completed
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-700">
            {
              advertisements.filter(
                (advertisement) =>
                  advertisement.status ===
                  "completed",
              ).length
            }
          </p>
        </Card>
      </div>

      {/* Advertisements */}
      {advertisements.length === 0 ? (
        <Card className="p-8 sm:p-12">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <WalletCards
                size={26}
                className="text-slate-500"
              />
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No advertisements yet
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create your first P2P advertisement to start
              offering crypto trades to other users.
            </p>

            <Button
              onClick={() =>
                navigate(
                  "/merchant/ads/create",
                )
              }
              className="mt-6"
            >
              <Plus
                size={18}
                className="mr-2"
              />
              Create Advertisement
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {advertisements.map(
            (advertisement) => (
              <Card
                key={advertisement.id}
                className="overflow-hidden"
              >
                {/* Top */}
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {getTypeBadge(
                          advertisement.type,
                        )}

                        {getStatusBadge(
                          advertisement.status,
                        )}
                      </div>

                      <h2 className="mt-3 text-lg font-bold text-slate-900">
                        {advertisement.crypto} /{" "}
                        {advertisement.fiatCurrency}
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Created{" "}
                        {new Date(
                          advertisement.createdAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/merchant/ads/${advertisement.id}/edit`,
                          )
                        }
                      >
                        <Edit3
                          size={15}
                          className="mr-1.5"
                        />
                        Edit
                      </Button>

                      {advertisement.status !==
                        "completed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleToggleStatus(
                              advertisement,
                            )
                          }
                        >
                          {advertisement.status ===
                          "active" ? (
                            <>
                              <Pause
                                size={15}
                                className="mr-1.5"
                              />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play
                                size={15}
                                className="mr-1.5"
                              />
                              Resume
                            </>
                          )}
                        </Button>
                      )}

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleDelete(
                            advertisement.id,
                          )
                        }
                      >
                        <Trash2
                          size={15}
                          className="mr-1.5"
                        />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-5 sm:p-6">
                  <div>
                    <p className="text-xs text-slate-500">
                      Price
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {advertisement.fiatCurrency}{" "}
                      {advertisement.price.toLocaleString()}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      per {advertisement.crypto}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Available
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {advertisement.availableAmount.toLocaleString()}{" "}
                      {advertisement.fiatCurrency}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Minimum Order
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {advertisement.minimumAmount.toLocaleString()}{" "}
                      {advertisement.fiatCurrency}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Maximum Order
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      {advertisement.maximumAmount.toLocaleString()}{" "}
                      {advertisement.fiatCurrency}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Payment Methods
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {advertisement.paymentMethods.map(
                        (method) => (
                          <span
                            key={method}
                            className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                          >
                            {method
                              .replace(
                                "_",
                                " ",
                              )
                              .replace(
                                /\b\w/g,
                                (letter) =>
                                  letter.toUpperCase(),
                              )}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Terms */}
                {advertisement.terms && (
                  <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-6">
                    <p className="text-xs font-semibold text-slate-500">
                      Trading Terms
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {advertisement.terms}
                    </p>
                  </div>
                )}
              </Card>
            ),
          )}
        </div>
      )}

      {/* Demo Notice */}
      <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-xs leading-5 text-blue-700">
          <strong>Demo mode:</strong>{" "}
          Advertisements are currently stored in your browser's
          localStorage. Backend synchronization will be added
          later.
        </p>
      </div>
    </div>
  );
}

export default MyAdvertisements;