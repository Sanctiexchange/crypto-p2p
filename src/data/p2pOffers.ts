import type { P2POffer } from "../types/p2p.types";

import { paymentMethods } from "./paymentMethods";
import { traders } from "./traders";

export const p2pOffers: P2POffer[] = [
  {
    id: "offer-001",

    trader: traders[0],

    tradeType: "buy",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 162500000,

    availableAmount: 5000000,

    minimumAmount: 5000,

    maximumAmount: 5000000,

    paymentMethods: [
      paymentMethods[0],
    ],

    terms:
      "Payment must be made from a bank account belonging to the buyer.",

    status: "active",

    createdAt: "2026-09-16T10:00:00Z",
  },

  {
    id: "offer-002",

    trader: traders[1],

    tradeType: "buy",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 163100000,

    availableAmount: 2500000,

    minimumAmount: 10000,

    maximumAmount: 2500000,

    paymentMethods: [
      paymentMethods[1],
    ],

    terms:
      "Fast payment. Please ensure your payment reference is included.",

    status: "active",

    createdAt: "2026-09-16T10:05:00Z",
  },

  {
    id: "offer-003",

    trader: traders[2],

    tradeType: "buy",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 164000000,

    availableAmount: 8000000,

    minimumAmount: 5000,

    maximumAmount: 8000000,

    paymentMethods: [
      paymentMethods[0],
      paymentMethods[3],
    ],

    terms:
      "Verified users preferred. Payment must be completed within the order time.",

    status: "active",

    createdAt: "2026-09-16T10:10:00Z",
  },

  {
    id: "offer-004",

    trader: traders[3],

    tradeType: "buy",

    crypto: "BTC",

    fiatCurrency: "NGN",

    price: 164800000,

    availableAmount: 1500000,

    minimumAmount: 10000,

    maximumAmount: 1500000,

    paymentMethods: [
      paymentMethods[2],
    ],

    terms:
      "Please make payment only after the order has been created.",

    status: "active",

    createdAt: "2026-09-16T10:15:00Z",
  },
];