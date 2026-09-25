import { Colors } from '@/theme';
import { CPoint } from '@/types/document';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  p1: CPoint;
  p2: CPoint;
  thickness?: number;
  color?: string;
}

const AnimatedLine: FC<Props> = ({
  p1,
  p2,
  thickness = 3,
  color = Colors.primary,
}) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);

  return (
    <View
      style={[
        styles.container,
        {
          width: length,
          height: thickness,
          backgroundColor: color,
          transform: [
            {
              translateX: p1.x,
            },
            {
              translateY: p1.y,
            },
            {
              rotate: `${angle}rad`,
            },
          ],
        },
      ]}
    />
  );
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
