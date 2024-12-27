export interface Product {
  _id: string;
  identifier: string;
  identifier2?: string;
  priority?: number;
  document?: {
    documentTitle?: string;
    documentUrl?: string;
    documentType?: string;
  };
  advancePricing?: boolean;
  advancePricingValues?: {
    optionTitle: string;
    optionSpec: string;
    optionValue: number;
  }[];
  title?: string;
  customTitle?: boolean;
  description?: string;
  countryOfOrigin?: string;
  mediaUrl?: string[];
  status?: "active" | "inactive" | "draft";
  pricing?: {
    price?: number;
    comparePrice?: number;
    makingCharge?: number;
    cgst?: number;
    igst?: number;
    sgst?: number;
    purchaseCurrency?: string;
    inclusiveOfGST?: boolean;
    minimumOrderQuantity?: number;
  };
  productCost?: number;
  codPrice?: number;
  inventory?: {
    trackQuantity?: boolean;
    addQuantity?: {
      value: number;
      date: string;
    }[];
    currentQuantity?: number;
    safetyStock?: number;
    sellOutstock?: boolean;
    sku?: string;
    barcode?: string;
    isOutOfStock?: boolean;
    purchaseCasePackQuantity?: number;
    salesCasePackQuantity?: number;
    brandName?: string;
    productCode?: string;
    productCodeAlias?: string[];
    shortDescription?: string;
    countryOfShipment?: string;
  };
  similarProduct?: Product[];
  crossSellProducts?: Product[];
  epc?: epcProp[];
  variant?: variantProp[];
  specifications?: {
    options_name?: string;
    options_value: any[];
    isVisible?: boolean;
  }[];
  shipping?: {
    weight?: number;
    unit?: string;
    costPerUnitWeight?: number;
  };
  seListing?: {
    title?: string;
    metalDescription?: string;
    routeHandle?: string;
  };
  category?: string;
  subCategory?: string;
  collectionName?: string;
  hsnsac?: number;
  tags?: string[];
  impression?: number;
  productType?: string;
  availableStates?: any[];
  isAvailable?: {
    cod?: boolean;
    discount?: boolean;
  };
  isFeatured?: boolean;
  limitedview?: boolean;
  isBestSeller?: boolean;
  isVariant?: boolean;
  newLaunch?: boolean;
  profit?: {
    typeName?: "fixed" | "percentage" | "";
    value?: number;
  };
  getExclusive?: boolean;
  review?: {
    userId: string;
    reviewTitle?: string;
    reviewBody?: string;
    date?: Date;
    location?: string;
    rating?: number;
  }[];
  requestQuote?: boolean;
}

export type variantProp = {
  variantProductId?: any;
  slug?: string;
  optionSku?: string;
  options_name?: string;
  options_value?: string[];
  images?: {
    imageUrl?: string;
    imageName?: string;
  }[];
};

export type epcProp = {
  title?: string;
  mediaUrl?: string;
  description?: string;
  onClickUrl?: string;
  position?: string;
};

export type filterDataProps = {
  msg?: string;
  categories?: string[];
  collections?: string[];
  maxPrice?: number;
  minPrice?: number;
  variants?: {
    size?: string[];
    color?: string[];
  };
  specifications?: Record<string, string[]>;
};
