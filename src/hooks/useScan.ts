import { isIOSSimulator } from '@/utils/helper';
import useImagePicker from './useImagePicker';
import DocumentScanner, {
  ResponseType,
} from 'react-native-document-scanner-plugin';
import {
  ColorConversionCodes,
  ContourApproximationModes,
  DataTypes,
  Mat,
  OpenCV,
  PointVector,
  PointVectorOfVectors,
  RetrievalModes,
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

  const findDocumentContours = (src: Mat): PointVector | null => {
    const contours = PointVectorOfVectors.create();

    OpenCV.findContours(
      src,
      contours,
      RetrievalModes.RETR_EXTERNAL,
      ContourApproximationModes.CHAIN_APPROX_SIMPLE,
    );

    const allContours = contours.getAll();
    const sortedContours = allContours.sort((a, b) => {
      return OpenCV.contourArea(b).value - OpenCV.contourArea(a).value;
    });

    for (const contour of sortedContours) {
      const perimeter = OpenCV.arcLength(contour, true).value;

      const approxCurve = PointVector.create();
      OpenCV.approxPolyDP(contour, approxCurve, perimeter * 0.02, true);

      if (approxCurve.length === 4) {
        return approxCurve;
      }
    }

    return null;
  };

  const detectEdges = (src: Mat): Mat => {
    const gray = Mat.create(0, 0, DataTypes.CV_8UC1);
    const blur = Mat.create(0, 0, DataTypes.CV_8UC1);
    const edges = Mat.create(0, 0, DataTypes.CV_8UC1);

    OpenCV.cvtColor(src, gray, ColorConversionCodes.COLOR_BGR2RGB);
    OpenCV.GaussianBlur(gray, blur, Size.create(3, 3), 0);
    OpenCV.Canny(blur, edges, 50, 150);

    const contour = findDocumentContours(edges);
    console.log(contour?.getAll());

    return edges;
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
