import { Colors, FontSize, FontWeight, Spacing } from '@/theme';
import { FC } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '@common_comp/Button';

interface Props {
  title: string;
  subtitle: string;
  visible: boolean;
  onClose(): void;
  onConfirm(): void;
}

const ConfirmModal: FC<Props> = ({
  title,
  subtitle,
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.actions}>
            <Button title="Cancel" reverseStyle onPress={onClose} />
            <Button title="Confirm" onPress={onConfirm} />
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
    gap: Spacing.lg,
    padding: Spacing.lg,
  },
  titleContainer: {
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.body,
    color: Colors.text,
    fontWeight: FontWeight.semibold,
  },
  subtitle: {
    color: Colors.text,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.md,
  },
  input: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 6,
    color: Colors.text,
  },
});

export default ConfirmModal;
