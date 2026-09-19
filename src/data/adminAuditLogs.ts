import type { AuditLog } from "../types/audit.types";

export const adminAuditLogs: AuditLog[] = [
  {
    id: "audit-001",
    action: "merchant_approved",
    severity: "info",
    adminId: "admin-001",
    adminName: "Platform Admin",
    targetType: "merchant",
    targetId: "merchant-004",
    description:
      "Merchant application was approved for P2P trading.",
    createdAt: "2026-09-18T08:30:00Z",
  },

  {
    id: "audit-002",
    action: "kyc_approved",
    severity: "info",
    adminId: "admin-001",
    adminName: "Platform Admin",
    targetType: "kyc",
    targetId: "kyc-001",
    description:
      "User identity verification was approved.",
    createdAt: "2026-09-18T09:15:00Z",
  },

  {
    id: "audit-003",
    action: "transaction_flagged",
    severity: "warning",
    adminId: "admin-002",
    adminName: "Compliance Admin",
    targetType: "transaction",
    targetId: "txn-admin-005",
    description:
      "Large withdrawal was flagged for compliance review.",
    createdAt: "2026-09-18T10:45:00Z",
  },

  {
    id: "audit-004",
    action: "user_suspended",
    severity: "critical",
    adminId: "admin-002",
    adminName: "Compliance Admin",
    targetType: "user",
    targetId: "user-009",
    description:
      "User account was suspended following a compliance review.",
    createdAt: "2026-09-17T13:20:00Z",
  },

  {
    id: "audit-005",
    action: "advertisement_rejected",
    severity: "warning",
    adminId: "admin-001",
    adminName: "Platform Admin",
    targetType: "advertisement",
    targetId: "ad-004",
    description:
      "P2P advertisement was rejected after administrative review.",
    createdAt: "2026-09-17T15:10:00Z",
  },

  {
    id: "audit-006",
    action: "dispute_resolved",
    severity: "info",
    adminId: "admin-001",
    adminName: "Platform Admin",
    targetType: "order",
    targetId: "order-002",
    description:
      "P2P dispute was resolved and the order was completed.",
    createdAt: "2026-09-16T16:40:00Z",
  },

  {
    id: "audit-007",
    action: "merchant_suspended",
    severity: "critical",
    adminId: "admin-002",
    adminName: "Compliance Admin",
    targetType: "merchant",
    targetId: "merchant-006",
    description:
      "Merchant account was suspended after compliance review.",
    createdAt: "2026-09-16T18:25:00Z",
  },

  {
    id: "audit-008",
    action: "kyc_rejected",
    severity: "warning",
    adminId: "admin-002",
    adminName: "Compliance Admin",
    targetType: "kyc",
    targetId: "kyc-005",
    description:
      "KYC application was rejected because identity documents could not be verified.",
    createdAt: "2026-09-15T09:30:00Z",
  },

  {
    id: "audit-009",
    action: "advertisement_approved",
    severity: "info",
    adminId: "admin-001",
    adminName: "Platform Admin",
    targetType: "advertisement",
    targetId: "ad-002",
    description:
      "P2P advertisement was approved and made available for trading.",
    createdAt: "2026-09-14T11:20:00Z",
  },

  {
    id: "audit-010",
    action: "admin_login",
    severity: "info",
    adminId: "admin-001",
    adminName: "Platform Admin",
    targetType: "system",
    targetId: "system",
    description:
      "Administrator successfully logged into the admin platform.",
    ipAddress: "192.168.1.10",
    createdAt: "2026-09-14T07:45:00Z",
  },
];