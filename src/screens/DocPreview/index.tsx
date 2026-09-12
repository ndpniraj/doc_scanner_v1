import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const image =
  'https://thumbs.dreamstime.com/b/faded-sheet-old-white-paper-14342700.jpg?w=576';

const DocPreview: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      {/* Image */}

      {/* Footer */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DocPreview;
