import { StatusBar, Text, View, Button, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Onboarding from './src/screens/Onboarding';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Onboarding />
    </SafeAreaProvider>
  );
};

export default App;
