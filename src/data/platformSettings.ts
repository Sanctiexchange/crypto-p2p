import type { PlatformSettings } from "../types/platformSettings.types";

export const platformSettings: PlatformSettings = {
  platformName: "Crypto P2P",

  maintenanceMode: false,

  tradingEnabled: true,
  withdrawalsEnabled: true,
  depositsEnabled: true,

  p2pTradingEnabled: true,

  requireKycForTrading: true,
  requireKycForWithdrawals: true,

  makerFeePercent: 0.2,
  takerFeePercent: 0.4,

  minimumP2POrderNGN: 5000,
  maximumP2POrderNGN: 5000000,

  dailyWithdrawalLimitNGN: 10000000,

  merchantApplicationsEnabled: true,
  merchantMinimumCompletionRate: 90,

  emailNotificationsEnabled: true,
  securityAlertsEnabled: true,
};