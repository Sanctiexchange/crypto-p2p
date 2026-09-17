import type { AdminUserStatus } from "../types/admin.types";

export type AdminVerificationStatus =
  | "verified"
  | "pending"
  | "unverified";

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  verificationStatus: AdminVerificationStatus;
  status: AdminUserStatus;
  completedOrders: number;
  totalOrders: number;
  tradingVolumeNGN: number;
  registeredAt: string;
  lastActiveAt: string;
}

export const adminUsers: AdminUser[] = [
  {
    id: "user-001",
    username: "sanctus",
    fullName: "Sanctus Ekeh",
    email: "sanctus@example.com",
    phone: "+234 801 234 5678",
    verificationStatus: "verified",
    status: "active",
    completedOrders: 124,
    totalOrders: 128,
    tradingVolumeNGN: 28475000,
    registeredAt: "2026-01-12T10:30:00Z",
    lastActiveAt: "2026-09-17T18:42:00Z",
  },
  {
    id: "user-002",
    username: "crypto_trader",
    fullName: "Michael Okoro",
    email: "michael@example.com",
    phone: "+234 802 345 6789",
    verificationStatus: "verified",
    status: "active",
    completedOrders: 86,
    totalOrders: 89,
    tradingVolumeNGN: 12750000,
    registeredAt: "2026-02-18T08:15:00Z",
    lastActiveAt: "2026-09-17T17:20:00Z",
  },
  {
    id: "user-003",
    username: "blockchainqueen",
    fullName: "Amaka Nwosu",
    email: "amaka@example.com",
    phone: "+234 803 456 7890",
    verificationStatus: "pending",
    status: "active",
    completedOrders: 32,
    totalOrders: 35,
    tradingVolumeNGN: 4850000,
    registeredAt: "2026-04-02T13:20:00Z",
    lastActiveAt: "2026-09-17T15:44:00Z",
  },
  {
    id: "user-004",
    username: "tundecrypto",
    fullName: "Tunde Adeyemi",
    email: "tunde@example.com",
    phone: "+234 804 567 8901",
    verificationStatus: "unverified",
    status: "active",
    completedOrders: 14,
    totalOrders: 18,
    tradingVolumeNGN: 1240000,
    registeredAt: "2026-05-21T09:40:00Z",
    lastActiveAt: "2026-09-16T20:12:00Z",
  },
  {
    id: "user-005",
    username: "fastp2p",
    fullName: "David Ibrahim",
    email: "david@example.com",
    phone: "+234 805 678 9012",
    verificationStatus: "verified",
    status: "suspended",
    completedOrders: 61,
    totalOrders: 67,
    tradingVolumeNGN: 8920000,
    registeredAt: "2026-03-09T11:05:00Z",
    lastActiveAt: "2026-09-10T14:30:00Z",
  },
  {
    id: "user-006",
    username: "nellytrades",
    fullName: "Nneka Eze",
    email: "nneka@example.com",
    phone: "+234 806 789 0123",
    verificationStatus: "verified",
    status: "active",
    completedOrders: 203,
    totalOrders: 209,
    tradingVolumeNGN: 41900000,
    registeredAt: "2025-12-17T16:00:00Z",
    lastActiveAt: "2026-09-17T18:01:00Z",
  },
  {
    id: "user-007",
    username: "emekacrypto",
    fullName: "Emeka Chukwu",
    email: "emeka@example.com",
    phone: "+234 807 890 1234",
    verificationStatus: "pending",
    status: "pending",
    completedOrders: 0,
    totalOrders: 0,
    tradingVolumeNGN: 0,
    registeredAt: "2026-09-15T12:25:00Z",
    lastActiveAt: "2026-09-15T12:25:00Z",
  },
];