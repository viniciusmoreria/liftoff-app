import { RootStackNavigator } from '@navigation/root-stack-navigator';
import { AppProviders } from '@providers/app-providers';
import { StatusBar } from 'expo-status-bar';
import { enableFreeze, enableScreens } from 'react-native-screens';

enableFreeze(true);
enableScreens(true);

export default function App() {
  return (
    <AppProviders>
      <StatusBar animated style="light" />
      <RootStackNavigator />
    </AppProviders>
  );
}
