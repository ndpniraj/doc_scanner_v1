import { isIOSSimulator } from '@/utils/helper';
import useImagePicker from './useImagePicker';
import DocumentScanner, {
  ResponseType,
} from 'react-native-document-scanner-plugin';
import {
  BorderTypes,
  ColorConversionCodes,
  ContourApproximationModes,
  DataTypes,
  DecompTypes,
  LineTypes,
  Mat,
  MorphShapes,
  OpenCV,
  Point,
  Point2f,
  Point2fVector,
  PointVector,
  PointVectorOfVectors,
  RetrievalModes,
  Scalar,
  Size,
} from 'react-native-fast-opencv';

type CPoint = { x: number; y: number };
type CKey = 'topLeft' | 'bottomRight' | 'topRight' | 'bottomLeft';
type Corners = Record<CKey, CPoint>;

const distance = (a: CPoint, b: CPoint) => {
  return Math.hypot(a.x - b.x, a.y - b.y);
};

const toPoint2Vector = (points: CPoint[]) => {
  const vector = Point2fVector.create();
  points.forEach(point => vector.push(Point2f.create(point.x, point.y)));

  return vector;
};

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

  const drawEdges = (src: string, documentCorners: PointVector) => {
    const debugMat = Mat.createFromBase64(src);
    const color = Scalar.create(4, 255, 207); // BGR

    const points = documentCorners.getAll();

    points.forEach(point => {
      OpenCV.circle(
        debugMat,
        Point.create(point.x, point.y),
        20,
        color,
        -1,
        LineTypes.FILLED,
      );
    });

    return debugMat;
  };

  const detectEdges = (src: Mat): Mat => {
    const gray = Mat.create(0, 0, DataTypes.CV_8UC1);
    const blur = Mat.create(0, 0, DataTypes.CV_8UC1);
    const edges = Mat.create(0, 0, DataTypes.CV_8UC1);

    OpenCV.cvtColor(src, gray, ColorConversionCodes.COLOR_BGR2RGB);
    OpenCV.GaussianBlur(gray, blur, Size.create(3, 3), 0);
    OpenCV.Canny(blur, edges, 50, 150);

    return edges;
  };

  const dilateEdges = (src: Mat): Mat => {
    const dilatedMat = Mat.create(0, 0, DataTypes.CV_8UC1);
    const kernel = OpenCV.getStructuringElement(
      MorphShapes.MORPH_RECT,
      Size.create(5, 5),
    );

    const color = Scalar.create(4, 255, 207); // BGR

    OpenCV.dilate(
      src,
      dilatedMat,
      kernel,
      Point.create(-1, -1),
      2,
      BorderTypes.BORDER_DEFAULT,
      color,
    );

    return dilatedMat;
  };

  const orderCorners = (points: Point[]) => {
    const pointSum = [...points].sort((a, b) => a.x + a.y - (b.x + b.y));
    const pointDiff = [...points].sort((a, b) => a.x - a.y - (b.x - b.y));

    return {
      topLeft: pointSum[0], // smallest x + y
      bottomRight: pointSum[3], // largest x + y
      topRight: pointDiff[0], // smallest y - x
      bottomLeft: pointDiff[3], // largest y - x
    };
  };

  const cropDocumentWithPerspective = (base64: string, corners: Corners) => {
    const { topRight, topLeft, bottomRight, bottomLeft } = corners;

    // 1. Finding how big should be our flat page?
    // For that we are calculating the width and height.
    const width = Math.round(
      Math.max(distance(topLeft, topRight), distance(bottomLeft, bottomRight)),
    );
    const height = Math.round(
      Math.max(distance(topLeft, bottomLeft), distance(topRight, bottomRight)),
    );

    // 2. FROM: corners in the old image. TO: corners in the new image.
    const from = toPoint2Vector([topLeft, topRight, bottomRight, bottomLeft]);

    const to = toPoint2Vector([
      { x: 0, y: 0 }, // new topLeft
      { x: width - 1, y: 0 }, // new topRight
      { x: width - 1, y: height - 1 }, // new bottomRight
      { x: 0, y: height - 1 }, // new bottomLeft
    ]);

    // (3x3 matrix) or the "recipe" that maps FROM onto TO
    const matrix = OpenCV.getPerspectiveTransform(
      from,
      to,
      DecompTypes.DECOMP_LU,
    );
  };

  const detectDocumentCorners = (base64: string): Mat => {
    const srcMat = Mat.createFromBase64(base64);
    const edgesMat = detectEdges(srcMat);
    const dilatedMat = dilateEdges(edgesMat);

    const corners = findDocumentContours(dilatedMat);
    if (!corners) return dilatedMat;

    const orderedCorners = orderCorners(corners.getAll());
    cropDocumentWithPerspective(base64, orderedCorners);
    return drawEdges(base64, corners);
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
