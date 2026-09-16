import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import PageBadge from '@/components/PageBadge';
import PageThumbnailList from '@/components/PageThumbnailList';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { useDocument } from '@/context/DocumentProvider';
import { Colors, Spacing } from '@/theme';
import IconButton from '@common_comp/IconButton';
import { FC, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const pages = [
  {
    id: '1',
    imageSource:
      'https://thumbs.dreamstime.com/b/faded-sheet-old-white-paper-14342700.jpg?w=576',
    label: 'Image one',
  },
  {
    id: '2',
    imageSource:
      'https://c8.alamy.com/comp/D459R5/old-document-very-old-paper-with-hand-writing-and-stamps-D459R5.jpg',
    label: 'Image one',
  },
  {
    id: '3',
    imageSource:
      'https://images.unsplash.com/photo-1561812938-f6e60cbf95e3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    label: 'Image one',
  },
];

const image =
  'https://thumbs.dreamstime.com/b/faded-sheet-old-white-paper-14342700.jpg?w=576';

const ScannedPages: FC<Props> = () => {
  const { getActiveDoc } = useDocument();
  console.log(getActiveDoc());

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CommonHeader
        pageTitle="Scanned Pages"
        rightContent={
          <IconButton
            icon={{
              name: 'trash',
            }}
          />
        }
      />
      {/* Image */}
      <PreviewImageCard
        imageSource={image}
        badge={<PageBadge total={3} current={1} />}
      />

      <PageThumbnailList pages={pages} selectedId="2" onSelect={() => {}} />

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
