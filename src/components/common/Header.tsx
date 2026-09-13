import { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface HeaderProps {
  leftContent?: ReactNode;
  centerContent?: ReactNode;
  rightContent?: ReactNode;
  style?: ViewStyle;
}

const Header: FC<HeaderProps> = ({
  style,
  leftContent,
  centerContent,
  rightContent,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Content Left */}
      <View style={styles.sideContent}>{leftContent}</View>

      {/* Content Center */}
      <View style={styles.centerContent}>{centerContent}</View>

      {/* Content Right */}
      <View style={styles.sideContent}>{rightContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideContent: {
    minWidth: 45,
    alignItems: 'center',
  },
});

export default Header;
