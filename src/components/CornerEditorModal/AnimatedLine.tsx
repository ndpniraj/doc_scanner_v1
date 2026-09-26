import { Colors } from '@/theme';
import { CPoint } from '@/types/document';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  p1: { x: SharedValue<number>; y: SharedValue<number> };
  p2: { x: SharedValue<number>; y: SharedValue<number> };
  thickness?: number;
  color?: string;
}

const AnimatedLine: FC<Props> = ({
  p1,
  p2,
  thickness = 3,
  color = Colors.primary,
}) => {
  const style = useAnimatedStyle(() => {
    const dx = p2.x.value - p1.x.value;
    const dy = p2.y.value - p1.y.value;

    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    return {
      width: length,
      height: thickness,
      backgroundColor: color,
      transform: [
        { translateX: p1.x.value },
        { translateY: p1.y.value },
        { rotate: `${angle}rad` },
      ],
    };
  });

  return <Animated.View style={[styles.container, style]} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    transformOrigin: '0% 50%',
  },
});

export default AnimatedLine;
