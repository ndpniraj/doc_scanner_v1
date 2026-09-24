import { FC, useContext, useState } from 'react';
import DocumentScanner, {
  ResponseType,
} from 'react-native-document-scanner-plugin';
import EmptyDocuments from '@screens/EmptyDocuments';
import DocumentHome from '@screens/DocumentHome';
import { Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIOSSimulator } from '@/utils/helper';
import useImagePicker from '@/hooks/useImagePicker';
import { useDocument } from '@/context/DocumentProvider';
import { DocumentGroup } from '@/types/document';
import useScan from '@/hooks/useScan';
import { TemporaryDirectoryPath } from '@dr.pogodin/react-native-fs';

interface Props {}

const HomeScreen: FC<Props> = () => {
  const [scannedDocs, setScannedDocs] = useState<string[]>([]);
  const { navigate } = useNavigation();
  const { selectImage } = useImagePicker();
  const { getOldDocs, updateActiveDocId } = useDocument();
  const { selectImageFromDevice } = useScan();
  const documents = getOldDocs();

  const handleScanDocs = async () => {
    const result = await selectImageFromDevice();

    if (result.source?.trim())
      navigate('DocPreview', {
        image: { name: result.name || 'scan', source: result.source },
      });
  };

  const handleOnDocumentPress = (item: DocumentGroup) => {
    updateActiveDocId(item.id);
    navigate('ScannedPages');
  };

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
