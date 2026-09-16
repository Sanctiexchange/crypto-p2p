import type { Trader } from "../types/user.types";

export const traders: Trader[] = [
  {
    id: "trader-001",
    username: "cryptoking",
    displayName: "CryptoKing",
    completedOrders: 1245,
    completionRate: 98.7,
    verificationStatus: "verified",
    responseTimeMinutes: 2,
    isOnline: true,
  },

  {
    id: "trader-002",
    username: "fasttrader",
    displayName: "FastTrader",
    completedOrders: 892,
    completionRate: 97.9,
    verificationStatus: "verified",
    responseTimeMinutes: 3,
    isOnline: true,
  },

  {
    id: "trader-003",
    username: "naijacrypto",
    displayName: "NaijaCrypto",
    completedOrders: 2140,
    completionRate: 99.1,
    verificationStatus: "verified",
    responseTimeMinutes: 1,
    isOnline: true,
  },

  {
    id: "trader-004",
    username: "blockchainhub",
    displayName: "BlockchainHub",
    completedOrders: 675,
    completionRate: 96.8,
    verificationStatus: "verified",
    responseTimeMinutes: 5,
    isOnline: false,
  },
];