import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppEntryScreen from '@/screens/AppEntryScreen';
import DocPreview from '@/screens/DocPreview';
import ScannedPages from '@/screens/ScannedPages';
import Navigation, { MyTheme } from '@/navigation';
import { DocumentProvider } from '@/context/DocumentProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <DocumentProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <Navigation theme={MyTheme} />
        </SafeAreaProvider>
      </DocumentProvider>
    </GestureHandlerRootView>
  );
};

export default App;
