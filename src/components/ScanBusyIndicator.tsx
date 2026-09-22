import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

const ScanBusyIndicator: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Working on it!</Text>
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
  title: {
    fontSize: 25,
    color: 'white',
  },
});

export default ScanBusyIndicator;
