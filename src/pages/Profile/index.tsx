import { ProfileStackParams } from "@navigation/types";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@screens/home";

const ProfileStack = createStackNavigator<ProfileStackParams>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="profile" component={HomeScreen} />
    </ProfileStack.Navigator>
  );
}

export { ProfileNavigator };
