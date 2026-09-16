export interface Document {
  id: string;
  parentId: string;
  filePath: string;
  order: number;
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
}

type DocumentGroupRef =
  | { isNewGroup: false; parentId: string }
  | { isNewGroup: true };

export interface BuildDocumentRecordParams {
  filePath: string;
  group: DocumentGroupRef;
}

export interface DocumentContextType {
  createNewDocument(
    filePath: string,
    docName: string,
    groupId?: string,
  ): DocumentGroup;
  getOldDocs(): DocumentGroup[];
  getActiveDoc(): DetailDocument | null;
}
