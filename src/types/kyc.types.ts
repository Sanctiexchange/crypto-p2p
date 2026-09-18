export type KycStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "more_info_required";

export type KycDocumentType =
  | "national_id"
  | "passport"
  | "drivers_license"
  | "proof_of_address"
  | "selfie";

export interface KycDocument {
  id: string;
  type: KycDocumentType;
  name: string;
  submittedAt: string;
  status: "submitted" | "verified" | "rejected";
}

export interface KycApplication {
  id: string;

  userId: string;
  username: string;
  displayName: string;
  email: string;

  status: KycStatus;

  country: string;

  documents: KycDocument[];

  submittedAt: string;
  reviewedAt?: string;

  adminNote?: string;
}