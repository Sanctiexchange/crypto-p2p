import type {
  AdminFinancialTransaction,
} from "../types/adminFinance.types";

export const adminFinancialTransactions: AdminFinancialTransaction[] =
  [
    {
      id: "txn-admin-001",
      reference: "TXN-92837461",
      userId: "user-001",
      userName: "Sanctus",
      type: "deposit",
      crypto: "USDT",
      cryptoAmount: 2500,
      fiatCurrency: "NGN",
      fiatAmount: 3750000,
      status: "completed",
      paymentMethod: "Bank Transfer",
      createdAt:
        "2026-09-17T10:30:00Z",
      isFlagged: false,
    },

    {
      id: "txn-admin-002",
      reference: "TXN-92837462",
      userId: "user-002",
      userName: "CryptoHub NG",
      type: "withdrawal",
      crypto: "BTC",
      cryptoAmount: 0.045,
      fiatCurrency: "NGN",
      fiatAmount: 5850000,
      status: "pending",
      paymentMethod:
        "Bank Transfer",
      createdAt:
        "2026-09-17T12:15:00Z",
      isFlagged: false,
    },

    {
      id: "txn-admin-003",
      reference: "TXN-92837463",
      userId: "user-007",
      userName: "Emeka",
      type: "p2p_buy",
      crypto: "USDT",
      cryptoAmount: 1000,
      fiatCurrency: "NGN",
      fiatAmount: 1520000,
      status: "completed",
      paymentMethod: "OPay",
      createdAt:
        "2026-09-16T14:20:00Z",
      isFlagged: false,
    },

    {
      id: "txn-admin-004",
      reference: "TXN-92837464",
      userId: "user-008",
      userName: "FastSwap",
      type: "p2p_sell",
      crypto: "BTC",
      cryptoAmount: 0.018,
      fiatCurrency: "NGN",
      fiatAmount: 2340000,
      status: "completed",
      paymentMethod:
        "Moniepoint",
      createdAt:
        "2026-09-16T16:45:00Z",
      isFlagged: false,
    },

    {
      id: "txn-admin-005",
      reference: "TXN-92837465",
      userId: "user-009",
      userName: "Prime Crypto",
      type: "withdrawal",
      crypto: "USDT",
      cryptoAmount: 8500,
      fiatCurrency: "NGN",
      fiatAmount: 12920000,
      status: "review",
      paymentMethod:
        "Bank Transfer",
      createdAt:
        "2026-09-15T09:10:00Z",
      isFlagged: true,
      adminNote:
        "Large withdrawal requires additional review.",
    },

    {
      id: "txn-admin-006",
      reference: "TXN-92837466",
      userId: "user-003",
      userName: "Lagos Crypto Desk",
      type: "deposit",
      crypto: "ETH",
      cryptoAmount: 1.25,
      fiatCurrency: "NGN",
      fiatAmount: 6100000,
      status: "completed",
      createdAt:
        "2026-09-14T11:00:00Z",
      isFlagged: false,
    },

    {
      id: "txn-admin-007",
      reference: "TXN-92837467",
      userId: "user-007",
      userName: "Emeka",
      type: "withdrawal",
      crypto: "USDT",
      cryptoAmount: 450,
      fiatCurrency: "NGN",
      fiatAmount: 684000,
      status: "failed",
      paymentMethod: "PalmPay",
      createdAt:
        "2026-09-13T18:30:00Z",
      isFlagged: false,
    },
  ];