import React from 'react';
import { Text, View } from 'react-native';

import { Launch } from '@features/home/hooks/types';
import { UPCOMING_LAUNCHES_QUERY_KEY } from '@features/home/hooks/use-upcoming-launches';
import { useDimensions } from '@hooks/use-dimensions';
import { FlashList } from '@shopify/flash-list';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

const SPACING = 16;

export const UpcomingCarousel = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Launch[]>([UPCOMING_LAUNCHES_QUERY_KEY]);

  const { window } = useDimensions();

  const width = window.width - SPACING * 4;

  const renderItem = ({ item }: { item: Launch }) => {
    return (
      <View className="bg-secondary p-4 rounded-lg h-24" style={{ width, marginRight: SPACING }}>
        <View className="flex-1 flex-row items-center">
          <View className="flex-1 items-center min-w-[55]">
            <Text className="text-white text-xs font-bold">
              {format(new Date(item.net), 'HH:mm ')}
            </Text>
            <Text className="text-gray text-xs mt-2">{format(new Date(item.net), 'MMM do')}</Text>
          </View>
          <View className="h-full mx-4 w-px bg-black" />
          <View className="flex-1 mr-2">
            <Text className="text-white text-xs font-bold" numberOfLines={2}>
              {item?.mission?.name ?? item?.name}
            </Text>
            <Text className="text-gray text-xs mt-2">{item?.rocket?.configuration?.full_name}</Text>
          </View>
          {item?.mission?.orbit?.abbrev && (
            <View>
              <Text className="text-white text-xs font-bold">Orbit</Text>
              <Text className="text-gray text-xs mt-2">{item?.mission?.orbit?.abbrev}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="mt-10">
      <View className="flex-row justify-between mb-4">
        <Text className="text-sm font-bold text-white">Upcoming</Text>
        <Text className="text-sm font-bold text-white">See all</Text>
      </View>

      <FlashList
        data={data?.slice(0, 5)}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        bounces={false}
        snapToInterval={width + SPACING}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        estimatedItemSize={316}
      />
    </View>
  );
};
