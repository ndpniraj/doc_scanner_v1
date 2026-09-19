import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import ConfirmModal from '@/components/ConfirmModal';
import DocNameModal from '@/components/DocNameModal';
import PageBadge from '@/components/PageBadge';
import PageThumbnailList from '@/components/PageThumbnailList';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { useDocument } from '@/context/DocumentProvider';
import useScan from '@/hooks/useScan';
import { resolveScannedDocFilePath } from '@/storage/fileStorage';
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDocNameModal, setShowDocNameModal] = useState(false);
  const { getActiveDoc, createNewDocument, updateDocumentTitle } =
    useDocument();
  const { scanDocument } = useScan();

  const scannedPage = getActiveDoc();
  console.log(scannedPage);

  const handleAddNewPage = async () => {
    const image = await scanDocument();
    createNewDocument(image.source, image.name, scannedPage?.id);
  };

  const handleOnSelect = (id: string) => {
    setSelectedDoc(scannedPage?.documents.find(item => item.id == id));
  };

  const hideNameModal = () => {
    setShowDocNameModal(false);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleOnEditPress = () => {
    setShowDocNameModal(true);
  };

  const handleOnDeletePress = () => {
    setShowConfirmModal(true);
  };

  const handleTitleUpdate = (title: string) => {
    if (scannedPage) updateDocumentTitle(scannedPage.id, title);
    hideNameModal();
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
          <View style={styles.headerRightContent}>
            <IconButton
              icon={{
                name: 'trash',
              }}
              onPress={handleOnDeletePress}
            />
            <IconButton
              icon={{
                name: 'edit-3',
              }}
              onPress={handleOnEditPress}
            />
          </View>
        }
      />
      {/* Image */}
      <PreviewImageCard
        imageSource={resolveScannedDocFilePath(
          selectedDoc?.filePath || initialPage.filePath,
        )}
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
          imageSource: resolveScannedDocFilePath(item.filePath),
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

      <DocNameModal
        visible={showDocNameModal}
        initialName={scannedPage.name}
        onClose={hideNameModal}
        onSave={handleTitleUpdate}
        title="Update Document Name"
      />

      <ConfirmModal
        visible={showConfirmModal}
        onClose={hideConfirmModal}
        onConfirm={hideConfirmModal}
        title="Are you sure?"
        subtitle="This will remove this document permanently!"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRightContent: {
    flexDirection: 'row',
  },
});

export default ScannedPages;
