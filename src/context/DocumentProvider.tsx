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
  updateDocumentName,
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

  const updateDocumentTitle = (docId: string, newTitle: string) => {
    updateDocumentName(docId, newTitle);
    // This will update the UI
    setActiveDoc(fetchDocumentDetail(docId));
  };

  const createNewDocument: DocumentContextType['createNewDocument'] = props => {
    // it will update the currently active doc everywhere, it will refresh the UI
    const group = createNewDocumentLogic(props);
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
        updateDocumentTitle,
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
