import { Spacing } from '@/theme';
import Button from '@common_comp/Button';
import FeatureIntro from '@common_comp/FeatureIntro';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const EmptyDocuments: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FeatureIntro
        illustration={require('../../assets/folder.png')}
        headers={['No documents yet?']}
        subHeader="Scan your first document to get started."
      >
        <View style={styles.bottomContainer}>
          <Button title="Scan your first document" />
        </View>
      </FeatureIntro>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xxl,
  },
});

export default EmptyDocuments;
