import DocumentCard from '@/components/DocumentCard';
import { DocumentGroup } from '@/types/document';
import { FC } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  documents: DocumentGroup[];
}

const DocumentHome: FC<Props> = ({ documents }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        data={documents}
        renderItem={({ item }) => {
          return (
            <DocumentCard
              document={{
                id: item.id,
                name: item.title,
                thumbnail: item.thumbnail,
                createdAt: new Date(Date.now()),
              }}
            />
          );
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
