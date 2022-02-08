import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDripsyTheme } from 'dripsy';
import { BlurView } from 'expo-blur';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  TabBar,
  NavigationState,
} from 'react-native-tab-view';

import ArticleDetail from '@pages/ArticleDetail';
import Articles from '@pages/Articles';
import Home from '@pages/Home';
import LaunchDetail from '@pages/LaunchDetail';
import Launches from '@pages/Launches';
import Profile from '@pages/Profile';
import Splash from '@pages/Splash';
import Tweets from '@pages/Tweets';
import type { LaunchProps, ArticleProps } from '@types';

type Route = {
  key: string;
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};

type State = NavigationState<Route>;

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

const Stack = createNativeStackNavigator<Routes>();

const renderScene = SceneMap({
  home: Home,
  tweets: Tweets,
  profile: Profile,
});

const CustomTabBar = (
  props: SceneRendererProps & { navigationState: State },
) => {
  const { theme } = useDripsyTheme();
  const { bottom: bottomNotchHeight } = useSafeAreaInsets();

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
      <TabBar
        {...props}
        renderLabel={() => null}
        renderIcon={({ route, color }) => (
          <Ionicons name={route.icon} color={color} size={20} />
        )}
        renderIndicator={() => null}
        inactiveColor={theme.colors.primary}
        activeColor={theme.colors.accent}
        style={{
          backgroundColor: '#05050b8d',
          paddingBottom: bottomNotchHeight,
        }}
      />
    </BlurView>
  );
};

function HomeTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState<Route[]>([
    { key: 'home', title: 'home', icon: 'home' },
    { key: 'tweets', title: 'tweets', icon: 'logo-twitter' },
    { key: 'profile', title: 'profile', icon: 'person' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={(props) => <CustomTabBar {...props} />}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      swipeEnabled={false}
      tabBarPosition="bottom"
    />
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
