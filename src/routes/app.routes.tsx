import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@pages/Home';

export type RootStackParamList = {
  Home: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const AppRoutes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name="Home" component={Home} />
  </Navigator>
);

export default AppRoutes;
