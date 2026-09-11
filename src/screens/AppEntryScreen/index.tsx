import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Onboarding from '../Onboarding';

interface Props {}

const AppEntryScreen: FC<Props> = () => {
  return (
    <Onboarding
    // onGetStarted={}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppEntryScreen;
