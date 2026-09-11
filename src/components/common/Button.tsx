import { Colors, FontSize, FontWeight, Spacing } from '@theme';
import { FC } from 'react';
import { StyleSheet, Pressable, Text, TextStyle } from 'react-native';
import {
  EvilIcons,
  EvilIconsIconName,
} from '@react-native-vector-icons/evil-icons';

type IconOptions = {
  name: EvilIconsIconName;
  size?: number;
  color?: TextStyle['color'];
  side?: 'right' | 'left';
};

type IconProps =
  | { showIcon: true; icon: IconOptions }
  | { showIcon?: false; icon?: never };

type Props = IconProps & {
  title: string;
  onPress?(): void;
};

const Button: FC<Props> = ({ title, showIcon, icon, onPress }) => {
  const iconAtRightSide = icon?.side === 'right';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.buttonStyle, pressed && styles.pressed]}
    >
      {showIcon && !iconAtRightSide && (
        <EvilIcons name={icon.name} size={icon.size} color={icon.color} />
      )}
      <Text style={styles.buttonText}>{title}</Text>
      {showIcon && iconAtRightSide && (
        <EvilIcons name={icon.name} size={icon.size} color={icon.color} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.primary,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Spacing.sm,
    gap: Spacing.xs,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.onPrimary,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.body,
  },
});

export default Button;
