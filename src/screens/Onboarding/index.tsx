import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing } from '@theme';
import OnboardingWelcome from './OnboardingWelcome';

interface Props {}

const Onboarding: FC<Props> = () => {
  return <OnboardingWelcome />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    padding: Spacing.lg,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  bottomContainer: {
    flex: 1,
    gap: Spacing.md,
  },
  headerContainer: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  header: {
    fontSize: FontSize.title,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  subHeaderContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  subHeader: {
    textAlign: 'center',
    fontSize: FontSize.body,
    color: Colors.text,
    fontWeight: FontWeight.semibold,
  },
});

export default Onboarding;
