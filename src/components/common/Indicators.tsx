import { Colors } from '@/theme';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  indicators: number;
  activeIndex: number;
}

const Indicators: FC<Props> = ({ activeIndex, indicators }) => {
  if (!indicators || typeof indicators !== 'number') return null;

  const dots = new Array(indicators).fill(0);
  return (
    <View style={styles.container}>
      {dots.map((_, index) => {
        return <View key={index} style={styles.dot} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});

export default Indicators;
