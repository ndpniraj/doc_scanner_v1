import { Colors } from '@/theme';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  indicators: number;
  activeIndex: number;
  size?: number;
  gap?: number;
}

const Indicators: FC<Props> = ({
  size = 10,
  gap = 10,
  activeIndex,
  indicators,
}) => {
  if (!indicators || typeof indicators !== 'number') return null;

  const dots = new Array(indicators).fill(0);
  return (
    <View style={[styles.container, { gap }]}>
      {dots.map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              { width: size, height: size, borderRadius: size / 2 },
              activeIndex == index ? styles.active : styles.inactive,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: Colors.primary,
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.3,
  },
});

export default Indicators;
