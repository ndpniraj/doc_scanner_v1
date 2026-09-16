import { FC } from 'react';
import { Pressable, StyleSheet, TextStyle, View } from 'react-native';
import { FeatherIconName, Feather } from '@react-native-vector-icons/feather';

interface Props {
  size?: number;
  icon: {
    name: FeatherIconName;
    size?: number;
    color?: TextStyle['color'];
  };
  onPress?(): void;
}

const IconButton: FC<Props> = ({ size = 55, icon, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
      ]}
    >
      <Feather name={icon.name} size={icon.size || 25} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;
