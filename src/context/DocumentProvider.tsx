import { createContext, FC, ReactNode, useContext, useState } from 'react';
import {
  DetailDocument,
  DocumentContextType,
  DocumentGroup,
} from '@/types/document';
import {
  createNewDocument as createNewDocumentLogic,
  fetchAllDocuments,
} from '@/storage/documentLogic';

interface DocumentProviderProps {
  children: ReactNode;
}

const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider: FC<DocumentProviderProps> = ({ children }) => {
  const [activeDocId, setActiveDocId] = useState<string>();
  const [allOldDocs, setAllOldDocs] = useState<DocumentGroup[]>([]);
  const [activeDoc, setActiveDoc] = useState<DetailDocument | null>(null);

  const getActiveDoc: DocumentContextType['getActiveDoc'] = () => {
    return activeDoc;
  };

  const getOldDocs: DocumentContextType['getOldDocs'] = () => {
    return fetchAllDocuments();
  };

  const updateActiveDocId = (docId: string) => {
    setActiveDocId(docId);
  };

  const createNewDocument: DocumentContextType['createNewDocument'] = (
    filePath,
    docName,
    groupId,
  ) => {
    return createNewDocumentLogic(filePath, docName, groupId);
  };

  return (
    <DocumentContext.Provider
      value={{
        createNewDocument,
        getOldDocs,
        getActiveDoc,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) throw Error();

  return context;
};
