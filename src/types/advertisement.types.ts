import type {
  CryptoSymbol,
  FiatCurrency,
} from "./crypto.types";

import type { PaymentMethodType } from "./payment.types";

export type AdvertisementType =
  | "buy"
  | "sell";

export type AdvertisementStatus =
  | "active"
  | "paused"
  | "completed";

export interface P2PAdvertisement {
  id: string;
  merchantId: string;

  type: AdvertisementType;

  crypto: CryptoSymbol;
  fiatCurrency: FiatCurrency;

  price: number;

  availableAmount: number;

  minimumAmount: number;
  maximumAmount: number;

  paymentMethods: PaymentMethodType[];

  terms: string;

  status: AdvertisementStatus;

  createdAt: string;
}