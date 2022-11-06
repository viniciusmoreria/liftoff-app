import React, { useCallback, useMemo, useReducer } from 'react';
import { Alert, Dimensions, Image, Linking, Platform, Pressable, Text, View } from 'react-native';

import { CaretDownIcon } from '@assets/images';
import { Ionicons } from '@expo/vector-icons';
import { Pad } from '@features/home/hooks/types';
import { useAnalytics } from '@libs/firebase/analytics/use-analytics';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { customMapStyle } from './style';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const LocationMap = ({ pad }: { pad: Pad }) => {
  const { latitude, longitude, location, name } = pad;

  const { logEvent } = useAnalytics();

  const [isZoomApplied, toggleZoom] = useReducer((s) => !s, false);

  const mapInitialCamera = useMemo(
    () => ({
      center: {
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      zoom: isZoomApplied ? 12 : 4.5,
      heading: 0,
      pitch: 0,
      altitude: 0,
    }),
    [isZoomApplied, latitude, longitude]
  );

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
          logEvent('open_map', { name });
          handleOpenGps();
        },
      },
    ]);
  };

  return (
    <Pressable onPress={handleOpenExternalLink} className="mt-6">
      <View className="bg-secondary overflow-hidden rounded-lg">
        <MapView
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          style={{ height: 200, width: '100%', borderRadius: 8 }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}
          camera={mapInitialCamera}
          initialCamera={mapInitialCamera}
        >
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
          >
            <Image source={CaretDownIcon} resizeMode="contain" className="h-4" />
          </Marker>
        </MapView>

        <Pressable className="absolute right-4 top-4 z-10" onPress={toggleZoom}>
          <View className="bg-dark items-center justify-center rounded-md w-8 h-8">
            <Ionicons name={isZoomApplied ? 'remove' : 'ios-add'} color="white" size={18} />
          </View>
        </Pressable>

        <View className="bg-secondary w-full absolute bottom-0 rounded-b-lg py-3 px-2">
          <View className="flex-row items-center justify-between flex-wrap space-y-4">
            <Text className="text-white text-xs font-bold mr-2">{name}</Text>
            <Text className="text-white text-xs">{location?.name}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
