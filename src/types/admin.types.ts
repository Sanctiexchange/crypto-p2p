export type AdminUserStatus =
  | "active"
  | "suspended"
  | "pending";

export type AdminMerchantStatus =
  | "pending"
  | "approved"
  | "suspended";

export type AdminAdvertisementStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "paused";

export type AdminDisputeStatus =
  | "open"
  | "under_review"
  | "resolved";

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalMerchants: number;
  pendingMerchants: number;
  totalAdvertisements: number;
  pendingAdvertisements: number;
  totalOrders: number;
  activeOrders: number;
  totalTradingVolumeNGN: number;
  openDisputes: number;
}

export interface AdminActivity {
  id: string;
  type:
    | "user"
    | "merchant"
    | "advertisement"
    | "order"
    | "dispute";
  title: string;
  description: string;
  createdAt: string;
}