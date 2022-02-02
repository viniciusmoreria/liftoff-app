import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDripsyTheme } from 'dripsy';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArticleDetail from '@pages/ArticleDetail';
import Articles from '@pages/Articles';
import Home from '@pages/Home';
import LaunchDetail from '@pages/LaunchDetail';
import Launches from '@pages/Launches';
import Profile from '@pages/Profile';
import Splash from '@pages/Splash';
import Tweets from '@pages/Tweets';
import type { LaunchProps, ArticleProps } from '@types';

type IoniconType = {
  [key: string]: React.ComponentProps<typeof Ionicons>['name'];
};

export type Routes = {
  Splash: undefined;
  HomeTabs: undefined;
  Launches: undefined;
  LaunchDetail: {
    launch: LaunchProps;
  };
  Articles: undefined;
  ArticleDetail: {
    article: ArticleProps;
  };
};

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator<Routes>();

const CustomTabBar = (props: MaterialTopTabBarProps) => {
  return (
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
  );
};

function HomeTabs() {
  const { theme } = useDripsyTheme();
  const { bottom: bottomNotchHeight } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBar={(props: MaterialTopTabBarProps) => <CustomTabBar {...props} />}
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarStyle: {
          backgroundColor: '#05050b8d',
          paddingBottom: bottomNotchHeight,
        },
        swipeEnabled: false,
        tabBarIndicator: () => null,
        tabBarIcon: ({ color }) => {
          const icons: IoniconType = {
            Home: 'home',
            Tweets: 'logo-twitter',
            Profile: 'person',
          };

          return <Ionicons name={icons[route.name]} color={color} size={20} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Tweets" component={Tweets} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const AppRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' },
    }}
    initialRouteName="Splash"
  >
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen
      name="HomeTabs"
      component={HomeTabs}
      options={{
        animation: 'fade_from_bottom',
      }}
    />
    <Stack.Screen name="Launches" component={Launches} />
    <Stack.Screen name="LaunchDetail" component={LaunchDetail} />
    <Stack.Screen name="Articles" component={Articles} />
    <Stack.Screen name="ArticleDetail" component={ArticleDetail} />
  </Stack.Navigator>
);

export default AppRoutes;
