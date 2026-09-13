import { Colors, Spacing } from '@/theme';
import { FC } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Button from '@common_comp/Button';

interface Props {
  visible: boolean;
  onClose(): void;
  onSave(name: string): void;
}

const DocNameModal: FC<Props> = ({ visible, onClose, onSave }) => {
  return (
    <Modal transparent visible>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />
        <View style={styles.card}>
          <TextInput placeholder="This is input" />

          <View style={styles.actions}>
            <Button title="Cancel" reverseStyle onPress={onClose} />
            <Button title="Use It" onPress={() => onSave('')} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: '85%',
    backgroundColor: Colors.background,
    borderRadius: Spacing.md,
    padding: Spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
  },
});

export default DocNameModal;
