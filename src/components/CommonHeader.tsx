import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header, { HeaderProps } from '@common_comp/Header';
import IconButton from '@common_comp/IconButton';
import { FontSize, FontWeight, Spacing } from '@/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  pageTitle: string;
  rightContent: HeaderProps['rightContent'];
  onRightPress?(): void;
}

const CommonHeader: FC<Props> = ({ pageTitle, rightContent, onRightPress }) => {
  const { goBack, canGoBack } = useNavigation();
  const handleGoBack = () => {
    if (onRightPress) onRightPress();
    else if (canGoBack()) goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        leftContent={
          <IconButton
            icon={{
              name: 'chevron-left',
            }}
            onPress={handleGoBack}
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
