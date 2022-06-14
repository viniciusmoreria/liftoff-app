import { HomeStackParams } from "@navigation/types";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@screens/home";

const HomeStack = createStackNavigator<HomeStackParams>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

export { HomeNavigator };
