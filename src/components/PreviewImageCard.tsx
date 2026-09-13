import { Colors, Spacing } from '@/theme';
import { Feather } from '@react-native-vector-icons/feather';
import { FC, ReactNode } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

interface Props {
  imageSource: string;
  badge?: ReactNode;
  showCrop?: boolean;
  onCropPress?(): void;
}

const PreviewImageCard: FC<Props> = ({
  imageSource,
  badge,
  showCrop,
  onCropPress,
}) => {
  return (
    <View style={styles.container}>
      {badge && <View style={styles.badgeContainer}>{badge}</View>}

      <View style={styles.imageContainer}>
        {showCrop && (
          <Pressable onPress={onCropPress} style={styles.cropButton}>
            <Feather name="crop" color="rgba(0, 0, 0, 0.7)" size={25} />
          </Pressable>
        )}

        <Image
          style={styles.image}
          source={{ uri: imageSource }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  imageContainer: {
    flex: 1,
  },
  badgeContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 12,
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'red',
  },
  cropButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    top: 25,
    right: -12,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  image: {
    flex: 1,
  },
});

export default PreviewImageCard;
