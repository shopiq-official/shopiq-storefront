export interface Order {
  _id: string;
  identifier: string;
  identifier2?: string;
  orderType?: "retail" | "bulk";
  orderRefId?: string;
  orderLocation?: {
    cityName?: string;
    latitude?: string;
    longitude?: string;
    ipAddress?: string;
  }[];
  addedFrom?: string;
  products?: {
    productId: string;
    quantity: number;
    product_name: string;
    product_sku: string;
    product_value: string;
    subOrderRefId?: string;
    variant?: {
      optionSku?: string;
      options_name?: string;
      options_value?: string[];
      images?: {
        imageUrl?: string;
        imageName?: string;
      }[];
    }[];
  }[];
  customerId?: string;
  customerFirstName?: string;
  customerLastName?: string;
  orderId?: string;
  discount?: {
    couponId: string;
    freeobject?: {
      string?: string;
      objectName?: string;
      objectMediaUrl?: string;
      objectQuantity?: number;
      objectPrice?: number;
    };
    totalDiscount?: number;
  }[];
  logisticsDetails?: any;
  serviceId?: string;
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  location?: string;
  subLocation?: string;
  category?: string;
  subCategory?: string;
  billingAddress?: {
    name?: string;
    addLineOne?: string;
    addLineTwo?: string;
    landmark?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };
  shippingAddress?: {
    name?: string;
    addLineOne?: string;
    addLineTwo?: string;
    landmark?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    typeName?: "house" | "apartment" | "flat";
  };
  note?: string;
  isGift?: boolean;
  giftDetails?: {
    name?: string;
    occassion?: string;
    message?: string;
    mediaUrl?: string;
  };
  total?: number;
  subTotal?: number;
  tax?: number;
  shippingCharges?: {
    subTotal?: number;
    tax?: number;
  };
  deliveryMethod?: string;
  orderStatus?: boolean;
  orderStatusStage?: {
    type?: "addToCart" | "buyNow";
    lastPageSlug?: string;
    retainoState?: "notLoggedIn" | "onCheckout" | "onPG";
    time?: Date;
  }[];
  paymentDetails?: {
    paidAmount?: number;
    modeOfPayment?: string;
    dateOfPayment?: Date;
    status?: boolean;
    paymentRefNumber?: string;
  }[];
  paymentStatus?:
    | "paid"
    | "unpaid"
    | "partialPaid"
    | "partialUnpaid"
    | "pending"
    | "failed";
  modeOfPayment?:
    | "cod"
    | "upi1"
    | "upi2"
    | "credit"
    | "debit"
    | "netbanking"
    | "emi"
    | "wallet"
    | "linkPayment"
    | "pg";
  fulfilmentStatus?:
    | "received"
    | "packaging"
    | "shipped"
    | "outfordelivery"
    | "completed"
    | "cancelled";
  returnStatus?: "requested" | "processing" | "picked" | "completed";
  refundStatus?: "requested" | "processing" | "completed";
  paymentGateway?: string;
  paymentGatewayDetails?: any;
  campaign?: {
    id?: string;
    source?: string;
    medium?: string;
    name?: string;
    term?: string;
    content?: string;
    referrer?: string;
  };
  mediaUrl?: {
    url?: string;
    name?: string;
    description?: string;
  }[];
  createdAt?: Date;
  deviceInfo?: {
    userAgent?: string;
    browserName?: string;
    browserVersion?: string;
    platform?: string;
    language?: string;
    screenWidth?: number;
    screenHeight?: number;
    pixelRatio?: string;
  };
}
