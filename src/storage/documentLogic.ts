import uuid from 'react-native-uuid';
import {
  BuildDocumentRecordParams,
  Document,
  DocumentGroup,
} from '@/types/document';
import { getJSON, setJSON } from './localStorage';
import { Keys } from './keys';

const getLastDocumentOrderInGroup = (parentId: string) => {
  const docIds = getJSON<DocumentGroup>(parentId)?.docIds;
  const count = docIds?.length || 0;
  return count - 1;
};

const buildDocumentRecord = (param: BuildDocumentRecordParams): Document => {
  const documentId = uuid.v4();
  const { filePath, group } = param;
  const { isNewGroup } = group;
  const parentId = isNewGroup ? uuid.v4() : group.parentId;

  const order = isNewGroup ? 0 : getLastDocumentOrderInGroup(parentId) + 1;

  return {
    id: documentId,
    filePath,
    order,
    parentId,
  };
};

const insertNewDocument = (document: Document): void => {
  setJSON(Keys.document(document.id), document);
};

const upsertDocumentGroup = () => {};

export const createNewDocument = () => {
  const document = buildDocumentRecord({
    filePath: '',
    group: { isNewGroup: false, parentId: '' },
  });
  insertNewDocument(document);
  upsertDocumentGroup();
};
