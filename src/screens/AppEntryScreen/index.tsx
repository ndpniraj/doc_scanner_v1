import { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Onboarding from '@screens/Onboarding';
import HomeScreen from '@screens/HomeScreen';
import { createMMKV } from 'react-native-mmkv';

interface Props {}

const storage = createMMKV();

const AppEntryScreen: FC<Props> = () => {
  const [hasOnboardingFinished, setHasOnboardingFinished] = useState(false);
  const [checking, setChecking] = useState(true);

  const handleGetStarted = () => {
    storage.set('hasOnboardingFinished', true);
    setHasOnboardingFinished(true);
  };

  useEffect(() => {
    const result = storage.getBoolean('hasOnboardingFinished');
    if (result) {
      setHasOnboardingFinished(true);
    }

    setChecking(false);
  }, []);

  if (checking) return null;

  if (!hasOnboardingFinished)
    return <Onboarding onGetStarted={handleGetStarted} />;

  return <HomeScreen />;
};

const styles = StyleSheet.create({
  container: {},
});

export default AppEntryScreen;
