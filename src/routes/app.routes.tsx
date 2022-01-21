import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@pages/Home';
import LaunchDetail from '@pages/LaunchDetail';
import type { LaunchProps } from '@types';

export type Routes = {
  Home: undefined;
  LaunchDetail: {
    launch: LaunchProps;
  };
};

const Stack = createNativeStackNavigator<Routes>();

const AppRoutes = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LaunchDetail" component={LaunchDetail} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
