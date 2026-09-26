import { CPoint, ImageSize } from '@/types/document';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CornerHandle from './CornerHandle';
import { getContainFit, toDisplayPoint } from '@/utils/geometry';
import AnimatedLine from './AnimatedLine';
import { useSharedValue } from 'react-native-reanimated';

interface Props {
  uri: string;
  containerSize: ImageSize;
  originalSize: ImageSize;
  initialCorners: CPoint[];
}

const CornerEditor: FC<Props> = ({
  originalSize,
  initialCorners,
  containerSize,
  uri,
}) => {
  const fit = getContainFit(originalSize, containerSize);

  const corners = initialCorners.map(point => toDisplayPoint(point, fit));

  const tl_x = useSharedValue(corners[0].x);
  const tl_y = useSharedValue(corners[0].y);

  const tr_x = useSharedValue(corners[1].x);
  const tr_y = useSharedValue(corners[1].y);

  const br_x = useSharedValue(corners[2].x);
  const br_y = useSharedValue(corners[2].y);

  const bl_x = useSharedValue(corners[3].x);
  const bl_y = useSharedValue(corners[3].y);

  const tlCorner = { x: tl_x, y: tl_y };
  const trCorner = { x: tr_x, y: tr_y };
  const brCorner = { x: br_x, y: br_y };
  const blCorner = { x: bl_x, y: bl_y };

  const bounds = {
    mixX: fit.offsetX,
    maxX: fit.offsetX + fit.renderedWidth,
    minY: fit.offsetY,
    maxY: fit.offsetY + fit.renderedHeight,
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={containerSize} />

      <CornerHandle position={tlCorner} bounds={bounds} />
      <CornerHandle position={trCorner} bounds={bounds} />
      <CornerHandle position={brCorner} bounds={bounds} />
      <CornerHandle position={blCorner} bounds={bounds} />

      <AnimatedLine p1={tlCorner} p2={trCorner} color="yellow" />
      <AnimatedLine p1={trCorner} p2={brCorner} color="yellow" />
      <AnimatedLine p1={brCorner} p2={blCorner} color="yellow" />
      <AnimatedLine p1={blCorner} p2={tlCorner} color="yellow" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CornerEditor;
