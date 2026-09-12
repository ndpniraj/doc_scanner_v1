import Button from '@/components/common/Button';
import PreviewHeader from '@/components/PreviewHeader';
import { Spacing } from '@/theme';
import IconButton from '@common_comp/IconButton';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const image =
  'https://thumbs.dreamstime.com/b/faded-sheet-old-white-paper-14342700.jpg?w=576';

const DocPreview: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PreviewHeader />
      {/* Image */}

      {/* Footer */}

      <View style={styles.footer}>
        <View style={styles.footerBtn}>
          <Button
            showIcon
            icon={{ name: 'undo', size: 30 }}
            title="Retake"
            reverseStyle
            enableShadow
          />
        </View>
        <View style={styles.footerBtn}>
          <Button title="Use Photo" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  footerBtn: {
    flex: 1,
  },
});

export default DocPreview;
