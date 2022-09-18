import { TouchableWithoutFeedback } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
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
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Profile',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTransparent: true,
            headerBlurEffect: 'dark',
            headerTitleStyle: {
              fontFamily: 'Inter-Bold',
            },
            headerLeft: () => (
              <TouchableWithoutFeedback onPress={navigation.goBack} style={{ marginLeft: 4 }}>
                <Ionicons name="chevron-back" color="#fff" size={28} />
              </TouchableWithoutFeedback>
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
