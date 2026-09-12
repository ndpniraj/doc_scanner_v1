import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '@common_comp/Header';
import IconButton from '@common_comp/IconButton';
import { FontSize, FontWeight, Spacing } from '@/theme';

interface Props {}

const PreviewHeader: FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        leftContent={
          <IconButton
            icon={{
              name: 'chevron-left',
            }}
          />
        }
        centerContent={<Text style={styles.pageTitle}>Preview</Text>}
        rightContent={
          <IconButton
            icon={{
              name: 'more-vertical',
            }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    // padding: Spacing.lg,
  },
  pageTitle: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.semibold,
  },
});

export default PreviewHeader;
