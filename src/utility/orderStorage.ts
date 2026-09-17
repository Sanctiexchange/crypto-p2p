import type { P2POrder } from "../types/order.types";

const STORAGE_KEY = "cryptoP2POrders";

export function getOrders(): P2POrder[] {
  try {
    const storedOrders =
      localStorage.getItem(STORAGE_KEY);

    if (!storedOrders) {
      return [];
    }

    return JSON.parse(storedOrders);
  } catch {
    return [];
  }
}

export function saveOrder(order: P2POrder): void {
  const existingOrders = getOrders();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      order,
      ...existingOrders,
    ]),
  );
}

export function getOrderById(
  orderId: string,
): P2POrder | undefined {
  return getOrders().find(
    (order) => order.id === orderId,
  );
}