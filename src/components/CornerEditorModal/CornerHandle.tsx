import { Colors } from '@/theme';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

interface Props {
  position: { x: SharedValue<number>; y: SharedValue<number> };
  size?: number;
}

const HANDLE_SIZE = 50;
const HANDLE_DOT_SIZE = 20;

const CornerHandle: FC<Props> = ({ position, size = HANDLE_SIZE }) => {
  return (
    <Animated.View
      style={[
        styles.handle,
        {
          width: size,
          height: size,
          transform: [
            { translateX: position.x.value - size / 2 },
            { translateY: position.y.value - size / 2 },
          ],
        },
      ]}
    >
      <View style={styles.handleDot} />
    </Animated.View>
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
