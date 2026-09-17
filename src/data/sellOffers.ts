import type { P2POffer } from "../types/p2p.types";

import { paymentMethods } from "./paymentMethods";
import { traders } from "./traders";

export const sellOffers: P2POffer[] = [
  {
    id: "sell-offer-001",

    trader: traders[2],

    tradeType: "sell",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 161800000,

    availableAmount: 6500000,

    minimumAmount: 10000,

    maximumAmount: 6500000,

    paymentMethods: [
      paymentMethods[0],
      paymentMethods[3],
    ],

    terms:
      "Payment must be completed within the order window. Only verified users are accepted.",

    status: "active",

    createdAt: "2026-09-17T08:00:00Z",
  },

  {
    id: "sell-offer-002",

    trader: traders[0],

    tradeType: "sell",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 162400000,

    availableAmount: 4000000,

    minimumAmount: 5000,

    maximumAmount: 4000000,

    paymentMethods: [
      paymentMethods[0],
    ],

    terms:
      "Fast release after payment confirmation.",

    status: "active",

    createdAt: "2026-09-17T08:05:00Z",
  },

  {
    id: "sell-offer-003",

    trader: traders[1],

    tradeType: "sell",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 163000000,

    availableAmount: 3000000,

    minimumAmount: 10000,

    maximumAmount: 3000000,

    paymentMethods: [
      paymentMethods[1],
    ],

    terms:
      "OPay payments accepted. Please use the exact order amount.",

    status: "active",

    createdAt: "2026-09-17T08:10:00Z",
  },

  {
    id: "sell-offer-004",

    trader: traders[3],

    tradeType: "sell",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 163700000,

    availableAmount: 1800000,

    minimumAmount: 15000,

    maximumAmount: 1800000,

    paymentMethods: [
      paymentMethods[2],
    ],

    terms:
      "PalmPay payments only. Please complete payment promptly.",

    status: "active",

    createdAt: "2026-09-17T08:15:00Z",
  },
];