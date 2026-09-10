import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '@theme';

interface Props {}

const Onboarding: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.commonBox, { backgroundColor: 'white' }]}>
        <Text style={styles.header}>Hello</Text>
      </View>
      <View style={[styles.commonBox, { backgroundColor: 'tomato' }]}>
        <Text style={styles.header}>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    // width: '100%',
    // height: '100%',
    // flexDirection: 'row',
    // gap: 50,
    flex: 1,
    padding: Spacing.lg,
  },
  commonBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    fontSize: 30,
    color: 'blue',
  },
});

export default Onboarding;
