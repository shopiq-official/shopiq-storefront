import { Product } from "./productTypes";

export interface CartProductVariant {
  options_name?: string;
  options_value?: string[];
  images?: { imageUrl: string; imageName: string }[];
}

export interface CartProduct {
  productId: Product;
  mediaUrl?: string;
  date?: Date | string;
  startTime?: Date;
  endTime?: Date;
  quantity: number;
  variant?: CartProductVariant[];
  status?: "active" | "later";
}

export interface Cart {
  _id: string;
  identifier: string;
  userId?: string;
  source?: string;
  location?: string;
  addedFrom?: string;
  products: CartProduct[];
}
