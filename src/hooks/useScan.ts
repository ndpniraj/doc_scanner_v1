import { isIOSSimulator } from '@/utils/helper';
import useImagePicker from './useImagePicker';
import DocumentScanner, {
  ResponseType,
} from 'react-native-document-scanner-plugin';
import {
  ColorConversionCodes,
  DataTypes,
  Mat,
  OpenCV,
  Size,
} from 'react-native-fast-opencv';

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

  const detectEdges = (src: Mat): Mat => {
    const gray = Mat.create(0, 0, DataTypes.CV_8UC1);
    const blur = Mat.create(0, 0, DataTypes.CV_8UC1);

    OpenCV.cvtColor(src, gray, ColorConversionCodes.COLOR_BGR2RGB);
    OpenCV.GaussianBlur(src, blur, Size.create(3, 3), 0);
    return blur;
  };

  const detectDocumentCorners = (base64: string) => {
    const src = Mat.createFromBase64(base64);
    const edge = detectEdges(src);
    return edge;
  };

  return {
    /**
     * Opens the document scanner plugin.
     *
     * @deprecated Use `detectDocumentCorners` instead.
     */
    scanDocument,
    detectDocumentCorners,
  };
};

export default useScan;
