import { Colors, FontSize, FontWeight, Spacing } from '@/theme';
import { FC, useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Button from '@common_comp/Button';

interface Props {
  title: string;
  visible: boolean;
  initialName: string;
  onClose(): void;
  onSave(name: string): void;
}

const DocNameModal: FC<Props> = ({
  initialName,
  title,
  visible,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [selection, setSelection] = useState<TextInputProps['selection']>({
    start: 0,
    end: initialName.length,
  });

  useEffect(() => {
    if (visible) setName(initialName);
  }, [visible, initialName]);
  return (
    <Modal transparent visible={visible}>
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.backdrop} />
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            placeholder="Enter document name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#94a3d7"
            style={styles.input}
            autoFocus
            selection={selection}
            onSelectionChange={() => {
              if (name !== initialName) setSelection(undefined);
            }}
          />

          <View style={styles.actions}>
            <Button title="Cancel" reverseStyle onPress={onClose} />
            <Button title="Use It" onPress={() => onSave(name)} />
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
  title: {
    fontSize: FontSize.body,
    color: Colors.text,
    fontWeight: FontWeight.semibold,
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

export default DocNameModal;
