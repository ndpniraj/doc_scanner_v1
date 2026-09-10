import { Pressable, Text, View, Button } from 'react-native';
import AppButton from './src/components/AppButton';

const App = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <AppButton title="My New Title" />
    </View>
  );
};

export default App;
