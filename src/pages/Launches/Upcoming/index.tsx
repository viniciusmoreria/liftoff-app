import React from 'react';

import { useDripsyTheme } from 'dripsy';
import { FlatList } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import * as Organisms from '@components/organisms';
import { useUpcomingLaunches } from '@hooks/useLaunches';
import type { LaunchProps } from '@types';

export default function Upcoming() {
  const { theme } = useDripsyTheme();

  const { data: launches, isLoading } = useUpcomingLaunches();

  if (!launches?.length && !isLoading) {
    return (
      <Atoms.Box
        sx={{
          mt: '36px',
          pl: '24px',
        }}
      >
        <Molecules.SectionTitle title="News" />

        <Atoms.Text variant="text-xs" sx={{ color: 'white', mt: '10px' }}>
          Something went wrong while fetching the upcoming launches, please try
          again later
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
        <Organisms.UpcomingLaunch launch={launch} />
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
