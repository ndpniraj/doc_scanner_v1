import { Colors, Spacing } from '@/theme';
import { FC } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface PageThumbnail {
  id: string;
  imageSource: string;
  label: string;
}

interface Props {
  pages: PageThumbnail[];
  selectedId: string;
  onSelect(id: string): void;
}

const PageThumbnailList: FC<Props> = ({ pages, selectedId, onSelect }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={pages}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isSelected = item.id == selectedId;
          return (
            <Pressable
              style={styles.listItem}
              onPress={() => onSelect(item.id)}
            >
              <Image
                source={{ uri: item.imageSource }}
                style={[
                  styles.thumbnail,
                  isSelected && styles.thumbnailSelected,
                ]}
              />
              <Text style={styles.labelText}>{item.label}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
  },
  listContainer: {
    gap: 12,
    paddingHorizontal: Spacing.lg,
  },
  listItem: {
    gap: 6,
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 80,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: Colors.primary,
  },
  labelText: {
    fontSize: 12,
    color: Colors.text,
  },
});

export default PageThumbnailList;
