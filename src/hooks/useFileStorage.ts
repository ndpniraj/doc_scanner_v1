import {
  saveBase64ToPrivateStorage,
  saveDocumentToPrivateStorage,
} from '@/storage/fileStorage';
import { readFile } from '@dr.pogodin/react-native-fs';

const useFileStorage = () => {
  const saveDocImage = async (filePath: string, fileName?: string) => {
    return await saveDocumentToPrivateStorage(filePath, fileName);
  };

  const saveBase64Image = async (base64: string, fileName?: string) => {
    return await saveBase64ToPrivateStorage(base64, fileName);
  };

  const getBase64Data = async (filePath: string) => {
    return await readFile(filePath, 'base64');
  };

  return {
    saveDocImage,
    saveBase64Image,
    getBase64Data,
  };
};

export default useFileStorage;
