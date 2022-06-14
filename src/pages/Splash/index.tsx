import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "@screens/splash";

const SplashStack = createStackNavigator();

function SplashNavigator() {
  return (
    <SplashStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SplashStack.Screen name="splash-screen" component={SplashScreen} />
    </SplashStack.Navigator>
  );
}

export { SplashNavigator };
