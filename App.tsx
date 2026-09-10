import { Pressable, Text, View, Button } from 'react-native';

const App = () => {
  return (
    <View style={{ marginTop: 50 }}>
      <Pressable
        style={{
          width: 300,
          height: 60,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Hello React Native</Text>
      </Pressable>
    </View>
  );
};

export default App;
