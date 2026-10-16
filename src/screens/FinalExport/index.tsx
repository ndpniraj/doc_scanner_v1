import IconButton from '@/components/common/IconButton';
import CommonHeader from '@/components/CommonHeader';
import PageEditSheet from '@/components/export/PageEditSheet';
import {
  DEFAULT_TRANSFORM,
  PageTransform,
} from '@/components/export/PageImage';
import { useDocument } from '@/context/DocumentProvider';
import { resolveScannedDocFilePath } from '@/storage/fileStorage';
import { Colors } from '@/theme';
import { FC, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FinalExportProps {}

const A4_ASPECT_RATIO = 1 / 1.41421356;
const PADDING = 20;

const FinalExport: FC<FinalExportProps> = () => {
  const { getActiveDoc } = useDocument();
  const { width, height } = useWindowDimensions();
  const [selectedId, setSelectedId] = useState<string>();
  const [transform, setTransform] = useState<Record<string, PageTransform>>({});

  const pageWidth = width - PADDING * 2;
  const pageHeight = pageWidth / A4_ASPECT_RATIO;

  const docs = getActiveDoc();

  const selectedDoc = docs?.documents.find(item => item.id === selectedId);

  const updateSelectedDoc = (newTransform: PageTransform) => {
    if (!selectedId) return;
    setTransform({ ...transform, [selectedId]: newTransform });
  };
  const getTransform = (id: string) => transform[id] ?? DEFAULT_TRANSFORM;

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        pageTitle="Export"
        rightContent={<IconButton icon={{ name: 'download' }} />}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {docs?.documents.map(item => {
          return (
            <View style={styles.pageWrapper} key={item.id}>
              <View
                style={[styles.page, { width: pageWidth, height: pageHeight }]}
              >
                <Pressable onPress={() => setSelectedId(item.id)}>
                  <Image
                    source={{
                      uri: resolveScannedDocFilePath(item.croppedFilePath),
                    }}
                    style={styles.pageImage}
                    resizeMode="contain"
                  />
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <PageEditSheet
        visible={!!selectedDoc}
        onClose={() => setSelectedId(undefined)}
        transform={selectedId ? getTransform(selectedId) : DEFAULT_TRANSFORM}
        onChange={updateSelectedDoc}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f5',
  },
  scrollContent: {
    padding: PADDING,
    gap: 24,
  },
  pageWrapper: {
    alignItems: 'center',
  },
  page: {
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 7,
        color: 'rgba(0, 0, 0, 0.2)',
        spreadDistance: 0,
      },
    ],
  },
  pageImage: {
    width: '100%',
    height: '100%',
  },
});

export default FinalExport;
