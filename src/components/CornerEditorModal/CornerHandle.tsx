import { Colors } from '@/theme';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  position: { x: number; y: number };
  size?: number;
}

const HANDLE_SIZE = 50;
const HANDLE_DOT_SIZE = 20;

const CornerHandle: FC<Props> = ({ position, size = HANDLE_SIZE }) => {
  return (
    <View
      style={[
        styles.handle,
        {
          width: size,
          height: size,
          transform: [
            { translateX: position.x - size / 2 },
            { translateY: position.y - size / 2 },
          ],
        },
      ]}
    >
      <View style={styles.handleDot} />
    </View>
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
