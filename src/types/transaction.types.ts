export type TransactionType =
  | "deposit"
  | "withdrawal"
  | "p2p_buy"
  | "p2p_sell";

export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled";

export interface Transaction {
  id: string;
  reference: string;
  type: TransactionType;
  crypto: string;
  cryptoAmount: number;
  fiatCurrency: string;
  fiatAmount: number;
  status: TransactionStatus;
  paymentMethod?: string;
  counterparty?: string;
  createdAt: string;
}