export type OrderStatus =
  | "pending"
  | "payment_pending"
  | "paid"
  | "crypto_released"
  | "completed"
  | "cancelled"
  | "disputed";

export interface P2POrder {
  id: string;
  orderNumber: string;

  offerId: string;

  tradeType: "buy" | "sell";

  crypto: string;
  fiatCurrency: string;

  cryptoAmount: number;
  fiatAmount: number;

  price: number;

  traderName: string;
  traderUsername: string;

  paymentMethod: string;

  status: OrderStatus;

  createdAt: string;
}