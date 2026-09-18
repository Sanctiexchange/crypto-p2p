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

    const advertisements =
      JSON.parse(stored);

    if (!Array.isArray(advertisements)) {
      return [];
    }

    return advertisements.map(
      (advertisement) => ({
        ...advertisement,

        /*
         * Ads created before the approval
         * system used "active".
         *
         * We convert those old demo ads to
         * "approved" so existing data does
         * not disappear from the application.
         */
        status:
          advertisement.status === "active"
            ? "approved"
            : advertisement.status,
      }),
    );
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

  const updated =
    existing.map((item) =>
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

  const updated =
    existing.filter(
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

export function updateAdvertisementStatus(
  advertisementId: string,
  status: P2PAdvertisement["status"],
  rejectionReason?: string,
): void {
  const existing =
    getAdvertisements();

  const updated =
    existing.map((item) => {
      if (
        item.id !== advertisementId
      ) {
        return item;
      }

      return {
        ...item,
        status,
        reviewedAt:
          new Date().toISOString(),

        rejectionReason:
          status === "rejected"
            ? rejectionReason
            : undefined,
      };
    });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated),
  );
}