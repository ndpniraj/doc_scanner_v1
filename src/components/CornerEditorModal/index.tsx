import { FC, useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import CommonHeader from '@/components/CommonHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CornerEditor from './CornerEditor';
import { resolveScannedDocFilePath } from '@/storage/fileStorage';
import { useDocument } from '@/context/DocumentProvider';
import { Document } from '@/types/document';

interface Props {
  documentId: string;
  visible: boolean;
  onClose(): void;
}

const CornerEditModal: FC<Props> = ({ documentId, visible, onClose }) => {
  const [document, setDocument] = useState<Document>();
  const { getSingleDoc } = useDocument();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const document = getSingleDoc(documentId);
    if (document) {
      setDocument(document);
    }
  }, [documentId]);

  if (!document) return null;

  const { originalFilePath } = document;

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
            containerSize={document.originalSize}
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
