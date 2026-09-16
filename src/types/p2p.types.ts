import type {
  CryptoSymbol,
  FiatCurrency,
} from "./crypto.types";

import type { PaymentMethod } from "./payment.types";

import type { Trader } from "./user.types";

export type TradeType = "buy" | "sell";

export type OfferStatus =
  | "active"
  | "paused"
  | "completed";

export interface P2POffer {
  id: string;

  trader: Trader;

  tradeType: TradeType;

  crypto: CryptoSymbol;

  fiatCurrency: FiatCurrency;

  price: number;

  availableAmount: number;

  minimumAmount: number;

  maximumAmount: number;

  paymentMethods: PaymentMethod[];

  terms?: string;

  status: OfferStatus;

  createdAt: string;
}