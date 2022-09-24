import { useState } from 'react';
import { Image, Text, View, useWindowDimensions } from 'react-native';

import { Launch } from '@features/home/hooks/types';
import { format } from 'date-fns';
import { Skeleton } from 'moti/skeleton';

const SPACING = 18;

export const PreviousLaunch = ({ launch }: { launch: Launch }) => {
  const { width: windowWidth } = useWindowDimensions();
  const width = windowWidth - SPACING * 2;

  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  const livestreamId = launch?.vidURLs[0]?.url?.split('v=')[1];
  const launchBySpacex = launch?.launch_service_provider?.id === 121;
  const launchImage = launchBySpacex
    ? `https://img.youtube.com/vi/${livestreamId}/0.jpg`
    : launch?.image;

  return (
    <View
      className="bg-secondary rounded-lg overflow-hidden"
      style={{ width, marginHorizontal: SPACING }}
    >
      <View className="rounded-t-lg">
        <Skeleton show={!hasLoadedImage} width="100%" radius={0}>
          <Image
            source={{ uri: launchImage }}
            className="h-32"
            accessibilityLabel={`${launch.name} launch image`}
            onLoadEnd={() => setHasLoadedImage(true)}
          />
        </Skeleton>
      </View>

      <View className="h-24 p-4">
        <View className="flex-1 flex-row items-center">
          <View className="items-center">
            <Text className="text-white text-xs font-bold">
              {format(new Date(launch.net), 'H:mm')}
            </Text>
            <Text className="text-gray text-xs mt-2">{format(new Date(launch.net), 'MMM d')}</Text>
          </View>
          <View className="h-full mx-4 w-px bg-dark" />
          <View className="flex-1 mr-2">
            <Text className="text-white text-xs font-bold" numberOfLines={2}>
              {launch?.mission?.name ?? launch?.name}
            </Text>
            <Text className="text-gray text-xs mt-2">
              {launch?.rocket?.configuration?.full_name}
            </Text>
          </View>
          {launch?.mission?.orbit?.abbrev && (
            <View>
              <Text className="text-white text-xs font-bold">Orbit</Text>
              <Text className="text-gray text-xs mt-2">{launch?.mission?.orbit?.abbrev}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
