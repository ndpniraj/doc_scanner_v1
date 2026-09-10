import FeatureIntro, { FeatureIntroProps } from '@common_comp/FeatureIntro';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = FeatureIntroProps;

const OnboardingCommon: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <FeatureIntro {...props} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OnboardingCommon;
