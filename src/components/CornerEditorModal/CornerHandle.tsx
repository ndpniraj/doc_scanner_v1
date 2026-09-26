import { Colors } from '@/theme';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props {
  position: { x: SharedValue<number>; y: SharedValue<number> };
  size?: number;
  bounds: {
    mixX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

const HANDLE_SIZE = 50;
const HANDLE_DOT_SIZE = 20;

const CornerHandle: FC<Props> = ({ bounds, position, size = HANDLE_SIZE }) => {
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = usePanGesture({
    onBegin() {
      startX.value = position.x.value;
      startY.value = position.y.value;
    },
    onUpdate(evt) {
      const newX = startX.value + evt.translationX;
      const newY = startY.value + evt.translationY;

      // update x and y with bounds so that it stays inside our image and not the container
      position.x.value = Math.min(Math.max(newX, bounds.mixX), bounds.maxX);
      position.y.value = Math.min(Math.max(newY, bounds.minY), bounds.maxY);
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      width: size,
      height: size,
      transform: [
        { translateX: position.x.value - size / 2 },
        { translateY: position.y.value - size / 2 },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.handle, style]}>
        <View style={styles.handleDot} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handleDot: {
    position: 'absolute',
    width: HANDLE_DOT_SIZE,
    height: HANDLE_DOT_SIZE,
    borderRadius: HANDLE_DOT_SIZE / 2,
    zIndex: 1,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.onPrimary,
  },
});

export default CornerHandle;
