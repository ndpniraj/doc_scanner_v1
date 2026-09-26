import { Colors } from '@/theme';
import { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface Props {}

const PAGE_WIDTH = 80;
const PAGE_HEIGHT = 100;
const LINE_HEIGHT = 5;
const BORDER_SIZE = 2;

const ScanBusyIndicator: FC<Props> = () => {
  const progress = useSharedValue(0);

  const lineStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0, 1], // 0... 0.1, 0.2,... 1
          [0, PAGE_HEIGHT - LINE_HEIGHT - BORDER_SIZE * 2], // 0 ... 1, 2... 97
        ),
      },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 1], // 0 ... 1
      [0.4, 1], // 0.4 ... 1
    ),
  }));

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <Animated.View style={[styles.scanLine, lineStyle]} />
      </View>
      <Animated.Text style={[styles.title, textStyle]}>
        Scanning...
      </Animated.Text>
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
    borderWidth: BORDER_SIZE,
    borderRadius: 6,
    borderColor: 'white',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: LINE_HEIGHT,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    color: 'white',
  },
});

export default ScanBusyIndicator;
