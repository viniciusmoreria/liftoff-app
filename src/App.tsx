import { RootStackNavigator } from '@navigation/root-stack-navigator';
import { AppProviders } from '@providers/app-providers';
import { enableLatestRenderer } from 'react-native-maps';
import { enableFreeze, enableScreens } from 'react-native-screens';

enableFreeze(true);
enableScreens(true);
enableLatestRenderer();

export default function App() {
  return (
    <AppProviders>
      <RootStackNavigator />
    </AppProviders>
  );
}
