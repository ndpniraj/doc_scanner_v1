import { BuildDocumentRecordParams } from '@/types/document';

const buildDocumentRecord = (param: BuildDocumentRecordParams) => {
  // isExisting ? groupId : nothing
};

const insertNewDocument = () => {};

const upsertDocumentGroup = () => {};

export const createNewDocument = () => {
  buildDocumentRecord({
    filePath: '',
    name: '',
    group: { isNewGroup: false, parentId: '' },
  });
  insertNewDocument();
  upsertDocumentGroup();
};
