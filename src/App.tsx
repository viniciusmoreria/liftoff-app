import { RootStackNavigator } from '@navigation/root-stack-navigator';
import { AppProviders } from '@providers/app-providers';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

export default function App() {
  return (
    <AppProviders>
      <StatusBar animated style="auto" />
      <RootStackNavigator />
    </AppProviders>
  );
}
