import DocumentCard from '@/components/DocumentCard';
import { Colors } from '@/theme';
import { DocumentGroup } from '@/types/document';
import { Feather } from '@react-native-vector-icons/feather';
import { FC } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  documents: DocumentGroup[];
  onNewScanPress(): void;
  onDocumentPress(item: DocumentGroup): void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const GAP = 20;
const HORIZONTAL_PADDING = 20; // | [{} {} {}] |
const NUMBER_OF_COLUMN = 2;

const CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - GAP * (NUMBER_OF_COLUMN - 1)) /
  NUMBER_OF_COLUMN;

const DocumentHome: FC<Props> = ({
  documents,
  onDocumentPress,
  onNewScanPress,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={NUMBER_OF_COLUMN}
        data={documents}
        renderItem={({ item }) => {
          return (
            <View style={{ width: CARD_WIDTH }}>
              <DocumentCard
                onPress={() => onDocumentPress(item)}
                document={{
                  id: item.id,
                  name: item.title,
                  thumbnail: item.thumbnail,
                  createdAt: new Date(item.createdAt),
                }}
              />
            </View>
          );
        }}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          gap: GAP,
          paddingBottom: 50,
        }}
        columnWrapperStyle={{
          gap: GAP,
        }}
      />
      <Pressable
        style={({ pressed }) => [
          styles.newDocBtn,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onNewScanPress}
      >
        <Feather name="camera" size={25} color={Colors.onPrimary} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newDocBtn: {
    position: 'absolute',
    right: 30,
    bottom: 80,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DocumentHome;
