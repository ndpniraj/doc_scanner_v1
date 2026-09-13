import AppEntryScreen from '@/screens/AppEntryScreen';
import DocPreview from '@/screens/DocPreview';
import ScannedPages from '@/screens/ScannedPages';
import { Colors } from '@/theme';
import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    primary: Colors.primary,
  },
};

const RootStack = createNativeStackNavigator({
  initialRouteName: 'AppEntryScreen',
  screens: {
    AppEntryScreen,
    DocPreview,
    ScannedPages,
  },
  screenOptions: {
    headerShown: false,
  },
});

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
