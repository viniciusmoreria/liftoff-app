import { HomeScreen } from '@features/home/home-screen';
import { MaintenanceScreen } from '@features/maintenance/maintenance-screen';
import { ProfileScreen } from '@features/profile/profile-screen';
import { SplashScreen } from '@features/splash/splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParams } from './types';

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen
          name="maintenance"
          component={MaintenanceScreen}
          options={{
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
