import React from 'react';

import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import * as Atoms from '@components/atoms';

function LaunchesTabBar({ state, navigation }: MaterialTopTabBarProps) {
  const { routes, index: activeRouteIndex } = state;

  return (
    <Atoms.Row sx={{ px: '24px', my: '16px' }}>
      {routes.map((route, index) => {
        const isFocused = activeRouteIndex === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Atoms.Button
            key={route.key}
            title={route.name}
            onPress={onPress}
            textVariant="text-sm"
            sx={{
              bg: isFocused ? 'accent' : 'secondary',
              borderTopRightRadius: index === 0 ? 0 : 8,
              borderBottomRightRadius: index === 0 ? 0 : 8,
              borderTopLeftRadius: index === 1 ? 0 : 8,
              borderBottomLeftRadius: index === 1 ? 0 : 8,
            }}
          />
        );
      })}
    </Atoms.Row>
  );
}

const LaunchesTabBarMemo = React.memo(LaunchesTabBar);

export { LaunchesTabBarMemo as LaunchesTabBar };
