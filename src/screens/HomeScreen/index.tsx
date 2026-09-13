import { FC, useState } from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import EmptyDocuments from '@screens/EmptyDocuments';
import DocumentHome from '@screens/DocumentHome';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {}

const documents = [];

const HomeScreen: FC<Props> = () => {
  const [scannedDocs, setScannedDocs] = useState<string[]>([]);
  const navigation = useNavigation();

  const handleScanDocs = async () => {
    // const { scannedImages } = await DocumentScanner.scanDocument();
    // if (Array.isArray(scannedImages)) {
    //   setScannedDocs(scannedImages);
    // }

    navigation.navigate('DocPreview');
  };

  if (scannedDocs.length)
    return (
      <Image
        source={{ uri: scannedDocs[0] }}
        style={{ width: 300, height: 300 }}
      />
    );

  if (!documents.length)
    return <EmptyDocuments onScanBtnPress={handleScanDocs} />;

  return <DocumentHome />;
};

export default HomeScreen;
