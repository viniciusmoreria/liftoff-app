import React from 'react';

import { ScrollView } from 'dripsy';
import { RefreshControl, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQueryClient } from 'react-query';

import * as Atoms from '@components/atoms';
import * as Organisms from '@components/organisms';

export default function Home() {
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefreshData = React.useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries();
    setRefreshing(false);
  }, [queryClient]);

  return (
    <Atoms.Box sx={{ flex: 1, bg: 'background', pt: insets.top }}>
      <StatusBar animated barStyle="light-content" />

      <ScrollView
        sx={{
          flex: 1,
          bg: 'background',
          pr: '24px',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefreshData}
            tintColor="white"
            colors={['white']}
          />
        }
        contentContainerSx={{
          pb: '36px',
        }}
      >
        <Organisms.Greeting />

        <Organisms.NextLaunch />

        <Organisms.UpcomingLaunches />

        <Organisms.RecentLaunches />

        <Organisms.Articles />
      </ScrollView>
    </Atoms.Box>
  );
}
