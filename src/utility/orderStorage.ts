import type {
  P2POrder,
  OrderStatus,
} from "../types/order.types";

const STORAGE_KEY =
  "cryptoP2POrders";

export function getOrders(): P2POrder[] {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const orders = JSON.parse(stored);

    if (!Array.isArray(orders)) {
      return [];
    }

    return orders;
  } catch {
    return [];
  }
}

export function saveOrder(
  order: P2POrder,
): void {
  const existing =
    getOrders();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      order,
      ...existing,
    ]),
  );
}

export function updateOrder(
  order: P2POrder,
): void {
  const existing =
    getOrders();

  const updated =
    existing.map((item) =>
      item.id === order.id
        ? order
        : item,
    );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function getOrderById(
  orderId: string,
): P2POrder | undefined {
  return getOrders().find(
    (order) =>
      order.id === orderId,
  );
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  adminNote?: string,
): void {
  const existing =
    getOrders();

  const updated =
    existing.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      return {
        ...order,

        status,

        adminNote:
          adminNote ??
          order.adminNote,

        disputedAt:
          status === "disputed"
            ? new Date().toISOString()
            : order.disputedAt,

        resolvedAt:
          status === "completed" &&
          order.status === "disputed"
            ? new Date().toISOString()
            : order.resolvedAt,
      };
    });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function disputeOrder(
  orderId: string,
  reason: string,
): void {
  const existing =
    getOrders();

  const updated =
    existing.map((order) => {
      if (order.id !== orderId) {
        return order;
      }

      return {
        ...order,

        status: "disputed" as OrderStatus,

        disputeReason: reason,

        disputedAt:
          new Date().toISOString(),
      };
    });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}