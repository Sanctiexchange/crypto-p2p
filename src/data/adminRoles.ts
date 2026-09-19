import type {
  AdminPermission,
  AdminRoleDefinition,
} from "../types/adminRole.types";

const allPermissions: AdminPermission[] = [
  "dashboard.view",
  "users.view",
  "users.manage",
  "merchants.view",
  "merchants.manage",
  "advertisements.view",
  "advertisements.manage",
  "orders.view",
  "orders.manage",
  "disputes.view",
  "disputes.manage",
  "finance.view",
  "finance.manage",
  "kyc.view",
  "kyc.manage",
  "audit.view",
  "settings.view",
  "settings.manage",
  "admins.view",
  "admins.manage",
];

export const adminRoles: AdminRoleDefinition[] = [
  {
    id: "super_admin",
    name: "Super Admin",
    description:
      "Full access to platform administration and configuration.",
    permissions: allPermissions,
  },

  {
    id: "operations_admin",
    name: "Operations Admin",
    description:
      "Manages users, merchants, advertisements and P2P operations.",
    permissions: [
      "dashboard.view",
      "users.view",
      "users.manage",
      "merchants.view",
      "merchants.manage",
      "advertisements.view",
      "advertisements.manage",
      "orders.view",
      "orders.manage",
      "disputes.view",
      "disputes.manage",
    ],
  },

  {
    id: "compliance_admin",
    name: "Compliance Admin",
    description:
      "Handles KYC, financial monitoring, disputes and audit review.",
    permissions: [
      "dashboard.view",
      "users.view",
      "merchants.view",
      "orders.view",
      "disputes.view",
      "disputes.manage",
      "finance.view",
      "finance.manage",
      "kyc.view",
      "kyc.manage",
      "audit.view",
    ],
  },

  {
    id: "support_admin",
    name: "Support Admin",
    description:
      "Provides customer and order support without access to sensitive administration.",
    permissions: [
      "dashboard.view",
      "users.view",
      "merchants.view",
      "orders.view",
      "orders.manage",
      "disputes.view",
    ],
  },
];