import React from 'react';

import { useIntl } from 'react-intl';
import { useWindowDimensions } from 'react-native';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import * as Atoms from '@components/atoms';
import { useDripsyTheme } from '@components/atoms';
import * as Molecules from '@components/molecules';

import Completed from './Completed';
import Upcoming from './Upcoming';

type Route = {
  key: string;
  title: string;
};

type State = NavigationState<Route>;

const renderScene = SceneMap({
  upcoming: Upcoming,
  completed: Completed,
});

const CustomTabBar = (
  props: SceneRendererProps & { navigationState: State },
) => {
  const { theme } = useDripsyTheme();

  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: theme.colors.accent,
        borderRadius: 8,
      }}
      renderTabBarItem={({ route, onPress }) => (
        <Atoms.Button
          key={route.key}
          onPress={onPress}
          sx={{ bg: 'transparent' }}
          title={route.title}
          textVariant="text-xs"
          textProps={{
            fontWeight: 500,
            textTransform: 'uppercase',
          }}
        />
      )}
      style={{
        backgroundColor: 'transparent',
        marginHorizontal: 24,
      }}
    />
  );
};

export default function Launches() {
  const { formatMessage } = useIntl();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState<Route[]>([
    {
      key: 'upcoming',
      title: formatMessage({ id: 'UPCOMING_LAUNCHES.TITLE' }),
    },
    { key: 'completed', title: formatMessage({ id: 'LABELS.COMPLETED' }) },
  ]);

  return (
    <Atoms.Box
      sx={{
        flex: 1,
        bg: 'background',
      }}
    >
      <Molecules.Header title="" />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={(props) => <CustomTabBar {...props} />}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Atoms.Box>
  );
}
