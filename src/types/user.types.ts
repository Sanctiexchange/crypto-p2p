export type VerificationStatus =
  | "verified"
  | "unverified"
  | "pending";

export interface Trader {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;

  completedOrders: number;
  completionRate: number;

  verificationStatus: VerificationStatus;

  responseTimeMinutes: number;

  isOnline: boolean;
}