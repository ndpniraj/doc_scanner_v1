import { Colors } from '@/theme';
import { FC } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  document: {
    id: string;
    name: string;
    thumbnail?: string;
    createdAt: Date;
  };
}

const DocumentCard: FC<Props> = ({ document }) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{ uri: document.thumbnail }}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{document.name}</Text>
        <Text style={styles.date}>{document.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 10,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 7,
        color: 'rgba(0, 0, 0, 0.2)',
      },
    ],
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 80,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.5 }, { rotate: '10deg' }],
  },
  bottomContainer: {
    padding: 10,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  date: { color: Colors.text },
});

export default DocumentCard;
