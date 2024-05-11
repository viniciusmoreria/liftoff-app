import React, { useState } from 'react';
import { Alert, Pressable, Share, Text, View } from 'react-native';

import { Container } from '@components/container';
import { Ionicons } from '@expo/vector-icons';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import {
  extractLivestreamId,
  formatToDollar,
  formatToUnit,
  getLaunchStatusColor,
  getLaunchStatusIcon,
  isIOS,
} from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import * as Application from 'expo-application';
import * as WebBrowser from 'expo-web-browser';
import { Skeleton } from 'moti/skeleton';
import FastImage from 'react-native-fast-image';
import YoutubePlayer from 'react-native-youtube-iframe';

import { LocationMap } from './components/location-map';

// import { LaunchArticles } from './components/launch-articles';

export const LaunchDetailScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParams, 'launch-detail'>>();
  const { launch } = params;

  const { logEvent } = useAnalytics();

  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);
  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  const livestreamId = extractLivestreamId(launch?.vidURLs[0]?.url);
  const rocketName = launch?.rocket?.configuration?.name;
  const rocketInfoURL =
    launch.rocket?.configuration?.wiki_url || launch.rocket?.configuration?.info_url;
  const launcherCore = launch?.rocket?.launcher_stage?.[0];

  const handleOpenExternalLink = async (url: string) => {
    Alert.alert('Open in browser?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open',
        onPress: async () => {
          logEvent('open_external_link', { url });
          await WebBrowser.openBrowserAsync(encodeURI(url), {
            readerMode: true,
          });
        },
      },
    ]);
  };

  const onShareLaunchButtonTap = async () => {
    logEvent('share_launch', { launch: launch.name });

    const shareURL = launch?.vidURLs[0]?.url ? `\n\n${launch?.vidURLs[0]?.url}` : '';
    const location = launch?.pad?.location?.name
      ? `\n\nLocation: ${launch?.pad?.location?.name}\n\n`
      : '';

    const message = `${launch.name} on ${format(new Date(launch.net), 'MMM d, yyyy')} at ${format(
      new Date(launch.net),
      'HH:mm O'
    )}${shareURL}${location}${
      launch?.mission?.description || ''
    }\n\nDownload Liftoff for Android: https://play.google.com/store/apps/details?id=${
      Application.applicationId
    }
    `;

    await Share.share({
      title: 'Liftoff - Rocket Launch Tracker',
      message: message,
    });
  };

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

        {livestreamId && livestreamId?.length > 0 ? (
          <View className="overflow-hidden mt-6 rounded-lg">
            <Skeleton show={!hasLoadedVideo}>
              <YoutubePlayer
                initialPlayerParams={{
                  modestbranding: true,
                }}
                height={220}
                videoId={livestreamId}
                webViewProps={{
                  androidLayerType: 'hardware',
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
          </View>
        ) : (
          <View className="overflow-hidden mt-6 rounded-lg">
            <View className="bg-secondary rounded-lg">
              {launch?.image && (
                <Skeleton show={!hasLoadedImage} width="100%" radius={0}>
                  <FastImage
                    source={{ uri: launch?.image }}
                    className="h-[220]"
                    accessibilityLabel={`${launch.name} launch image`}
                    onLoadEnd={() => setHasLoadedImage(true)}
                  />
                </Skeleton>
              )}

              <View className="bg-secondary w-full rounded-b-lg py-5 items-center">
                <Text className="text-white text-xs font-bold">Livestream not available</Text>
              </View>
            </View>
          </View>
        )}

        <Pressable
          onPress={onShareLaunchButtonTap}
          className="bg-secondary w-full rounded-lg py-5 mt-6 items-center justify-center"
        >
          <Text className="text-white text-xs font-bold mr-2">Share this launch</Text>
        </Pressable>

        {launch.mission && (
          <View className="bg-secondary rounded-lg p-4 justify-between mt-6">
            <View className="flex-1 space-y-3">
              <Text className="text-white text-sm font-bold">Payload</Text>

              <Text className="text-gray text-xs font-medium">
                {launch?.mission?.type} - {launch?.launch_service_provider?.name}
              </Text>

              {launch?.mission?.description && (
                <Text className="text-white text-xs">{launch?.mission?.description}</Text>
              )}
            </View>

            <View className="space-y-5 mt-6">
              <View className="flex-row justify-between">
                <Text className="text-gray text-xs font-medium">Orbit</Text>
                <Text className="text-white text-xs font-medium">
                  {launch?.mission?.orbit?.name ?? '-'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {rocketName && (
          <View className="mt-6">
            <View className="bg-secondary rounded-lg p-4">
              <View className="flex-1 space-y-3">
                <Text className="text-white text-sm font-bold">
                  {launch.rocket?.configuration?.name}
                </Text>

                {launch?.rocket?.configuration?.description && (
                  <Text className="text-gray text-xs">
                    {launch?.rocket?.configuration?.description}
                  </Text>
                )}
              </View>

              <View className="space-y-5 mt-6">
                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Successfull launches</Text>
                  <Text className="text-white text-xs font-medium">
                    {launch?.rocket?.configuration?.successful_launches ?? '-'}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">
                    Consecutives successfull launches
                  </Text>
                  <Text className="text-white text-xs font-medium">
                    {launch?.rocket?.configuration?.consecutive_successful_launches ?? '-'}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Failed launches</Text>
                  <Text className="text-white text-xs font-medium">
                    {launch?.rocket?.configuration?.failed_launches ?? '-'}
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
                  <Text className="text-gray text-xs font-medium">Diameter</Text>
                  <Text className="text-white text-xs font-medium">
                    {launch?.rocket?.configuration?.diameter
                      ? `${launch?.rocket?.configuration?.diameter} m`
                      : '-'}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Length</Text>
                  <Text className="text-white text-xs font-medium">
                    {launch?.rocket?.configuration?.length
                      ? `${launch?.rocket?.configuration?.length} m`
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

              {rocketInfoURL && (
                <Pressable
                  className="flex-row bg-dark h-6 items-center p-1.5 mt-5 rounded-md self-start mr-2"
                  onPress={() => handleOpenExternalLink(rocketInfoURL)}
                >
                  <Ionicons name="ios-link" color="white" size={14} />

                  <Text className="text-white text-xs font-medium ml-1">Wikipedia</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}

        {launcherCore && (
          <View className="mt-6">
            <View className="bg-secondary rounded-lg p-4">
              <View className="flex-row">
                <Text className="text-white text-sm font-bold mr-2">{launcherCore?.type}</Text>

                <Text className="text-gray text-sm">#{launcherCore?.launcher?.serial_number}</Text>
              </View>

              <View className="flex-1 space-y-5 mt-6">
                {launcherCore?.landing?.success && (
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray text-xs font-medium">Success</Text>
                    <Ionicons name="checkmark-sharp" color="green" size={12} />
                  </View>
                )}

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Flights</Text>
                  <Text className="text-white text-xs font-medium">
                    {launcherCore?.launcher?.flights}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Attempted Landings</Text>
                  <Text className="text-white text-xs font-medium">
                    {launcherCore?.launcher?.attempted_landings}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Successfull Landings</Text>
                  <Text className="text-white text-xs font-medium">
                    {launcherCore?.launcher?.successful_landings}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Landing Type</Text>
                  <Text className="text-white text-xs font-medium">
                    {launcherCore?.landing?.type?.abbrev ?? 'Unknown'}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-gray text-xs font-medium">Landing Name</Text>
                  <Text className="text-white text-xs font-medium">
                    {launcherCore?.landing?.location?.name ?? 'Unknown'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {launch?.pad && <LocationMap pad={launch?.pad} />}
      </View>

      {/* <LaunchArticles
        launchId={launch?.id}
        navigateToNewsDetail={(article) => {
          logEvent('news_detail', { article: article.title, articleUrl: article.url });
          navigation.navigate('news-detail', { article });
        }}
      /> */}
    </Container>
  );
};
