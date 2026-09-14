import uuid from 'react-native-uuid';
import { BuildDocumentRecordParams, Document } from '@/types/document';

const getLastDocumentOrderInGroup = () => {
  return 0;
};

const buildDocumentRecord = (param: BuildDocumentRecordParams): Document => {
  const documentId = uuid.v4();
  const { filePath, group } = param;
  const { isNewGroup } = group;
  const parentId = isNewGroup ? uuid.v4() : group.parentId;

  const order = isNewGroup ? 0 : getLastDocumentOrderInGroup() + 1;

  return {
    id: documentId,
    filePath,
    order,
    parentId,
  };
};

const insertNewDocument = () => {};

const upsertDocumentGroup = () => {};

export const createNewDocument = () => {
  buildDocumentRecord({
    filePath: '',
    group: { isNewGroup: false, parentId: '' },
  });
  insertNewDocument();
  upsertDocumentGroup();
};
