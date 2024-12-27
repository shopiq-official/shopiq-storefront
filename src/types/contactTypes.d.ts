export interface Contact {
  identifier: string;
  domain?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  companyName?: string;
  companyWebsite?: string;
  companyHQ?: string;
  mobileCountryCode?: string;
  mobileNumber?: number;
  timezone?: string;
  friendsEmails?: string[];
  altMobileCountryCode?: string;
  altMobileNumber?: number;
  personalEmail?: string;
  cooperateEmail?: string;
  reason1?: string;
  reason2?: string;
  product?: string;
  service?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  pincode?: number;
  message?: string;
  terms?: string;
  remarks?: {
    content?: string;
    date?: Date;
    by?: string;
  }[];
  leadOwner?: string;
  status?:
    | "new"
    | "mql"
    | "sql"
    | "open"
    | "working"
    | "nurture"
    | "unqualified"
    | "opportunity"
    | "won"
    | "lost"
    | "in_progress"
    | "open_deal"
    | "attempted_to_contact"
    | "connected"
    | "bad_timing"
    | "unassigned";
  typeName?: "lead" | "appointment";
  lifecycleStage?: string;
  buyingRole?: string;
  campaign?: {
    id?: string;
    source?: string;
    medium?: string;
    name?: string;
    term?: string;
    content?: string;
    referrer?: string;
  };
  consent?: {
    agree?: boolean;
    date?: Date;
    time?: Date;
  };
  methodName?: "" | "userGenerated" | "admin";
  ipAddress?: string;
  userDeviceDetails?: {
    userAgent?: string;
    browserName?: string;
    browserVersion?: string;
    platform?: string;
    language?: string;
    screenWidth?: number;
    screenHeight?: number;
    pixelRatio?: string;
  };
  createdAt?: Date;
  modifiedAt?: Date;
  date?: string;
  time?: string;
}
