export type AdminFinancialTransactionType =
  | "deposit"
  | "withdrawal"
  | "p2p_buy"
  | "p2p_sell";

export type AdminFinancialTransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled"
  | "review";

export interface AdminFinancialTransaction {
  id: string;

  reference: string;

  userId: string;

  userName: string;

  type: AdminFinancialTransactionType;

  crypto: string;

  cryptoAmount: number;

  fiatCurrency: string;

  fiatAmount: number;

  status: AdminFinancialTransactionStatus;

  paymentMethod?: string;

  createdAt: string;

  isFlagged: boolean;

  adminNote?: string;
}