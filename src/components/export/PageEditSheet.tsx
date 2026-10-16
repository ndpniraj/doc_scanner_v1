import { FC } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Button from '../common/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { Colors } from '@/theme';
import { PageTransform } from './PageImage';

interface PageEditSheetProps {
  onClose(): void;
  visible: boolean;
  transform: PageTransform;
  onChange(transform: PageTransform): void;
}

const MARGIN_BOTTOM = 15;
const MIN_SCALE = 0.2;

const PageEditSheet: FC<PageEditSheetProps> = ({
  visible = false,
  transform,
  onChange,
  onClose,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View
          style={[
            styles.sheet,
            { paddingBottom: inset.bottom + MARGIN_BOTTOM },
          ]}
        >
          <View style={styles.handle} />
          <Button
            title="Rotate"
            showIcon
            icon={{ name: 'redo', color: 'white', size: 22 }}
          />

          <Slider
            minimumValue={MIN_SCALE}
            maximumValue={1}
            step={0.01}
            value={transform.scale}
            onValueChange={scale => onChange({ ...transform, scale })}
            minimumTrackTintColor={Colors.primary}
            thumbTintColor={Colors.primary}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: -4,
        color: 'rgba(0, 0, 0, 0.15)',
        blurRadius: 16,
        spreadDistance: 0,
      },
    ],
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d4d4d8',
    marginBottom: MARGIN_BOTTOM,
    alignSelf: 'center',
  },
});

export default PageEditSheet;
