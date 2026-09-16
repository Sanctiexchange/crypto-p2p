export type CryptoSymbol =
  | "BTC"
  | "ETH"
  | "USDT"
  | "USDC";

export type FiatCurrency =
  | "NGN"
  | "USD"
  | "EUR"
  | "GBP";

export interface CryptoAsset {
  symbol: CryptoSymbol;
  name: string;
  icon: string;
  priceNGN: number;
}