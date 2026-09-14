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

const upsertDocumentGroup = (
  document: Document & { name: string },
): DocumentGroup => {
  const groupId = document.parentId;
  const existingGroup = getJSON<DocumentGroup>(Keys.group(groupId));

  const updatedGroup: DocumentGroup = existingGroup
    ? { ...existingGroup, docIds: [...existingGroup.docIds, document.id] }
    : {
        id: groupId,
        title: document.name,
        thumbnail: document.filePath,
        docIds: [document.id],
      };

  return updatedGroup;
};

export const createNewDocument = (
  filePath: string,
  docName: string,
  groupId?: string,
): DocumentGroup => {
  const document = buildDocumentRecord({
    filePath,
    group: groupId
      ? { isNewGroup: false, parentId: groupId }
      : { isNewGroup: true },
  });
  insertNewDocument(document);
  return upsertDocumentGroup({ ...document, name: docName });
};
