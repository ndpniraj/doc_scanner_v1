import Button from '@/components/common/Button';
import PreviewHeader from '@/components/PreviewHeader';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { Colors, Spacing } from '@/theme';
import IconButton from '@common_comp/IconButton';
import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
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
      <PreviewImageCard
        imageSource={image}
        badge={<View style={{ padding: 10, backgroundColor: 'black' }} />}
      />

      {/* Footer */}
      <ScreenFooter
        leftAction={{
          title: 'Retake',
          icon: {
            name: 'undo',
            size: 30,
            color: Colors.text,
          },
        }}
        rightAction={{
          title: 'Use Photo',
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DocPreview;
