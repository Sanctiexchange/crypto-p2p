import type {
  P2PAdvertisement,
} from "../types/advertisement.types";

const STORAGE_KEY =
  "cryptoP2PAdvertisements";

export function getAdvertisements(): P2PAdvertisement[] {
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

export function saveAdvertisement(
  advertisement: P2PAdvertisement,
): void {
  const existing =
    getAdvertisements();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      advertisement,
      ...existing,
    ]),
  );
}

export function updateAdvertisement(
  advertisement: P2PAdvertisement,
): void {
  const existing =
    getAdvertisements();

  const updated = existing.map(
    (item) =>
      item.id === advertisement.id
        ? advertisement
        : item,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function deleteAdvertisement(
  advertisementId: string,
): void {
  const existing =
    getAdvertisements();

  const updated = existing.filter(
    (item) =>
      item.id !== advertisementId,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}

export function getAdvertisementById(
  advertisementId: string,
): P2PAdvertisement | undefined {
  return getAdvertisements().find(
    (item) =>
      item.id === advertisementId,
  );
}