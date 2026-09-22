import { saveDocumentToPrivateStorage } from '@/storage/fileStorage';

const useFileStorage = () => {
  const saveDocImage = async (filePath: string, fileName?: string) => {
    return await saveDocumentToPrivateStorage(filePath, fileName);
  };

  const saveBase64Image = async (base64: string, fileName?: string) => {
    return '';
  };

  return {
    saveDocImage,
    saveBase64Image,
  };
};

export default useFileStorage;
