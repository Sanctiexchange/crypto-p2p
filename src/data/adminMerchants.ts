import type {
  MerchantStatus,
  MerchantTier,
} from "../types/merchant.types";

export interface AdminMerchant {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  email: string;

  status: MerchantStatus;
  tier: MerchantTier;

  completedOrders: number;
  totalOrders: number;
  completionRate: number;

  totalVolumeNGN: number;
  activeAds: number;

  responseTimeMinutes: number;

  appliedAt: string;
  approvedAt?: string;
}

export const adminMerchants: AdminMerchant[] = [
  {
    id: "merchant-001",
    userId: "user-001",
    displayName: "Sanctus P2P",
    username: "sanctus",
    email: "sanctus@example.com",

    status: "approved",
    tier: "verified",

    completedOrders: 1245,
    totalOrders: 1287,
    completionRate: 96.7,

    totalVolumeNGN: 284750000,
    activeAds: 4,

    responseTimeMinutes: 3,

    appliedAt: "2026-08-10T10:00:00Z",
    approvedAt: "2026-08-12T14:30:00Z",
  },

  {
    id: "merchant-002",
    userId: "user-002",
    displayName: "CryptoHub NG",
    username: "cryptohubng",
    email: "cryptohub@example.com",

    status: "approved",
    tier: "pro",

    completedOrders: 2310,
    totalOrders: 2365,
    completionRate: 97.7,

    totalVolumeNGN: 624500000,
    activeAds: 8,

    responseTimeMinutes: 2,

    appliedAt: "2026-05-18T09:20:00Z",
    approvedAt: "2026-05-20T11:15:00Z",
  },

  {
    id: "merchant-003",
    userId: "user-003",
    displayName: "Lagos Crypto Desk",
    username: "lagosdesk",
    email: "lagosdesk@example.com",

    status: "approved",
    tier: "verified",

    completedOrders: 786,
    totalOrders: 812,
    completionRate: 96.8,

    totalVolumeNGN: 145800000,
    activeAds: 5,

    responseTimeMinutes: 5,

    appliedAt: "2026-06-04T12:00:00Z",
    approvedAt: "2026-06-06T09:40:00Z",
  },

  {
    id: "merchant-004",
    userId: "user-007",
    displayName: "Emeka Digital Assets",
    username: "emekadigital",
    email: "emeka@example.com",

    status: "pending",
    tier: "standard",

    completedOrders: 0,
    totalOrders: 0,
    completionRate: 0,

    totalVolumeNGN: 0,
    activeAds: 0,

    responseTimeMinutes: 0,

    appliedAt: "2026-09-15T12:25:00Z",
  },

  {
    id: "merchant-005",
    userId: "user-008",
    displayName: "FastSwap NG",
    username: "fastswap",
    email: "fastswap@example.com",

    status: "approved",
    tier: "verified",

    completedOrders: 543,
    totalOrders: 567,
    completionRate: 95.8,

    totalVolumeNGN: 98750000,
    activeAds: 3,

    responseTimeMinutes: 4,

    appliedAt: "2026-07-02T15:30:00Z",
    approvedAt: "2026-07-04T10:20:00Z",
  },

  {
    id: "merchant-006",
    userId: "user-009",
    displayName: "Prime Crypto",
    username: "primecrypto",
    email: "prime@example.com",

    status: "suspended",
    tier: "verified",

    completedOrders: 341,
    totalOrders: 389,
    completionRate: 87.7,

    totalVolumeNGN: 72400000,
    activeAds: 0,

    responseTimeMinutes: 12,

    appliedAt: "2026-04-12T08:00:00Z",
    approvedAt: "2026-04-15T13:00:00Z",
  },
];