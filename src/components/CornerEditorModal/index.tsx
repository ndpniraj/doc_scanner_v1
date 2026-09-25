import { FC, useEffect } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import CommonHeader from '@/components/CommonHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CornerEditor from './CornerEditor';
import { resolveScannedDocFilePath } from '@/storage/fileStorage';

interface Props {
  documentId: string;
  visible: boolean;
  onClose(): void;
}

const CornerEditModal: FC<Props> = ({ documentId, visible, onClose }) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // documentId
  }, []);

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={[styles.container, { marginTop: insets.top }]}>
        <CommonHeader
          onRightPress={onClose}
          rightContent={null}
          pageTitle="Corner Editor"
        />

        <View style={styles.editorContainer}>
          <CornerEditor uri={resolveScannedDocFilePath()} />
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
