import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import ConfirmModal from '@/components/ConfirmModal';
import CornerEditModal from '@/components/CornerEditModal';
import DocNameModal from '@/components/DocNameModal';
import PageBadge from '@/components/PageBadge';
import PageThumbnailList from '@/components/PageThumbnailList';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { useDocument } from '@/context/DocumentProvider';
import useFileStorage from '@/hooks/useFileStorage';
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
  const [selectedImage, setSelectedImage] = useState<string>();
  const [scanning, setScanning] = useState(false);
  const [showCornerEditor, setShowCornerEditor] = useState(false);

  const { getActiveDoc, createNewDocument, updateDocumentTitle } =
    useDocument();
  const { selectImageFromDevice, detectDocumentCorners } = useScan();
  const { saveDocImage, getBase64Data, saveBase64Image } = useFileStorage();

  const scannedPage = getActiveDoc();

  const handleAddNewPage = async () => {
    try {
      setScanning(true);
      const result = await selectImageFromDevice();

      const originalFilePath = result.source;
      if (!originalFilePath) return;

      // to update the image card UI
      setSelectedImage(originalFilePath);

      const originalBase64Image = await getBase64Data(originalFilePath);
      const croppedImageRes = detectDocumentCorners(originalBase64Image);

      if (!croppedImageRes) return;

      const originalSize = await Image.getSize(originalFilePath);

      // Save base64 image inside the private storage and get the uri/filePath
      const croppedFilePath = await saveBase64Image(croppedImageRes.data);

      const name = result.name || 'scan_page';

      // Save the original image and remove it from temp
      const filePath = await saveDocImage(originalFilePath, name);

      // Creating and saving document record to our ls
      createNewDocument({
        originalSize,
        corners: croppedImageRes.corners,
        docName: name,
        originalFilePath: filePath,
        croppedFilePath,
        parentId: scannedPage?.id,
      });

      if (scannedPage) {
        const activeDoc = getActiveDoc(scannedPage.id);
        const documents = activeDoc?.documents || [];
        setSelectedDoc(documents[documents.length - 1]);
      }

      // to update the image card UI
      setSelectedImage(undefined);
    } catch (error) {
      console.log('Adding new page_Error: ', error);
    } finally {
      setScanning(false);
    }
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

  const openCornerEditor = () => {
    setShowCornerEditor(true);
  };

  const closeCornerEditor = () => {
    setShowCornerEditor(false);
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
        busy={scanning}
        imageSource={resolveScannedDocFilePath(
          selectedDoc?.croppedFilePath || initialPage.croppedFilePath,
        )}
        onCropPress={openCornerEditor}
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
          imageSource: resolveScannedDocFilePath(item.croppedFilePath),
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

      <CornerEditModal visible={showCornerEditor} onClose={closeCornerEditor} />
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
