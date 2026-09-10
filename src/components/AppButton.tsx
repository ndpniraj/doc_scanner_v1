import { FC } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

interface Props {
  title: string;
}

const AppButton: FC<Props> = props => {
  return (
    <Pressable style={styles.buttonStyle}>
      <Text style={{ color: 'white', fontSize: 20 }}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 300,
    height: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppButton;
