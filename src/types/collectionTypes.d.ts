export interface Media {
  mediaUrl: string;
  position: string;
}

export interface MetaData {
  metaTitle: string;
  metaDescription: string;
}

export interface Collection {
  identifier: string;
  media: Media[];
  description?: string;
  collectionId: string;
  title?: string;
  visibility?: boolean;
  priority?: number;
  metaData?: MetaData;
}
