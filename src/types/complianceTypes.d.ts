export interface Compliance {
  identifier: string;
  typeName:
    | "privacy"
    | "shipping"
    | "terms"
    | "cancellation"
    | "refund"
    | "data"
    | "ip"
    | "cookie"
    | "sitemap"
    | "legalDetails"
    | "about"
    | "buy-back"
    | "return";
  registrationDate?: Date;
  officeAddress?: {
    office_Address1?: string;
    office_Address2?: string;
    office_city?: string;
    office_pincode?: string;
    office_state?: string;
  };
  mailingAddress?: {
    billing_Address1?: string;
    billing_Address2?: string;
    billing_city?: string;
    billing_pincode?: string;
    billing_state?: string;
  };
  officeEmail?: string;
  officePhone?: string;
  company?: string;
  title?: string;
  body?: string;
  createdAt?: Date;
  lastUpdate?: Date;
  status?: "draft" | "live";
}
