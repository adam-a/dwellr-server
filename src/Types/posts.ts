export type PostMetadata = {
  includesParking?: boolean;
  leaseAvailabilityDate?: Date;
  lengthOfLeaseInMonths?: number;
  petsAllowed?: boolean;
  price?: number;
  sqft?: number;
  generatedDescription?: string;
  bedroomCount?: number;
  bathroomCount?: number;
  furnished?: boolean;
  kitchen?: boolean;
  appliances?: string;
  amenities?: string;
  yard?: boolean;
  location?: string;
  utilitiesIncluded?: boolean;
};

export type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  mediaKey: string;
  metadata: PostMetadata;
};

export type CreatePostBody = Pick<Post, 'mediaKey' | 'metadata'>;
export type CreatePost = Pick<Post, 'username'> & CreatePostBody;
