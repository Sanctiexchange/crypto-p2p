export interface PlatformSettings {
  platformName: string;

  maintenanceMode: boolean;

  tradingEnabled: boolean;
  withdrawalsEnabled: boolean;
  depositsEnabled: boolean;

  p2pTradingEnabled: boolean;

  requireKycForTrading: boolean;
  requireKycForWithdrawals: boolean;

  makerFeePercent: number;
  takerFeePercent: number;

  minimumP2POrderNGN: number;
  maximumP2POrderNGN: number;

  dailyWithdrawalLimitNGN: number;

  merchantApplicationsEnabled: boolean;
  merchantMinimumCompletionRate: number;

  emailNotificationsEnabled: boolean;
  securityAlertsEnabled: boolean;
}