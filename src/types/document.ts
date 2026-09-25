export type ImageSize = { width: number; height: number };

type CKey = 'topLeft' | 'bottomRight' | 'topRight' | 'bottomLeft';
export type CPoint = { x: number; y: number };
export type Corners = Record<CKey, CPoint>;

export interface Document {
  id: string;
  parentId: string;
  order: number;
  originalFilePath: string;
  croppedFilePath: string;
  originalSize: ImageSize;
  corners: Corners;
}

export interface DetailDocument {
  id: string;
  name: string;
  documents: Document[];
}

export interface DocumentGroup {
  id: string;
  title: string;
  docIds: string[];
  thumbnail?: string;
  createdAt: string;
}

type DocumentGroupRef =
  | { isNewGroup: false; parentId: string }
  | { isNewGroup: true };

export interface BuildDocumentRecordParams {
  group: DocumentGroupRef;
}

export interface DocumentContextType {
  createNewDocument: CreateNewDocument;
  getOldDocs(): DocumentGroup[];
  getActiveDoc(id?: string): DetailDocument | null;
  updateActiveDocId(docId: string): void;
  updateDocumentTitle(docId: string, newTitle: string): void;
}

type CreateDocumentProps = {
  originalFilePath: string;
  croppedFilePath: string;
  originalSize: ImageSize;
  corners: Corners;
  docName: string;
  parentId?: string;
};

export type CreateNewDocument = (props: CreateDocumentProps) => DocumentGroup;
