import { FC, useEffect, useMemo, useState } from 'react';
import { Modal, StyleSheet, useWindowDimensions, View } from 'react-native';
import CommonHeader from '@/components/CommonHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CornerEditor from './CornerEditor';
import { resolveScannedDocFilePath } from '@/storage/fileStorage';
import { useDocument } from '@/context/DocumentProvider';
import { Document, ImageSize } from '@/types/document';

interface Props {
  documentId: string;
  visible: boolean;
  onClose(): void;
}

const SCREEN_PADDING = 20;

const CornerEditModal: FC<Props> = ({ documentId, visible, onClose }) => {
  const [document, setDocument] = useState<Document>();
  const [originalSize, setOriginalSize] = useState<ImageSize>({
    width: 1, // using 1 just to avoid 0/0 where you will get NaN
    height: 1,
  });

  const { width: screenWidth } = useWindowDimensions();

  const { getSingleDoc } = useDocument();
  const insets = useSafeAreaInsets();

  const containerSize = useMemo(() => {
    const originalWidth = originalSize.width;
    const originalHeight = originalSize.height;

    const aspectRatio = originalWidth / originalHeight;
    const width = screenWidth - SCREEN_PADDING * 2;
    const height = width / aspectRatio;

    return { width, height };
  }, [originalSize]);

  useEffect(() => {
    const document = getSingleDoc(documentId);
    if (document) {
      setDocument(document);
      setOriginalSize(document.originalSize);
    }
  }, [documentId]);

  if (!document) return null;

  const { originalFilePath, corners } = document;

  const initialCorners = [
    corners.topLeft,
    corners.topRight,
    corners.bottomRight,
    corners.bottomLeft,
  ];

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={[styles.container, { marginTop: insets.top }]}>
        <CommonHeader
          onRightPress={onClose}
          rightContent={null}
          pageTitle="Corner Editor"
        />

        <View style={styles.editorContainer}>
          <CornerEditor
            uri={resolveScannedDocFilePath(originalFilePath)}
            containerSize={containerSize}
            initialCorners={initialCorners}
            originalSize={originalSize}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CornerEditModal;
