export type AdminRole =
  | "super_admin"
  | "operations_admin"
  | "compliance_admin"
  | "support_admin";

export type AdminPermission =
  | "dashboard.view"
  | "users.view"
  | "users.manage"
  | "merchants.view"
  | "merchants.manage"
  | "advertisements.view"
  | "advertisements.manage"
  | "orders.view"
  | "orders.manage"
  | "disputes.view"
  | "disputes.manage"
  | "finance.view"
  | "finance.manage"
  | "kyc.view"
  | "kyc.manage"
  | "audit.view"
  | "settings.view"
  | "settings.manage"
  | "admins.view"
  | "admins.manage";

export interface AdminRoleDefinition {
  id: AdminRole;
  name: string;
  description: string;
  permissions: AdminPermission[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "active" | "suspended";
  lastLogin: string;
  createdAt: string;
}