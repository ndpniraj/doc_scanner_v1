import DocumentCard from '@/components/DocumentCard';
import { DocumentGroup } from '@/types/document';
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
}

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const GAP = 20;
const HORIZONTAL_PADDING = 20; // | [{} {} {}] |
const NUMBER_OF_COLUMN = 2;

const CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - GAP * (NUMBER_OF_COLUMN - 1)) /
  NUMBER_OF_COLUMN;

const DocumentHome: FC<Props> = ({ documents }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={documents.concat([
          { docIds: ['12'], id: '12', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '121', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '122', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '123', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '124', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '125', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '126', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '127', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '128', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '129', title: 'Dummy Data', thumbnail: '' },
          { docIds: ['12'], id: '130', title: 'Dummy Data', thumbnail: '' },
        ])}
        renderItem={({ item }) => {
          return (
            <View style={{ width: CARD_WIDTH }}>
              <DocumentCard
                document={{
                  id: item.id,
                  name: item.title,
                  thumbnail: item.thumbnail,
                  createdAt: new Date(Date.now()),
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DocumentHome;
