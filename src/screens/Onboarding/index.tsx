import { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing } from '@theme';
import OnboardingWelcome from './OnboardingWelcome';
import OnboardingAutoScan from './OnboardingAutoScan';
import OnboardingExport from './OnboardingExport';
import Button from '@common_comp/Button';
import Indicators from '@common_comp/Indicators';

interface Props {}

const Onboarding: FC<Props> = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const onboardingScreens = [
    <OnboardingWelcome />,
    <OnboardingAutoScan />,
    <OnboardingExport />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          setActiveSlideIndex(onboardingScreens.length - 1);
        }}
        style={styles.skipBtn}
      >
        <Text style={styles.skipBtnLabel}>SKIP</Text>
      </Pressable>

      {onboardingScreens[activeSlideIndex]}

      <View style={styles.absoluteBottomContainer}>
        <Indicators
          size={15}
          gap={15}
          indicators={3}
          activeIndex={activeSlideIndex}
        />

        <Button
          onPress={() => {
            setActiveSlideIndex(
              Math.min(activeSlideIndex + 1, onboardingScreens.length - 1),
            );
          }}
          title={
            activeSlideIndex == onboardingScreens.length - 1
              ? 'Get Started'
              : 'Next'
          }
        />
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
    zIndex: 2,
    width: '100%',
    bottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  skipBtn: {
    zIndex: 2,
    position: 'absolute',
    top: 40,
    right: 10,
    padding: Spacing.lg,
  },
  skipBtnLabel: {
    fontSize: FontSize.body,
    textDecorationLine: 'underline',
    fontWeight: FontWeight.semibold,
    opacity: 0.5,
    color: Colors.text,
  },
});

export default Onboarding;
