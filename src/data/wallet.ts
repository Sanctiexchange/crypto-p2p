import type {
  WalletAsset,
  WalletTransaction,
} from "../types/wallet.types";

export const walletAssets: WalletAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "₿",
    availableBalance: 0.0825,
    lockedBalance: 0.012,
    priceNGN: 163000000,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "Ξ",
    availableBalance: 1.85,
    lockedBalance: 0.25,
    priceNGN: 6800000,
  },
  {
    symbol: "USDT",
    name: "Tether",
    icon: "₮",
    availableBalance: 2450,
    lockedBalance: 350,
    priceNGN: 1540,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "$",
    availableBalance: 1200,
    lockedBalance: 100,
    priceNGN: 1535,
  },
];

export const walletTransactions: WalletTransaction[] = [
  {
    id: "wallet-tx-001",
    type: "deposit",
    crypto: "USDT",
    amount: 500,
    createdAt: "2026-09-16T10:30:00Z",
    status: "completed",
  },
  {
    id: "wallet-tx-002",
    type: "trade",
    crypto: "BTC",
    amount: 0.025,
    createdAt: "2026-09-15T14:20:00Z",
    status: "completed",
  },
  {
    id: "wallet-tx-003",
    type: "withdrawal",
    crypto: "ETH",
    amount: 0.15,
    createdAt: "2026-09-14T09:15:00Z",
    status: "pending",
  },
];