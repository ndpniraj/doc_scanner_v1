import Button from '@/components/common/Button';
import CommonHeader from '@/components/CommonHeader';
import PreviewImageCard from '@/components/PreviewImageCard';
import ScreenFooter from '@/components/ScreenFooter';
import { Colors, Spacing } from '@/theme';
import IconButton from '@common_comp/IconButton';
import { FC, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StaticScreenProps } from '@react-navigation/native';
import DocNameModal from '@/components/DocNameModal';

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

  const hideDocNameModal = () => {
    setShowDocNameModal(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <CommonHeader
          pageTitle="Preview"
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
          }}
        />
      </SafeAreaView>
      <DocNameModal onClose={hideDocNameModal} visible={showDocNameModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DocPreview;
