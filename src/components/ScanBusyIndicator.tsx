import { Colors } from '@/theme';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const PAGE_WIDTH = 80;
const PAGE_HEIGHT = 100;
const LINE_HEIGHT = 3;

const ScanBusyIndicator: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <View style={styles.scanLine} />
      </View>
      <Text style={styles.title}>Scanning...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'white',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: LINE_HEIGHT,
    backgroundColor: Colors.primary,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    color: 'white',
  },
});

export default ScanBusyIndicator;
