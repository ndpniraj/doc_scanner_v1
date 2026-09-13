import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import PageBadge from '@/components/PageBadge';
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

const ScannedPages: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CommonHeader
        pageTitle="Preview"
        rightContent={
          <IconButton
            icon={{
              name: 'trash',
            }}
          />
        }
      />
      {/* Image */}
      <PreviewImageCard imageSource={image} badge={<PageBadge />} />

      {/* Footer */}
      <ScreenFooter
        leftAction={{
          title: 'Add Page',
          icon: {
            name: 'plus',
            size: 30,
            color: Colors.text,
          },
        }}
        rightAction={{
          title: 'Done',
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

export default ScannedPages;
