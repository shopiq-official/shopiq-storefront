export interface Category {
  identifier: string;
  title?: string;
  slug?: string;
  description?: string;
  priority?: number;
  media?: Array<{
    mediaUrl?: string;
    position?: string;
  }>;
  media2?: Array<{
    mediaUrl?: string;
    position?: string;
  }>;
  categoryId?: string;
  visibility?: boolean;
  subCategory?: string[];
  metaData?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}
