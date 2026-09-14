export interface Document {
  id: string;
  parentId: string;
  filePath: string;
  order: number;
}

export interface DocumentGroup {
  id: string;
  title: string;
  docIds: string[];
  thumbnail?: string;
}
