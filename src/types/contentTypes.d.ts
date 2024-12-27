export interface Content {
  identifier: string;
  hero: Hero[];
  banner1: Banner[];
  banner2: Banner[];
}

export interface Hero {
  title?: string;
  mediaUrl?: string;
  mobMediaUrl?: string;
  onClickUrl?: string;
  priority?: number;
  clickCount?: number;
  description?: string;
  isButton?: boolean;
  buttonValue?: string;
  buttonColor?: string;
  productId?: string; // Assuming productId is a string representation of ObjectId
}

export interface Banner extends Hero {}
