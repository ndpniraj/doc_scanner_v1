import { Colors, Spacing } from '@/theme';
import { Feather } from '@react-native-vector-icons/feather';
import { FC, ReactNode } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import ScanBusyIndicator from './ScanBusyIndicator';

interface Props {
  imageSource: string;
  badge?: ReactNode;
  showCrop?: boolean;
  busy?: boolean;
  onCropPress?(): void;
}

const PreviewImageCard: FC<Props> = ({
  imageSource,
  badge,
  showCrop,
  busy,
  onCropPress,
}) => {
  return (
    <View style={styles.container}>
      {badge && <View style={styles.badgeContainer}>{badge}</View>}

      <View style={styles.imageContainer}>
        {showCrop && (
          <Pressable onPress={onCropPress} style={styles.cropButton}>
            <Feather name="crop" color="white" size={25} />
          </Pressable>
        )}

        <Image
          style={styles.image}
          source={{ uri: imageSource }}
          resizeMode="contain"
        />

        {busy && <ScanBusyIndicator />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  imageContainer: {
    flex: 0.9,
    marginVertical: 'auto',
    backgroundColor: Colors.surface,
  },
  badgeContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  cropButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    top: -12,
    right: -12,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  image: {
    flex: 1,
  },
});

export default PreviewImageCard;
