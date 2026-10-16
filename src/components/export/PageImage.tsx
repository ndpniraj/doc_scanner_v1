import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

export type PageTransform = { rotation: number; scale: number };

export const DEFAULT_TRANSFORM: PageTransform = { rotation: 0, scale: 1 };

interface PageImageProps {}

const PageImage: FC<PageImageProps> = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default PageImage;
