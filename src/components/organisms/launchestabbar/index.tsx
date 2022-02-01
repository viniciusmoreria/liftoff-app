import React from 'react';

import type { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';

function LaunchesTabBar({ state, navigation }: MaterialTopTabBarProps) {
  return (
    <Atoms.Box>
      <Molecules.Header title="" />

      <Atoms.Row sx={{ px: '24px', my: '16px' }}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

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
              onPress={onPress}
              title={route.name}
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
    </Atoms.Box>
  );
}

const LaunchesTabBarMemo = React.memo(LaunchesTabBar);

export { LaunchesTabBarMemo as LaunchesTabBar };
