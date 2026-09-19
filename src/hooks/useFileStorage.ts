import { saveDocumentToPrivateStorage } from '@/storage/fileStorage';

const useFileStorage = () => {
  const saveDocImage = async (filePath: string, fileName?: string) => {
    return await saveDocumentToPrivateStorage(filePath, fileName);
  };

  return {
    saveDocImage,
  };
};

export default useFileStorage;
