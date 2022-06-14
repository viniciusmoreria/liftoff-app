import { ProfileNavigator } from "@pages/profile";
import { SplashNavigator } from "@pages/splash";
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
        component={SplashNavigator}
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
        <Stack.Screen
          name="profile"
          component={ProfileNavigator}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}
