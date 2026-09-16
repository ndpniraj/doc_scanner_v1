import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  DetailDocument,
  DocumentContextType,
  DocumentGroup,
} from '@/types/document';
import {
  createNewDocument as createNewDocumentLogic,
  fetchAllDocuments,
  fetchDocumentDetail,
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
    // it will update the currently active doc everywhere, it will refresh the UI
    const group = createNewDocumentLogic(filePath, docName, groupId);
    if (activeDocId) setActiveDoc(fetchDocumentDetail(activeDocId));
    return group;
  };

  useEffect(() => {
    if (activeDocId) setActiveDoc(fetchDocumentDetail(activeDocId));
  }, [activeDocId]);

  return (
    <DocumentContext.Provider
      value={{
        createNewDocument,
        getOldDocs,
        getActiveDoc,
        updateActiveDocId,
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
