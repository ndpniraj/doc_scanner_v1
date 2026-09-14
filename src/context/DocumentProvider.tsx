import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { DocumentContextType } from '@/types/document';
import { createNewDocument as createNewDocumentLogic } from '@/storage/documentLogic';

interface DocumentProviderProps {
  children: ReactNode;
}

const DocumentContext = createContext<DocumentContextType | null>(null);

export const DocumentProvider: FC<DocumentProviderProps> = ({ children }) => {
  const [activeDocId, setActiveDocId] = useState<string>();

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
