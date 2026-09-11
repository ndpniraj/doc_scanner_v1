import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {}

const EmptyDocuments: FC<Props> = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default EmptyDocuments;
