export interface ProductMediaTypes {
  identifier: string;
  productId: string[];
  productVideoUrl?: string;
  productImageUrl?: string;
  title?: string;
  priority?: number;
  status?: "active" | "inactive" | "draft";
  slug?: string;
}
