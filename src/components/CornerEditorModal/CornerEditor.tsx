import { ImageSize } from '@/types/document';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  uri: string;
  containerSize: ImageSize;
}

const CornerEditor: FC<Props> = ({ containerSize, uri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={containerSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CornerEditor;
