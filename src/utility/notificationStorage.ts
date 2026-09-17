import type { Notification } from "../types/notification.types";

const STORAGE_KEY = "cryptoP2PNotifications";

export function getNotifications(): Notification[] {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    return [];
  } catch {
    return [];
  }
}

export function initializeNotifications(
  defaultNotifications: Notification[],
): Notification[] {
  const existing = getNotifications();

  if (existing.length > 0) {
    return existing;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultNotifications),
  );

  return defaultNotifications;
}

export function markNotificationAsRead(
  notificationId: string,
): void {
  const notifications =
    getNotifications();

  const updated = notifications.map(
    (notification) =>
      notification.id === notificationId
        ? {
            ...notification,
            isRead: true,
          }
        : notification,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function markAllNotificationsAsRead(): void {
  const notifications =
    getNotifications();

  const updated = notifications.map(
    (notification) => ({
      ...notification,
      isRead: true,
    }),
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function deleteNotification(
  notificationId: string,
): void {
  const notifications =
    getNotifications();

  const updated = notifications.filter(
    (notification) =>
      notification.id !== notificationId,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}