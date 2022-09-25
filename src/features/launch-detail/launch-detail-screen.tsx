import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Container } from '@components/container';
import { Ionicons } from '@expo/vector-icons';
import {
  formatToDollar,
  formatToUnit,
  getLaunchStatusColor,
  getLaunchStatusIcon,
  isIOS,
} from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';
import { Skeleton } from 'moti/skeleton';
import YoutubePlayer from 'react-native-youtube-iframe';

import { LocationMap } from './components/location-map';

export const LaunchDetailScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParams, 'launch-detail'>>();
  const { launch } = params;

  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);

  const livestreamId = launch?.vidURLs[0]?.url?.split('v=')[1];
  const rocketName = launch?.rocket?.configuration?.name;
  const rocketInfoURL =
    launch.rocket?.configuration?.wiki_url || launch.rocket?.configuration?.info_url;
  const launcherCore = launch?.rocket?.launcher_stage?.[0];

  return (
    <Container useScrollView>
      <View className={`flex-1 px-4 mt-${[isIOS ? '14' : '6']}`}>
        <View className="bg-secondary p-4 rounded-lg h-20 overflow-hidden">
          <View className="flex-1 flex-row items-center">
            <View className="items-center">
              <Text className="text-white text-xs font-bold">
                {format(new Date(launch.net), 'Y')}
              </Text>
            </View>
            <View className="h-full mx-3 w-px bg-dark" />
            <View className="flex-1 mr-2">
              <Text className="text-white text-xs font-medium">
                {format(new Date(launch.net), 'MMM d, iii')}
              </Text>
              <Text className="text-white text-xs mt-2 font-medium">
                {format(new Date(launch.net), 'HH:mm O')}
              </Text>
            </View>
            {launch?.status && (
              <View className="items-center bg-dark p-2 rounded-md">
                <Ionicons
                  name={getLaunchStatusIcon[launch.status.id]}
                  color={getLaunchStatusColor[launch.status.id]}
                  size={16}
                />
              </View>
            )}
          </View>
        </View>

        <View className="overflow-hidden mt-6 rounded-lg">
          {livestreamId ? (
            <Skeleton show={!hasLoadedVideo}>
              <YoutubePlayer
                height={220}
                videoId={livestreamId}
                webViewProps={{
                  injectedJavaScript: `
                var element = document.getElementsByClassName('container')[0];
                element.style.position = 'unset';
                true;
              `,
                }}
                webViewStyle={{
                  borderRadius: 8,
                }}
                onReady={() => setHasLoadedVideo(true)}
              />
            </Skeleton>
          ) : (
            <View className="bg-secondary items-center justify-center rounded-lg h-[220]">
              <Text className="text-white text-xs font-medium">Livestream not available</Text>
            </View>
          )}
        </View>

        {rocketName && (
          <Pressable
            className="mt-6"
            disabled={!rocketInfoURL}
            onPress={async () => await WebBrowser.openBrowserAsync(rocketInfoURL)}
          >
            <View className="flex-row bg-secondary rounded-lg p-4 items-center justify-between">
              <View className="flex-1 space-y-3 mr-5">
                <Text className="text-white text-sm font-bold">
                  {launch.rocket?.configuration?.name}
                </Text>

                {launch?.rocket?.configuration?.description && (
                  <Text className="text-gray text-xs">
                    {launch?.rocket?.configuration?.description}
                  </Text>
                )}
              </View>

              {rocketInfoURL && <Ionicons name="chevron-forward" color="white" size={18} />}
            </View>
          </Pressable>
        )}

        {launcherCore && (
          <Pressable
            className="mt-6"
            disabled={!launch?.pad?.wiki_url}
            onPress={async () => await WebBrowser.openBrowserAsync(launch?.pad?.wiki_url)}
          >
            <View className="flex-row bg-secondary rounded-lg p-4 items-center justify-between">
              <View>
                <View className="flex-1 flex-row">
                  <Text className="text-white text-sm font-bold mr-2">Core</Text>

                  <Text className="text-gray text-sm">
                    #{launcherCore?.launcher?.serial_number}
                  </Text>
                </View>

                <View className="flex-row">
                  <View className="flex-row bg-dark h-6 items-center p-1.5 mt-3 rounded-md self-start mr-2">
                    <Ionicons name="caret-down" color="white" size={10} />

                    <Text className="text-white text-xs font-medium ml-1">
                      {launcherCore?.landing?.type?.abbrev ?? 'Unknown'}
                    </Text>
                  </View>

                  <View className="flex-row bg-dark h-6 items-center p-1.5 mt-3 rounded-md self-start mr-2">
                    <Text className="text-white text-xs font-medium">
                      {launcherCore?.landing?.location?.abbrev ?? 'Unknown'}
                    </Text>
                  </View>

                  <View className="flex-row bg-dark h-6 items-center p-1.5 mt-3 rounded-md self-start mr-2">
                    <Ionicons name="sync" color="white" size={10} />

                    <Text className="text-white text-xs font-medium ml-1">
                      {launcherCore?.launcher?.flights}
                    </Text>
                  </View>

                  {launcherCore?.landing?.success && (
                    <View className="bg-dark h-6 w-6 items-center p-1.5 mt-3 rounded-md self-start">
                      <Ionicons name="checkmark-sharp" color="green" size={12} />
                    </View>
                  )}
                </View>
              </View>

              <Ionicons name="chevron-forward" color="white" size={18} />
            </View>
          </Pressable>
        )}

        {launch.mission && (
          <View className="bg-secondary rounded-lg p-4 justify-between mt-6">
            <View className="flex-1 space-y-3 mr-5">
              <Text className="text-white text-sm font-bold">Payload</Text>

              <Text className="text-gray text-xs font-medium">
                {launch?.mission?.type} - {launch?.launch_service_provider?.name}
              </Text>

              {launch?.mission?.description && (
                <Text className="text-white text-xs">{launch?.mission?.description}</Text>
              )}
            </View>

            <View className="space-y-4 mt-6">
              <View className="flex-row justify-between">
                <Text className="text-gray text-xs font-medium">Orbit</Text>
                <Text className="text-white text-xs font-medium">
                  {launch?.mission?.orbit?.name ?? '-'}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray text-xs font-medium">LEO Capacity</Text>
                <Text className="text-white text-xs font-medium">
                  {formatToUnit(launch?.rocket?.configuration?.leo_capacity, 'kilogram') ?? '-'}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray text-xs font-medium">GTO Capacity</Text>
                <Text className="text-white text-xs font-medium">
                  {formatToUnit(launch?.rocket?.configuration?.gto_capacity, 'kilogram') ?? '-'}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray text-xs font-medium">Thrust</Text>
                <Text className="text-white text-xs font-medium">
                  {launch?.rocket?.configuration?.to_thrust
                    ? `${launch?.rocket?.configuration?.to_thrust} kN`
                    : '-'}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray text-xs font-medium">Apogee</Text>
                <Text className="text-white text-xs font-medium">
                  {launch?.rocket?.configuration?.apogee
                    ? `${formatToUnit(launch?.rocket?.configuration?.apogee, 'kilometer')}`
                    : '-'}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-gray text-xs font-medium">Cost</Text>
                <Text className="text-white text-xs font-medium">
                  {Number(launch?.rocket?.configuration?.launch_cost) > 0
                    ? formatToDollar(launch?.rocket?.configuration?.launch_cost)
                    : '-'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {launch?.pad && <LocationMap pad={launch?.pad} />}
      </View>
    </Container>
  );
};
