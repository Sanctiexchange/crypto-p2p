import type { PlatformSettings } from "../types/platformSettings.types";
import { platformSettings as defaultSettings } from "../data/platformSettings";

const STORAGE_KEY = "cryptoP2PPlatformSettings";

export function getPlatformSettings(): PlatformSettings {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultSettings),
    );

    return defaultSettings;
  }

  try {
    return JSON.parse(stored) as PlatformSettings;
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultSettings),
    );

    return defaultSettings;
  }
}

export function savePlatformSettings(
  settings: PlatformSettings,
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings),
  );
}

export function resetPlatformSettings(): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultSettings),
  );
}