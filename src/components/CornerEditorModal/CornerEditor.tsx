import { CPoint, ImageSize } from '@/types/document';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CornerHandle from './CornerHandle';
import { getContainFit, toDisplayPoint } from '@/utils/geometry';
import AnimatedLine from './AnimatedLine';

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

  const tlCorner = corners[0];
  const trCorner = corners[1];
  const brCorner = corners[2];
  const blCorner = corners[3];

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={containerSize} />

      <CornerHandle position={tlCorner} />
      <CornerHandle position={trCorner} />
      <CornerHandle position={brCorner} />
      <CornerHandle position={blCorner} />

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
