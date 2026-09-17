export type PaymentMethodType =
  | "bank_transfer"
  | "opay"
  | "palmpay"
  | "moniepoint"
  | "cash_deposit";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  displayName: string;

  accountName?: string;
  accountNumber?: string;
  bankName?: string;

  isDefault: boolean;
  isActive: boolean;
}