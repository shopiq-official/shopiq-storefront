export interface Blog {
  identifier?: string;
  title?: string;
  slug?: string;
  priority?: number;
  type?: string;
  category?: string;
  description?: string;
  status?: "draft" | "live";
  tags?: string;
  body?: string;
  buttonOneUrl?: string;
  buttonTwoUrl?: string;
  author?: string;
  image?: string;
  others?: Record<string, any>;
  createdAt?: Date;
}

export interface BlogApiResponse {
  status?: "success" | "error";
  blogs?: Blog[];
  data?: {
    blogs?: Blog[];
  };
}
