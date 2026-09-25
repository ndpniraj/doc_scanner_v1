import { CPoint, ImageSize } from '@/types/document';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CornerHandle from './CornerHandle';
import { getContainFit } from '@/utils/geometry';

interface Props {
  uri: string;
  containerSize: ImageSize;
  originalSize: ImageSize;
  initialCorners: CPoint[];
}

const CornerEditor: FC<Props> = ({ originalSize, containerSize, uri }) => {
  const fit = getContainFit(originalSize, containerSize);
  console.log('fit: ', fit);
  console.log('originalSize: ', originalSize);
  console.log('containerSize: ', containerSize);

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={containerSize} />

      <CornerHandle position={{ x: 100, y: 120 }} />
      <CornerHandle position={{ x: 250, y: 120 }} />
      <CornerHandle position={{ x: 100, y: 220 }} />
      <CornerHandle position={{ x: 200, y: 220 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CornerEditor;
