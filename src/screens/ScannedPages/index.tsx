import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import PageBadge from '@/components/PageBadge';
import PageThumbnailList from '@/components/PageThumbnailList';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { useDocument } from '@/context/DocumentProvider';
import useScan from '@/hooks/useScan';
import { Colors, Spacing } from '@/theme';
import { DetailDocument, Document } from '@/types/document';
import IconButton from '@common_comp/IconButton';
import { FC, useContext, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const findDocumentIndex = (page: DetailDocument, document: Document) => {
  return page.documents.findIndex(item => item.id == document.id);
};

const ScannedPages: FC<Props> = () => {
  const [selectedDoc, setSelectedDoc] = useState<Document>();
  const { getActiveDoc, createNewDocument } = useDocument();
  const { scanDocument } = useScan();

  const scannedPage = getActiveDoc();

  const handleAddNewPage = async () => {
    const image = await scanDocument();
    createNewDocument(image.source, image.name, scannedPage?.id);
  };

  const handleOnSelect = (id: string) => {
    setSelectedDoc(scannedPage?.documents.find(item => item.id == id));
  };

  if (!scannedPage) return null;

  const { documents, name, id } = scannedPage;
  const initialPage = documents[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CommonHeader
        pageTitle={name}
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
        imageSource={selectedDoc?.filePath || initialPage.filePath}
        badge={
          <PageBadge
            total={scannedPage.documents.length}
            current={
              findDocumentIndex(scannedPage, selectedDoc || initialPage) + 1
            }
          />
        }
        showCrop
      />

      <PageThumbnailList
        pages={documents.map(item => ({
          id: item.id,
          imageSource: item.filePath,
          label: (item.order + 1).toString(),
        }))}
        selectedId={selectedDoc?.id || initialPage.id}
        onSelect={handleOnSelect}
      />

      {/* Footer */}
      <ScreenFooter
        leftAction={{
          title: 'Add Page',
          icon: {
            name: 'plus',
            size: 30,
            color: Colors.text,
          },
          onPress: handleAddNewPage,
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
