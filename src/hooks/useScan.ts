import { isIOSSimulator } from '@/utils/helper';
import useImagePicker from './useImagePicker';
import DocumentScanner, {
  ResponseType,
} from 'react-native-document-scanner-plugin';

const useScan = () => {
  const { selectImage } = useImagePicker();
  const scanDocument = async () => {
    const image = {
      name: 'New Doc',
      source: '',
    };
    if (await isIOSSimulator()) {
      const asset = await selectImage();
      if (asset?.uri) image.source = asset.uri;
      if (asset?.fileName) image.name = asset.fileName;
    } else {
      const { scannedImages } = await DocumentScanner.scanDocument({
        maxNumDocuments: 1,
        responseType: ResponseType.ImageFilePath,
      });
      if (Array.isArray(scannedImages)) {
        const filePath = scannedImages[0];
        const splittedName = filePath.split('/');
        image.name = splittedName[splittedName.length - 1].split('.')[0];
        image.source = filePath;
      }
    }

    return image;
  };

  return { scanDocument };
};

export default useScan;
