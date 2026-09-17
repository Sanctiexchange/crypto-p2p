import type {
  AdminActivity,
  AdminStats,
} from "../types/admin.types";

export const adminStats: AdminStats = {
  totalUsers: 12450,
  activeUsers: 10872,

  totalMerchants: 428,
  pendingMerchants: 12,

  totalAdvertisements: 936,
  pendingAdvertisements: 24,

  totalOrders: 8742,
  activeOrders: 186,

  totalTradingVolumeNGN: 284750000,

  openDisputes: 7,
};

export const adminActivities: AdminActivity[] = [
  {
    id: "activity-001",
    type: "merchant",
    title: "New merchant application",
    description:
      "A new merchant application requires review.",
    createdAt: "2026-09-17T10:15:00Z",
  },
  {
    id: "activity-002",
    type: "advertisement",
    title: "Advertisement submitted",
    description:
      "A merchant submitted a new USDT/NGN advertisement.",
    createdAt: "2026-09-17T09:42:00Z",
  },
  {
    id: "activity-003",
    type: "order",
    title: "New P2P order",
    description:
      "A new BTC/NGN P2P order was created.",
    createdAt: "2026-09-17T09:18:00Z",
  },
  {
    id: "activity-004",
    type: "dispute",
    title: "New dispute opened",
    description:
      "A buyer opened a dispute regarding an order.",
    createdAt: "2026-09-17T08:54:00Z",
  },
  {
    id: "activity-005",
    type: "user",
    title: "New user registered",
    description:
      "A new user successfully registered on the platform.",
    createdAt: "2026-09-17T08:21:00Z",
  },
];