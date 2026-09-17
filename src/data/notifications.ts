import type { Notification } from "../types/notification.types";

export const notifications: Notification[] = [
  {
    id: "notification-001",
    type: "order",
    title: "P2P Order Created",
    message:
      "Your P2P order P2P-84729103 has been created successfully.",
    createdAt: "2026-09-17T09:45:00Z",
    isRead: false,
  },
  {
    id: "notification-002",
    type: "payment",
    title: "Payment Pending",
    message:
      "Payment is required to continue your current P2P trade.",
    createdAt: "2026-09-17T08:30:00Z",
    isRead: false,
  },
  {
    id: "notification-003",
    type: "wallet",
    title: "Wallet Deposit Completed",
    message:
      "Your USDT deposit of 500 USDT has been credited to your wallet.",
    createdAt: "2026-09-16T15:20:00Z",
    isRead: true,
  },
  {
    id: "notification-004",
    type: "security",
    title: "New Login Detected",
    message:
      "A new login was detected from a Windows device.",
    createdAt: "2026-09-16T11:10:00Z",
    isRead: true,
  },
  {
    id: "notification-005",
    type: "system",
    title: "Platform Update",
    message:
      "New P2P trading features have been added to your account.",
    createdAt: "2026-09-15T10:00:00Z",
    isRead: true,
  },
  {
    id: "notification-006",
    type: "order",
    title: "Order Completed",
    message:
      "Your previous P2P transaction has been completed successfully.",
    createdAt: "2026-09-14T16:45:00Z",
    isRead: true,
  },
];