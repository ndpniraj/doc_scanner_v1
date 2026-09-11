import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const HomeScreen: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'blue' }}>
        Home
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
