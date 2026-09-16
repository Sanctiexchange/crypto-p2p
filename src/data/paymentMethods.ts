import type { PaymentMethod } from "../types/payment.types";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm-bank",
    type: "bank_transfer",
    name: "bank_transfer",
    displayName: "Bank Transfer",
  },

  {
    id: "pm-opay",
    type: "opay",
    name: "opay",
    displayName: "OPay",
  },

  {
    id: "pm-palmpay",
    type: "palmpay",
    name: "palmpay",
    displayName: "PalmPay",
  },

  {
    id: "pm-moniepoint",
    type: "moniepoint",
    name: "moniepoint",
    displayName: "Moniepoint",
  },
];