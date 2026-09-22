import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { Colors, Spacing } from '@/theme';
import IconButton from '@common_comp/IconButton';
import { FC, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StackActions,
  StaticScreenProps,
  useNavigation,
} from '@react-navigation/native';
import DocNameModal from '@/components/DocNameModal';
import { useDocument } from '@/context/DocumentProvider';
import useFileStorage from '@/hooks/useFileStorage';
import useScan from '@/hooks/useScan';
import { readFile } from '@dr.pogodin/react-native-fs';

type Props = StaticScreenProps<{
  image: {
    source: string;
    name: string;
  };
}>;

const DocPreview: FC<Props> = ({ route }) => {
  const {
    image: { name, source },
  } = route.params;

  const originalImageSource = source;

  const [showDocNameModal, setShowDocNameModal] = useState(true);
  const [docName, setDocName] = useState<string>();
  const [manipulatedImage, setManipulatedImage] = useState<string>();
  const { createNewDocument, updateActiveDocId } = useDocument();
  const navigation = useNavigation();
  const { saveDocImage, saveBase64Image } = useFileStorage();
  const { detectDocumentCorners } = useScan();

  const handleUsePhotoPress = async () => {
    try {
      const originalBase64Image = await readFile(originalImageSource, 'base64');
      const croppedImageRes = detectDocumentCorners(originalBase64Image);

      if (!croppedImageRes) return;

      const originalSize = await Image.getSize(originalImageSource);

      // Save base64 image inside the private storage and get the uri/filePath
      const croppedFilePath = await saveBase64Image(originalBase64Image);

      // Save the original image and remove it from temp
      const originalFilePath = await saveDocImage(source, docName || name);

      // Creating and saving document record to our ls
      const documentGroup = createNewDocument({
        originalSize,
        corners: croppedImageRes.corners,
        docName: docName || name,
        originalFilePath,
        croppedFilePath,
      });

      setManipulatedImage(croppedImageRes.data);
      updateActiveDocId(documentGroup.id);
      navigation.dispatch(StackActions.replace('ScannedPages'));
    } catch (error) {
      console.log('DocPreview_Error: ', error);
    }
  };

  const hideDocNameModal = () => {
    setShowDocNameModal(false);
  };

  const handleOnNameSave = (name: string) => {
    setDocName(name);
    hideDocNameModal();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <CommonHeader
          pageTitle={docName || name}
          rightContent={
            <IconButton
              icon={{
                name: 'more-vertical',
              }}
            />
          }
        />
        {/* Image */}

        <PreviewImageCard
          imageSource={
            manipulatedImage
              ? `data:image/png;base64,${manipulatedImage}`
              : originalImageSource
          }
        />

        {/* Footer */}
        <ScreenFooter
          leftAction={{
            title: 'Retake',
            icon: {
              name: 'undo',
              size: 30,
              color: Colors.text,
            },
          }}
          rightAction={{
            title: 'Use Photo',
            onPress: handleUsePhotoPress,
          }}
        />
      </SafeAreaView>
      <DocNameModal
        initialName={name}
        title="Document Name (Helps to find later)"
        onClose={hideDocNameModal}
        visible={showDocNameModal}
        onSave={handleOnNameSave}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DocPreview;
