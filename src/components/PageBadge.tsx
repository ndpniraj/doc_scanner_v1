import { Colors, FontWeight } from '@/theme';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  current: number;
  total: number;
}

const PageBadge: FC<Props> = ({ current, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.badgeText}>
        {current}/{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: Colors.onPrimary,
    fontSize: 12,
    fontWeight: FontWeight.semibold,
  },
});

export default PageBadge;
