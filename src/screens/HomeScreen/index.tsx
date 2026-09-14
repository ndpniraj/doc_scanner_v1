import { FC, useContext, useState } from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import EmptyDocuments from '@screens/EmptyDocuments';
import DocumentHome from '@screens/DocumentHome';
import { Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIOSSimulator } from '@/utils/helper';
import useImagePicker from '@/hooks/useImagePicker';
import { DocumentContext } from '@/context/DocumentProvider';

interface Props {}

const documents = [];

const HomeScreen: FC<Props> = () => {
  const [scannedDocs, setScannedDocs] = useState<string[]>([]);
  const { navigate } = useNavigation();
  const { selectImage } = useImagePicker();
  const something = useContext(DocumentContext);

  console.log(something);

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
