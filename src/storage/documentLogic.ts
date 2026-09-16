import uuid from 'react-native-uuid';
import {
  BuildDocumentRecordParams,
  DetailDocument,
  Document,
  DocumentGroup,
} from '@/types/document';
import { getJSON, setJSON, storage } from './localStorage';
import { Keys } from './keys';

const getLastDocumentOrderInGroup = (parentId: string) => {
  const docIds = getJSON<DocumentGroup>(Keys.group(parentId))?.docIds;
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
        createdAt: new Date(Date.now()).toDateString(),
      };

  setJSON(Keys.group(groupId), updatedGroup);

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

export const fetchAllDocuments = (): DocumentGroup[] => {
  const allKeys = storage.getAllKeys();
  const groupKeys = allKeys.filter(item => item.startsWith('group:'));

  return groupKeys
    .map(item => getJSON<DocumentGroup>(item))
    .filter(item => item !== undefined);
};

export const fetchDocumentDetail = (groupId: string): DetailDocument | null => {
  const documentGroup = getJSON<DocumentGroup>(Keys.group(groupId));
  if (!documentGroup) return null;

  return {
    id: documentGroup.id,
    name: documentGroup.title,
    documents: documentGroup.docIds
      .map(item => getJSON<Document>(Keys.document(item)))
      .filter(item => item !== undefined),
  };
};

export const updateDocumentName = (groupId: string, title: string) => {
  const key = Keys.group(groupId);
  const group = getJSON<DocumentGroup>(key);
  if (!group) return;

  group.title = title;

  setJSON(key, group);
};
