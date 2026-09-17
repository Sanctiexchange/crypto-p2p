import type { MerchantProfile } from "../types/merchant.types";

export const merchantProfile: MerchantProfile = {
  id: "merchant-001",
  userId: "user-001",

  displayName: "Sanctus P2P",

  status: "approved",
  tier: "verified",

  completedOrders: 1245,
  totalOrders: 1287,
  completionRate: 96.7,

  totalVolumeNGN: 284750000,

  responseTimeMinutes: 3,

  activeAds: 4,

  createdAt: "2026-08-15T10:00:00Z",
};