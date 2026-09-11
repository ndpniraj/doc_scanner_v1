import { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Onboarding from '@screens/Onboarding';
import HomeScreen from '@screens/HomeScreen';

interface Props {}

const AppEntryScreen: FC<Props> = () => {
  const [hasOnboardingFinished, setHasOnboardingFinished] = useState(false);

  if (!hasOnboardingFinished)
    return (
      <Onboarding
        onGetStarted={() => {
          setHasOnboardingFinished(true);
        }}
      />
    );

  return <HomeScreen />;
};

const styles = StyleSheet.create({
  container: {},
});

export default AppEntryScreen;
