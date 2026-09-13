import { FC } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

interface Props {
  visible: boolean;
  onClose(): void;
}

const DocNameModal: FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal transparent visible={visible}>
      <Pressable onPress={onClose} style={styles.backdrop} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default DocNameModal;
