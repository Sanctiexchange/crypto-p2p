import type { CryptoSymbol } from "./crypto.types";

export interface WalletAsset {
  symbol: CryptoSymbol;
  name: string;
  icon: string;
  availableBalance: number;
  lockedBalance: number;
  priceNGN: number;
}

export type WalletTransactionType =
  | "deposit"
  | "withdrawal"
  | "trade";

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  crypto: CryptoSymbol;
  amount: number;
  createdAt: string;
  status: "completed" | "pending" | "failed";
}