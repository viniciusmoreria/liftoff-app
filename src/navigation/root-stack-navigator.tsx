import { HomeScreen } from '@features/home/home-screen';
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
          name="home"
          component={HomeScreen}
          options={{
            animation: 'fade_from_bottom',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
