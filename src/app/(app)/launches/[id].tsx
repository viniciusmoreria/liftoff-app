import { OrbitAnimation } from '@assets/animations';
import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { formatters } from '@libs/utils/formatters';
import { extractLaunchData, getLaunchStatusColor } from '@libs/utils/launches';
import { extractPageDomain, handleOpenExternalLink } from '@libs/utils/links';
import { checkValue } from '@libs/utils/validators';
import { ImageLoader, Text } from '@modules/components';
import { MapView } from '@modules/components/MapView';
import { useGetLaunchById } from '@modules/launches/getById/domain/useCases/getLaunchById';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { format } from 'date-fns';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Skeleton } from 'moti/skeleton';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Skottie } from 'react-native-skottie';
import YoutubePlayer from 'react-native-youtube-iframe';

const defaultHeaderParams = {
  headerShown: true,
};

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
);

export default function Launch() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const { launch } = useGetLaunchById({ id });

  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);

  if (!launch) return <Stack.Screen options={{ ...defaultHeaderParams, title: '' }} />;

  const {
    launchName,
    rocketName,
    padLocation,
    probability,
    launchImage,
    livestreamId,
    launchOrbit,
    rocketConfiguration,
    launcherCore,
  } = extractLaunchData({
    launch,
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}>
      <Stack.Screen options={{ ...defaultHeaderParams, title: launchName }} />
      <View style={styles.main}>
        <TouchableWithoutFeedback onPress={() => bottomSheetModalRef.current?.present()}>
          <View style={styles.card}>
            <View style={styles.cardTitle}>
              <View>
                <View style={styles.flexRow}>
                  <Text
                    text={format(new Date(launch.net), formatters.date.day_of_week)}
                    size="xxs"
                  />
                  <Text
                    text={format(new Date(launch.net), ` ${formatters.date.day_month_year}`)}
                    size="xxs"
                  />
                </View>

                <Text
                  text={`${format(new Date(launch.net), formatters.date.hour_minute)} `}
                  size="xxs"
                  weight="semiBold"
                />
              </View>
              <View style={styles.statusBadge}>
                <Text text="Status:" size="xxs" />
                <Text
                  text={launch?.status?.abbrev}
                  size="xxs"
                  weight="semiBold"
                  color={getLaunchStatusColor[launch?.status?.id]}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {livestreamId ? (
          <View style={styles.videoContainer}>
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
                  borderRadius: spacing.lg,
                }}
                onReady={() => setHasLoadedVideo(true)}
              />
            </Skeleton>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <ImageLoader source={launchImage} style={styles.launchImage} />

            <View style={styles.badge}>
              <Text
                text="Livestream not available"
                textAlign="center"
                size="xxs"
                weight="semiBold"
              />
            </View>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.flexRow}>
            <View style={styles.orbitContainer}>
              <View>
                <Text text="Orbit" size="xxs" />
                <Text text={checkValue(launchOrbit?.name)} weight="semiBold" size="xxs" />
              </View>

              <View>
                <Text text="Launch Site" size="xxs" />
                <Text
                  text={padLocation}
                  size="xxs"
                  weight="semiBold"
                  numberOfLines={2}
                  style={styles.flexText}
                />
              </View>

              {launch?.launch_type === 'previous' ? (
                <View>
                  <Text text="Type" size="xxs" />
                  <Text text={launch?.mission?.type} weight="semiBold" size="xxs" />
                </View>
              ) : (
                <View>
                  <Text text="Probability" size="xxs" />
                  <Text text={probability} weight="semiBold" size="xxs" />
                </View>
              )}
            </View>
            <Skottie autoPlay source={OrbitAnimation} style={styles.lottie} resizeMode="cover" />
          </View>
        </View>

        <View style={styles.card}>
          <Text text="Payload" size="xxs" weight="semiBold" />

          <Text
            text={`${launch?.mission?.type} - ${launch?.launch_service_provider?.name}`}
            size="xxs"
          />

          {launch?.mission?.description && <Text text={launch?.mission?.description} size="xxs" />}
        </View>

        <View style={styles.card}>
          <Text text={rocketName} size="xxs" weight="semiBold" />

          <Text text={rocketConfiguration?.description} size="xxs" />

          <View style={styles.flexRow}>
            <Text text="Successfull launches" size="xxs" />
            <Text
              text={checkValue(rocketConfiguration?.successful_launches)}
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Consecutives successfull launches" size="xxs" />
            <Text
              text={checkValue(rocketConfiguration?.consecutive_successful_launches)}
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Failed aunches" size="xxs" />
            <Text
              text={checkValue(rocketConfiguration?.failed_launches)}
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="LEO Capacity" size="xxs" />
            <Text
              text={checkValue(
                formatters.formatToUnit(rocketConfiguration?.leo_capacity, 'kilogram')
              )}
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="GTO Capacity" size="xxs" />
            <Text
              text={checkValue(
                formatters.formatToUnit(rocketConfiguration?.gto_capacity, 'kilogram')
              )}
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Thrust" size="xxs" />
            <Text
              text={
                rocketConfiguration?.to_thrust
                  ? `${checkValue(rocketConfiguration?.to_thrust)} kN`
                  : '-'
              }
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Apogee" size="xxs" />
            <Text
              text={
                rocketConfiguration?.apogee
                  ? checkValue(formatters?.formatToUnit(rocketConfiguration?.apogee, 'kilometer'))
                  : '-'
              }
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Diameter" size="xxs" />
            <Text
              text={
                rocketConfiguration?.diameter
                  ? `${checkValue(rocketConfiguration?.diameter)} m`
                  : '-'
              }
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Length" size="xxs" />
            <Text
              text={
                rocketConfiguration?.length ? `${checkValue(rocketConfiguration?.length)} m` : '-'
              }
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.flexRow}>
            <Text text="Launch cost" size="xxs" />
            <Text
              text={
                Number(rocketConfiguration?.launch_cost) > 0
                  ? checkValue(formatters.formatToDollar(rocketConfiguration?.launch_cost))
                  : '-'
              }
              size="xxs"
              weight="semiBold"
            />
          </View>

          <View style={styles.row}>
            {rocketConfiguration?.info_url && (
              <Pressable onPress={() => handleOpenExternalLink(rocketConfiguration?.info_url)}>
                <View style={styles.statusBadge}>
                  <Ionicons name="link" color="white" size={14} />
                  <Text
                    text={extractPageDomain(rocketConfiguration?.info_url) ?? 'Details'}
                    size="xxs"
                    style={styles.capitalize}
                  />
                </View>
              </Pressable>
            )}

            {rocketConfiguration?.wiki_url && (
              <Pressable onPress={() => handleOpenExternalLink(rocketConfiguration?.wiki_url)}>
                <View style={styles.statusBadge}>
                  <Ionicons name="link" color="white" size={14} />
                  <Text text="Wikipedia" size="xxs" />
                </View>
              </Pressable>
            )}
          </View>
        </View>

        {launcherCore && (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text text={launcherCore?.type} size="xxs" weight="semiBold" />
              <Text text={`#${launcherCore?.launcher?.serial_number}`} size="xxs" />
            </View>

            {launcherCore?.landing?.success && (
              <View style={styles.flexRow}>
                <Text text="Success" size="xxs" />
                <Ionicons name="checkmark-sharp" color="green" size={12} />
              </View>
            )}

            <View style={styles.flexRow}>
              <Text text="Flights" size="xxs" />
              <Text
                text={checkValue(launcherCore?.launcher?.flights)}
                size="xxs"
                weight="semiBold"
              />
            </View>

            <View style={styles.flexRow}>
              <Text text="Attempted landings" size="xxs" />
              <Text
                text={checkValue(launcherCore?.launcher?.attempted_landings)}
                size="xxs"
                weight="semiBold"
              />
            </View>

            <View style={styles.flexRow}>
              <Text text="Successfull landings" size="xxs" />
              <Text
                text={checkValue(launcherCore?.launcher?.successful_landings)}
                size="xxs"
                weight="semiBold"
              />
            </View>

            <View style={styles.flexRow}>
              <Text text="Landing type" size="xxs" />
              <Text
                text={checkValue(launcherCore?.landing?.type?.abbrev)}
                size="xxs"
                weight="semiBold"
              />
            </View>

            <View style={styles.flexRow}>
              <Text text="Landing name" size="xxs" />
              <Text
                text={checkValue(launcherCore?.landing?.location?.name)}
                size="xxs"
                weight="semiBold"
              />
            </View>
          </View>
        )}

        <MapView pad={launch.pad} />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: colors.textDim,
        }}
        handleStyle={{
          backgroundColor: colors.border,
          borderTopRightRadius: spacing.lg,
          borderTopLeftRadius: spacing.lg,
        }}
        backgroundStyle={{
          backgroundColor: colors.border,
        }}>
        <BottomSheetView style={[styles.statusContainer, { paddingBottom: bottom || spacing.lg }]}>
          <Text text={launch?.status?.name} size="md" weight="semiBold" textAlign="center" />
          <Text text={launch?.status?.description} size="xs" weight="medium" textAlign="center" />

          <Pressable style={styles.button} onPress={() => bottomSheetModalRef.current?.close()}>
            <Text text="Got it" size="xs" weight="semiBold" textAlign="center" />
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.background,
    paddingBottom: spacing.lg,
  },
  main: {
    flex: 1,
    rowGap: spacing.xs,
  },
  card: {
    backgroundColor: colors.border,
    padding: spacing.lg,
    borderRadius: spacing.lg,
    rowGap: spacing.sm,
  },
  imageContainer: {
    borderRadius: spacing.lg,
    overflow: 'hidden',
  },
  cardTitle: {
    columnGap: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.xs,
  },
  flexText: {
    flex: 1,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.xxs,
    backgroundColor: colors.background,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.xs,
    borderRadius: spacing.xs,
  },
  launchImage: {
    height: 220,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    backgroundColor: colors.border,
  },
  videoContainer: {
    height: 220,
    borderRadius: spacing.lg,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  badge: {
    backgroundColor: colors.border,
    paddingVertical: spacing.sm,
    borderBottomLeftRadius: spacing.lg,
    borderBottomRightRadius: spacing.lg,
  },
  orbitContainer: {
    flex: 1,
    rowGap: spacing.xs,
  },
  contentContainer: {
    backgroundColor: colors.border,
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  statusContainer: {
    backgroundColor: colors.border,
    padding: spacing.lg,
    borderRadius: spacing.lg,
    rowGap: spacing.md,
  },
  button: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});
