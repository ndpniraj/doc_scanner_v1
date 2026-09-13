import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Button, { IconOptions } from '@common_comp/Button';
import { Spacing } from '@/theme';

interface FooterAction {
  title: string;
  onPress?(): void;
}

interface Props {
  leftAction: FooterAction & { icon: IconOptions };
  rightAction: FooterAction;
}

const ScreenFooter: FC<Props> = ({ leftAction, rightAction }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerBtn}>
        <Button showIcon reverseStyle enableShadow {...leftAction} />
      </View>
      <View style={styles.footerBtn}>
        <Button {...rightAction} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  footerBtn: {
    flex: 1,
  },
});

export default ScreenFooter;
