import type { AdminUser } from "../types/adminRole.types";

export const adminUsers: AdminUser[] = [
  {
    id: "admin-001",
    name: "Platform Admin",
    email: "admin@example.com",
    role: "super_admin",
    status: "active",
    lastLogin: "2026-09-19T08:15:00Z",
    createdAt: "2026-01-10T09:00:00Z",
  },

  {
    id: "admin-002",
    name: "Compliance Admin",
    email: "compliance@example.com",
    role: "compliance_admin",
    status: "active",
    lastLogin: "2026-09-19T07:40:00Z",
    createdAt: "2026-03-14T11:30:00Z",
  },

  {
    id: "admin-003",
    name: "Operations Admin",
    email: "operations@example.com",
    role: "operations_admin",
    status: "active",
    lastLogin: "2026-09-18T16:20:00Z",
    createdAt: "2026-04-20T10:00:00Z",
  },

  {
    id: "admin-004",
    name: "Support Admin",
    email: "support@example.com",
    role: "support_admin",
    status: "active",
    lastLogin: "2026-09-18T14:50:00Z",
    createdAt: "2026-05-02T08:45:00Z",
  },

  {
    id: "admin-005",
    name: "Former Admin",
    email: "former-admin@example.com",
    role: "support_admin",
    status: "suspended",
    lastLogin: "2026-08-20T12:30:00Z",
    createdAt: "2026-02-12T13:00:00Z",
  },
];