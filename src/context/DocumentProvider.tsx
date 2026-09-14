import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface DocumentProviderProps {
  children: ReactNode;
}

const DocumentContext = createContext<{
  activeDocId?: string;
  updateActiveDocId(docId: string): void;
} | null>(null);

export const DocumentProvider: FC<DocumentProviderProps> = ({ children }) => {
  const [activeDocId, setActiveDocId] = useState<string>();

  const updateActiveDocId = (docId: string) => {
    setActiveDocId(docId);
  };

  return (
    <DocumentContext.Provider
      value={{
        activeDocId,
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
