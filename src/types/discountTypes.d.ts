export interface Discount {
  identifier?: string;
  identifier2?: string;
  discountType?: string;
  discountTitle?: string;
  counponCode?: string;
  description?: string;
  mediaUrl?: string[];
  applicability?: IApplicability[];
  value?: IValue;
  minRequirement?: IMinRequirement;
  useLimit?: IUseLimit;
  bulkDiscount?: boolean;
  bulkDiscountDetails?: IBulkDiscountDetail[];
  location?: ILocation[];
  schedule?: ISchedule[];
  status?: "active" | "inactive" | "draft" | "scheduled";
  appliedCount?: number;
  conversionCount?: number;
  visibility?: IVisibility;
  priority?: number;
}

interface IApplicability {
  applicabilityTitle:
    | "All"
    | "Category"
    | "Product"
    | "CustomerBuy"
    | "CustomerGets";
  applicabilityValue?: string;
  productId?: string;
}

interface IValue {
  number?: number;
  typeName?: "percentage" | "amount" | "free";
  limitDiscount?: boolean;
  limitDiscountAmount?: number;
}

interface IMinRequirement {
  title: "None" | "Amount" | "ProductCount";
  value?: number;
}

interface IUseLimit {
  oneUse?: boolean;
  totalUse?: {
    limit?: boolean;
    count?: number;
  };
}

interface IBulkDiscountDetail {
  relation?: string;
  quantity1?: number;
  quantity2?: number;
  discountType?: "percentage" | "fixedAmount" | "";
  discountValue?: number;
}

interface ILocation {
  cityName?: string;
  latitude?: string;
  longitude?: string;
  ipAddress?: string;
}

interface ISchedule {
  startEnable?: boolean;
  start?: {
    date?: Date;
    time?: Date;
  };
  endEnable?: boolean;
  end?: {
    date?: Date;
    time?: Date;
  };
}

interface IVisibility {
  banner?: boolean;
  popup?: boolean;
  popupId?: string;
  productPage?: boolean;
}
