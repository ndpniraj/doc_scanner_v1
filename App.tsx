import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppEntryScreen from '@/screens/AppEntryScreen';
import DocPreview from '@/screens/DocPreview';
import ScannedPages from '@/screens/ScannedPages';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <AppEntryScreen /> */}
      <ScannedPages />
    </SafeAreaProvider>
  );
};

export default App;
