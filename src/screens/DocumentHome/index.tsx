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
        data={documents}
        renderItem={({ item }) => {
          return (
            <Pressable>
              <Text>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DocumentHome;
