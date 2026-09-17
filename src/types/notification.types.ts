export type NotificationType =
  | "order"
  | "payment"
  | "wallet"
  | "security"
  | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}