import { Colors, FontSize, FontWeight, Spacing } from '@theme';
import { FC } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

interface Props {
  title: string;
  onPress?(): void;
}

const Button: FC<Props> = ({ title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.buttonStyle, pressed && styles.pressed]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.primary,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Spacing.sm,
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
