import { useWindowDimensions } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '@features/home/home-screen';
import { ProfileScreen } from '@features/profile/profile-screen';
import { useSafeAreaInsets } from '@libs/safe-area';
import {
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { BlurView } from 'expo-blur';

const BottomTab = createMaterialTopTabNavigator();

export function BottomTabNavigator() {
  const { width } = useWindowDimensions();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      showPageIndicator={false}
      keyboardDismissMode="on-drag"
      initialLayout={{ width }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#d83545',
        tabBarInactiveTintColor: '#c0c0c0',
        tabBarIndicator: () => null,
        tabBarStyle: {
          height: safeAreaBottom + 44,
          backgroundColor: '#05050b8d',
        },
      }}
      tabBar={(props) => (
        <BlurView
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          tint="dark"
          intensity={100}
        >
          <MaterialTopTabBar {...props} />
        </BlurView>
      )}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="home" color={color} size={20} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="person" color={color} size={20} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
