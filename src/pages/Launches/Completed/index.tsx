import React from 'react';

import { useDripsyTheme } from 'dripsy';
import { useIntl } from 'react-intl';
import { FlatList } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import * as Organisms from '@components/organisms';
import { useRecentLaunches } from '@hooks/useLaunches';
import type { LaunchProps } from '@types';

export default function Completed() {
  const { theme } = useDripsyTheme();

  const { formatMessage } = useIntl();
  const { data: launches, isLoading } = useRecentLaunches();

  if (!launches?.length && !isLoading) {
    return (
      <Atoms.Box
        sx={{
          mt: '36px',
          pl: '24px',
        }}
      >
        <Atoms.Text variant="text-xs" sx={{ color: 'white', mt: '10px' }}>
          {formatMessage({ id: 'UPCOMING_LAUNCHES.FETCH_ERROR' })}
        </Atoms.Text>
      </Atoms.Box>
    );
  }

  const renderItem = ({ item: launch }: { item: LaunchProps }) => {
    return (
      <Animated.View
        key={launch.id}
        entering={FadeIn}
        style={{ paddingHorizontal: 24 }}
      >
        <Organisms.Launch launch={launch} />
      </Animated.View>
    );
  };

  return (
    <FlatList
      data={launches}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.5}
      initialNumToRender={20}
      maxToRenderPerBatch={10}
      removeClippedSubviews
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
      style={{
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 120,
        backgroundColor: theme.colors.background,
      }}
      ListEmptyComponent={<Molecules.Loading />}
    />
  );
}
