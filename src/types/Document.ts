type DocumentMetaData = {
  title?: string;
  date?: string;
  author?: string;
  phrase?: string;
  wordCount?: number;
  links?: Array<string | null>;
  images?: Array<string | null>;
};

type ExtractOptions = {
  phraseLength: number;
  includeLinks: boolean;
  includeImages: boolean;
};

export { DocumentMetaData, ExtractOptions };
