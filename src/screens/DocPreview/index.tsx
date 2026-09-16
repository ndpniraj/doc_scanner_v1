import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { Colors, Spacing } from '@/theme';
import IconButton from '@common_comp/IconButton';
import { FC, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import DocNameModal from '@/components/DocNameModal';
import { useDocument } from '@/context/DocumentProvider';

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
  const [showDocNameModal, setShowDocNameModal] = useState(true);
  const [docName, setDocName] = useState<string>();
  const { createNewDocument, updateActiveDocId } = useDocument();
  const { navigate } = useNavigation();

  const handleUsePhotoPress = () => {
    const documentGroup = createNewDocument(source, docName || name);
    updateActiveDocId(documentGroup.id);
    navigate('ScannedPages');
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
        <PreviewImageCard imageSource={source} />

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
