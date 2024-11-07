export type DescribeRequestBody = {
  transcript: string;
};

export type MetadataResponseBody = {
  includesParking: boolean | null;
  leaseAvailabilityDate: string | null;
  lengthOfLeaseInMonths: number | null;
  petsAllowed: boolean | null;
  price: number | null;
  sqft: number | null;
};

export type PresignBody = {
  fileName: string;
  folder: string;
};

export type PresignResponse = {
  presignedUrl: string;
  key: string;
};

export type User = {
  username: string;
};

export type Request = {
  user: User;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Json = any;

export type PaginationParams = {
  offset: number;
  limit: number;
};
