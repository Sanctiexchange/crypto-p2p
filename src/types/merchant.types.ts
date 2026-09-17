export type MerchantStatus =
  | "not_applied"
  | "pending"
  | "approved"
  | "suspended";

export type MerchantTier =
  | "standard"
  | "verified"
  | "pro";

export interface MerchantProfile {
  id: string;
  userId: string;
  displayName: string;
  status: MerchantStatus;
  tier: MerchantTier;

  completedOrders: number;
  totalOrders: number;
  completionRate: number;

  totalVolumeNGN: number;

  responseTimeMinutes: number;

  activeAds: number;

  createdAt: string;
}