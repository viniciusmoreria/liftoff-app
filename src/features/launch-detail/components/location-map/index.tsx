import React, { useCallback, useMemo, useReducer } from 'react';
import { Image, Linking, Platform, Pressable, Text, View } from 'react-native';

import { CaretDownIcon } from '@assets/images';
import { Ionicons } from '@expo/vector-icons';
import { Pad } from '@features/home/hooks/types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { customMapStyle } from './style';

export const LocationMap = ({ pad }: { pad: Pad }) => {
  const { latitude, longitude, location, name } = pad;

  const [isZoomApplied, toggleZoom] = useReducer((s) => !s, false);

  const mapInitialCamera = useMemo(
    () => ({
      center: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      heading: 0,
      pitch: 0,
      zoom: isZoomApplied ? 14 : 4.5,
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

  return (
    <Pressable onPress={handleOpenGps} className="mt-6">
      <View className="overflow-hidden">
        <MapView
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          style={{ height: 200, width: '100%', borderRadius: 8 }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}
          camera={mapInitialCamera}
        >
          <Marker
            coordinate={{
              latitude: Number(latitude),
              longitude: Number(longitude),
            }}
            opacity={0.8}
          >
            <Image source={CaretDownIcon} resizeMode="contain" className="h-8" />
          </Marker>
        </MapView>

        <Pressable className="absolute right-4 top-4 z-10" onPress={toggleZoom}>
          <View className="bg-darkGray items-center justify-center rounded-md w-8 h-8">
            <Ionicons name={isZoomApplied ? 'remove' : 'add'} color="white" size={18} />
          </View>
        </Pressable>

        <View className="bg-secondary absolute bottom-0 rounded-b-lg w-full px-2 py-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xs font-bold">{name}</Text>

            <Text className="text-white text-xs">{location?.name}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
