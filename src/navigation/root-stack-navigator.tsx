import { HomeScreen } from '@features/home/home-screen';
import { LaunchDetailScreen } from '@features/launch-detail/launch-detail-screen';
import { MaintenanceScreen } from '@features/maintenance/maintenance-screen';
import { NewsDetailScreen } from '@features/news-detail/news-detail';
import { NewsScreen } from '@features/news/news-screen';
import { PreviousLaunchesScreen } from '@features/previous-launches/previous-launches';
import { ProfileScreen } from '@features/profile/profile-screen';
import { SplashScreen } from '@features/splash/splash-screen';
import { UpcomingLaunchesScreen } from '@features/upcoming-launches/upcoming-launches-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { screenOptions } from './navigator-screen-options';
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
          options={({ navigation }) =>
            screenOptions({
              headerTitle: 'Profile',
              navigation,
            })
          }
        />
        <Stack.Screen
          name="upcoming-launches"
          component={UpcomingLaunchesScreen}
          options={({ navigation }) =>
            screenOptions({
              navigation,
              headerTitle: 'Upcoming',
            })
          }
        />
        <Stack.Screen
          name="previous-launches"
          component={PreviousLaunchesScreen}
          options={({ navigation }) =>
            screenOptions({
              navigation,
              headerTitle: 'Completed',
            })
          }
        />
        <Stack.Screen
          name="launch-detail"
          component={LaunchDetailScreen}
          options={({ navigation, route }) =>
            screenOptions({
              navigation,
              headerTitle: route?.params?.launch?.mission?.name ?? route?.params?.launch.name,
            })
          }
        />
        <Stack.Screen
          name="news"
          component={NewsScreen}
          options={({ navigation }) =>
            screenOptions({
              navigation,
              headerTitle: 'Whats new?',
            })
          }
        />
        <Stack.Screen name="news-detail" component={NewsDetailScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
