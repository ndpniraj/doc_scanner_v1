import { Image, Text, View, Button } from 'react-native';
import AppButton from './src/components/AppButton';

const App = () => {
  return (
    <View style={{ marginTop: 50 }}>
      {/* <Image source={require('./src/assets/scanner.png')} /> */}
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1779896412149-af18f18dbd54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
      <AppButton title="My New Title" />
    </View>
  );
};

export default App;
