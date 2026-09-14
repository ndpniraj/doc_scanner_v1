import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header, { HeaderProps } from '@common_comp/Header';
import IconButton from '@common_comp/IconButton';
import { FontSize, FontWeight, Spacing } from '@/theme';

interface Props {
  pageTitle: string;
  rightContent: HeaderProps['rightContent'];
}

const CommonHeader: FC<Props> = ({ pageTitle, rightContent }) => {
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
        centerContent={
          <Text numberOfLines={1} style={styles.pageTitle}>
            {pageTitle}
          </Text>
        }
        rightContent={rightContent}
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

export default CommonHeader;
