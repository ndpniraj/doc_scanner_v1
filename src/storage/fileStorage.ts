// =====================================================================
// PRIVATE APP STORAGE
// Lives inside the app's own sandbox — not visible in the Photos/Gallery
// app, no permissions required on either platform, and gets cleaned up
// automatically if the user deletes the app. This is where scanned
// documents should live by default.
// =====================================================================

import {
  DocumentDirectoryPath,
  exists,
  mkdir,
} from '@dr.pogodin/react-native-fs';
import sanitize from 'sanitize-filename';

const SCANS_FOLDER = 'scans';
const scansDirPath = `${DocumentDirectoryPath}/${SCANS_FOLDER}`;

const buildScanPath = (title: string, ext: 'png' | 'jpg' = 'jpg'): string => {
  const base = sanitize(title).trim().slice(0, 60);
  return `${scansDirPath}/${base}-${Date.now()}.${ext}`;
};

const ensureScansDirectorExists = async () => {
  const dirExists = await exists(scansDirPath);
  if (!dirExists) {
    await mkdir(scansDirPath);
  }
};

export const saveDocumentToPrivateStorage = async (
  sourceUri: string,
  fileName?: string,
): Promise<string> => {
  await ensureScansDirectorExists();
  return '';
};
