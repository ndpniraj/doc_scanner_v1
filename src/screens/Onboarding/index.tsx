import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing } from '@theme';
import OnboardingWelcome from './OnboardingWelcome';
import OnboardingAutoScan from './OnboardingAutoScan';
import OnboardingExport from './OnboardingExport';
import Button from '@common_comp/Button';
import Indicators from '@/components/common/Indicators';

interface Props {}

const Onboarding: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <OnboardingWelcome />
      <View style={styles.absoluteBottomContainer}>
        <Indicators size={15} gap={15} indicators={3} activeIndex={0} />

        <Button title="Next" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    // padding: Spacing.lg,
  },
  absoluteBottomContainer: {
    position: 'absolute',
    width: '100%',
    bottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
});

export default Onboarding;
