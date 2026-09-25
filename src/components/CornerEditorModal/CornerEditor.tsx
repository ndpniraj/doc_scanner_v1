import { ImageSize } from '@/types/document';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CornerHandle from './CornerHandle';

interface Props {
  uri: string;
  containerSize: ImageSize;
}

const CornerEditor: FC<Props> = ({ containerSize, uri }) => {
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
