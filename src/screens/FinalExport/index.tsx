import { useDocument } from '@/context/DocumentProvider';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FinalExportProps {}

const FinalExport: FC<FinalExportProps> = () => {
  const { getActiveDoc } = useDocument();

  return (
    <SafeAreaView style={styles.container}>
      <Text>{getActiveDoc()?.name}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FinalExport;
