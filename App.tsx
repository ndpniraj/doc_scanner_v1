import { Image, Text, View, Button } from 'react-native';
import AppButton from './src/components/AppButton';

const App = () => {
  return (
    <View style={{}}>
      {/* <Image source={require('./src/assets/scanner.png')} /> */}
      {/* <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1779896412149-af18f18dbd54?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      /> */}
      <Text
        style={{
          fontSize: 50,
          color: 'red',
        }}
        numberOfLines={2}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
        aliquid praesentium quis ipsum voluptas nesciunt neque ullam aspernatur
        laborum cupiditate!
      </Text>
      <AppButton title="My New Title" />
    </View>
  );
};

export default App;
