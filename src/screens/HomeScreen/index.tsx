import { FC } from 'react';
import EmptyDocuments from '@screens/EmptyDocuments';
import DocumentHome from '@screens/DocumentHome';

interface Props {}

const documents = [];

const HomeScreen: FC<Props> = () => {
  if (!documents.length) return <EmptyDocuments />;

  return <DocumentHome />;
};

export default HomeScreen;
