import { CaretDownIcon } from '@assets/images';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@modules/components/Text';
import { Launch } from '@modules/launches/upcoming/data/repository/fetchUpcomingLaunches';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { Image } from 'expo-image';
import { useCallback, useMemo, useReducer, useRef } from 'react';
import { Alert, Dimensions, Linking, Platform, Pressable, StyleSheet, View } from 'react-native';
import Map, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { customMapStyle } from './customStyle';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const MapView = ({ pad }: { pad: Launch['pad'] }) => {
  const { latitude, longitude, location, name } = pad;

  const mapRef = useRef<Map>(null);

  const [isZoomApplied, toggleZoom] = useReducer((s) => !s, false);

  const mapInitialCamera = useMemo(
    () => ({
      center: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      zoom: 4.5,
      heading: 0,
      pitch: 0,
      altitude: 0,
    }),
    [latitude, longitude]
  );

  const onZoomButtonTap = async () => {
    const camera = await mapRef.current?.getCamera();

    if (camera?.zoom) {
      camera.zoom = isZoomApplied ? 4.5 : 10;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }

    toggleZoom();
  };

  const handleOpenGps = useCallback(() => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = location?.name;
    const url = Platform.select({
      ios: `${scheme}${label}&ll=${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(String(url));
  }, [latitude, location?.name, longitude]);

  const handleOpenExternalLink = () => {
    Alert.alert('Open in Maps?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open',
        onPress: () => {
          handleOpenGps();
        },
      },
    ]);
  };

  return (
    <Pressable onPress={() => handleOpenExternalLink()} style={styles.container}>
      <Map
        ref={mapRef}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        camera={mapInitialCamera}
        initialCamera={mapInitialCamera}>
        <Marker
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{
            latitude: Number(latitude),
            longitude: Number(longitude),
          }}>
          <Image source={CaretDownIcon} style={styles.marker} />
        </Marker>
      </Map>

      <Pressable onPress={onZoomButtonTap} style={styles.zoom}>
        <View style={styles.statusBadge}>
          <Ionicons name={isZoomApplied ? 'remove' : 'add'} color="white" size={18} />
        </View>
      </Pressable>

      <View style={styles.bottomSection}>
        <Text text={name} size="xxs" weight="semiBold" />
        <Text text={location?.name} size="xxs" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: spacing.lg,
  },
  map: {
    height: 200,
    width: '100%',
    borderRadius: spacing.lg,
  },
  marker: {
    width: 15,
    height: 15,
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
  zoom: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
  },
  bottomSection: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: spacing.xxs,
    backgroundColor: colors.border,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderBottomEndRadius: spacing.lg,
    borderBottomStartRadius: spacing.lg,
    flexWrap: 'wrap',
  },
});
