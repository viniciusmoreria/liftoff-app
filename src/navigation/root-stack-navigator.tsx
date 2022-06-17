import { SplashScreen } from "@features/splash/splash-screen";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BottomTabNavigator } from "./bottom-tab-navigator";
import { screenOptions } from "./navigator-screen-options";

const Stack = createStackNavigator();

export function RootStackNavigator() {
  const { top: safeAreaTop } = useSafeAreaInsets();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={screenOptions({ safeAreaTop })}>
        <Stack.Screen
          name="bottomTabs"
          component={BottomTabNavigator}
          options={{
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
