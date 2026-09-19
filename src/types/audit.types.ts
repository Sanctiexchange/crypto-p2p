export type AuditAction =
  | "user_created"
  | "user_updated"
  | "user_suspended"
  | "user_activated"
  | "merchant_approved"
  | "merchant_suspended"
  | "merchant_activated"
  | "advertisement_approved"
  | "advertisement_rejected"
  | "advertisement_paused"
  | "order_updated"
  | "dispute_resolved"
  | "dispute_cancelled"
  | "transaction_flagged"
  | "kyc_approved"
  | "kyc_rejected"
  | "kyc_more_info"
  | "admin_login"
  | "settings_updated";

export type AuditSeverity =
  | "info"
  | "warning"
  | "critical";

export interface AuditLog {
  id: string;

  action: AuditAction;

  severity: AuditSeverity;

  adminId: string;
  adminName: string;

  targetType:
    | "user"
    | "merchant"
    | "advertisement"
    | "order"
    | "transaction"
    | "kyc"
    | "system";

  targetId: string;

  description: string;

  ipAddress?: string;

  createdAt: string;
}