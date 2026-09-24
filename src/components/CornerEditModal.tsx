import { FC } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import CommonHeader from './CommonHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  onClose(): void;
}

const CornerEditModal: FC<Props> = ({ visible, onClose }) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={{ marginTop: insets.top }}>
        <CommonHeader onRightPress={onClose} rightContent={null} pageTitle="" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CornerEditModal;
