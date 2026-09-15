import { FC, useContext, useState } from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import EmptyDocuments from '@screens/EmptyDocuments';
import DocumentHome from '@screens/DocumentHome';
import { Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIOSSimulator } from '@/utils/helper';
import useImagePicker from '@/hooks/useImagePicker';
import { useDocument } from '@/context/DocumentProvider';
import { DocumentGroup } from '@/types/document';

interface Props {}

const HomeScreen: FC<Props> = () => {
  const [scannedDocs, setScannedDocs] = useState<string[]>([]);
  const { navigate } = useNavigation();
  const { selectImage } = useImagePicker();
  const { getOldDocs } = useDocument();
  const documents = getOldDocs();

  const handleScanDocs = async () => {
    const image = {
      name: 'New Doc',
      source: '',
    };
    if (await isIOSSimulator()) {
      const asset = await selectImage();
      if (asset?.uri) image.source = asset.uri;
      if (asset?.fileName) image.name = asset.fileName;
    } else {
      const { scannedImages } = await DocumentScanner.scanDocument();
      if (Array.isArray(scannedImages)) {
        setScannedDocs(scannedImages);
      }
    }

    navigate('DocPreview', { image });
  };

  const handleOnDocumentPress = (item: DocumentGroup) => {};

  if (scannedDocs.length)
    return (
      <Image
        source={{ uri: scannedDocs[0] }}
        style={{ width: 300, height: 300 }}
      />
    );

  if (!documents.length)
    return <EmptyDocuments onScanBtnPress={handleScanDocs} />;

  return (
    <DocumentHome
      onDocumentPress={handleOnDocumentPress}
      onNewScanPress={handleScanDocs}
      documents={documents}
    />
  );
};

export default HomeScreen;
