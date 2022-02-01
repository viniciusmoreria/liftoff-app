import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';

import Completed from './Completed';
import Upcoming from './Upcoming';

const Tab = createMaterialTopTabNavigator();

export default function Launches() {
  return (
    <Atoms.Box
      sx={{
        flex: 1,
        bg: 'background',
      }}
    >
      <Molecules.Header title="Launches" />

      <Tab.Navigator
        tabBar={(props) => <Molecules.LaunchesTabBar {...props} />}
      >
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="Completed" component={Completed} />
      </Tab.Navigator>
    </Atoms.Box>
  );
}
