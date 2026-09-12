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
  reverseStyle?: boolean;
  onPress?(): void;
};

const Button: FC<Props> = ({
  title,
  reverseStyle,
  showIcon,
  icon,
  onPress,
}) => {
  const iconAtRightSide = icon?.side === 'right';
  const buttonStyle = reverseStyle
    ? styles.buttonStyleReverse
    : styles.buttonStyle;
  const buttonTextStyle = reverseStyle
    ? styles.buttonStyleReverse
    : styles.buttonText;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonCommon,
        buttonStyle,
        pressed && styles.pressed,
      ]}
    >
      {showIcon && !iconAtRightSide && (
        <EvilIcons name={icon.name} size={icon.size} color={icon.color} />
      )}
      <Text style={[buttonTextStyle, styles.buttonTextCommon]}>{title}</Text>
      {showIcon && iconAtRightSide && (
        <EvilIcons name={icon.name} size={icon.size} color={icon.color} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonCommon: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Spacing.sm,
    gap: Spacing.xs,
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
  },
  buttonStyleReverse: {
    backgroundColor: Colors.onPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonTextCommon: {
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.body,
  },
  buttonText: {
    color: Colors.onPrimary,
  },
  buttonTextReverse: {
    color: Colors.primary,
  },
});

export default Button;
