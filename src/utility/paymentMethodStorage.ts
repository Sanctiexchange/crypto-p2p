import type { PaymentMethod } from "../types/payment.types";

const STORAGE_KEY = "cryptoP2PPaymentMethods";

export function getPaymentMethods(): PaymentMethod[] {
  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function savePaymentMethod(
  paymentMethod: PaymentMethod,
): void {
  const existing =
    getPaymentMethods();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      ...existing,
      paymentMethod,
    ]),
  );
}

export function updatePaymentMethod(
  paymentMethod: PaymentMethod,
): void {
  const existing =
    getPaymentMethods();

  const updated = existing.map(
    (method) =>
      method.id === paymentMethod.id
        ? paymentMethod
        : method,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function deletePaymentMethod(
  paymentMethodId: string,
): void {
  const existing =
    getPaymentMethods();

  const updated = existing.filter(
    (method) =>
      method.id !== paymentMethodId,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function setDefaultPaymentMethod(
  paymentMethodId: string,
): void {
  const existing =
    getPaymentMethods();

  const updated = existing.map(
    (method) => ({
      ...method,
      isDefault:
        method.id === paymentMethodId,
    }),
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}