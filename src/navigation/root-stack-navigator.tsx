import { HomeScreen } from '@features/home/home-screen';
import { SplashScreen } from '@features/splash/splash-screen';
import { useSafeAreaInsets } from '@libs/safe-area';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

import { screenOptions } from './navigator-screen-options';

const Stack = createStackNavigator();

export function RootStackNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={screenOptions({ safeAreaTop })}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
