import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Linking, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { CaretDownIcon } from '@assets/icons';
import * as Atoms from '@components/atoms';
import type { Launchpad } from '@types';

import { customMapStyle } from './customStyle';

function LaunchMap({ launchpad }: { launchpad: Launchpad }) {
  const { latitude, longitude, locality, region, name } = launchpad;

  const [isZoomApplied, toggleZoom] = React.useReducer((s) => !s, false);

  const handleOpenGps = React.useCallback(() => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${latitude},${longitude}`;
    const label = name;
    const url = Platform.select({
      ios: `${scheme}${label}&ll=${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(String(url));
  }, [latitude, longitude, name]);

  return (
    <Atoms.Pressable
      onPress={() => {
        handleOpenGps();
      }}
    >
      <Atoms.Card sx={{ p: 0 }}>
        <MapView
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          region={{
            latitude,
            longitude,
            latitudeDelta: isZoomApplied ? 0.1 : 13,
            longitudeDelta: 0.01,
          }}
          style={{ height: 200, width: '100%', borderRadius: 8 }}
          provider={PROVIDER_GOOGLE}
          customMapStyle={customMapStyle}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            opacity={0.8}
          >
            <Atoms.Box>
              <Atoms.Image
                source={CaretDownIcon}
                resizeMode="contain"
                sx={{
                  height: 30,
                }}
              />
            </Atoms.Box>
          </Marker>
        </MapView>

        <Atoms.Pressable
          sx={{
            zIndex: 1,
            position: 'absolute',
            right: 0,
          }}
          onPress={toggleZoom}
        >
          <Atoms.Card
            sx={{
              width: 30,
              height: 30,
              mt: '12px',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0,
              bg: '#252525',
            }}
          >
            <Ionicons
              name={isZoomApplied ? 'remove' : 'add'}
              color="white"
              size={18}
            />
          </Atoms.Card>
        </Atoms.Pressable>

        <Atoms.Card
          sx={{
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            bg: '#252525',
          }}
        >
          <Atoms.Row
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Atoms.Box>
              <Atoms.Text
                variant="text-xs"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {locality}
              </Atoms.Text>

              <Atoms.Text
                variant="text-xs"
                sx={{
                  color: 'primary',
                  mt: '10px',
                }}
              >
                {region}
              </Atoms.Text>
            </Atoms.Box>

            <Atoms.Text
              variant="text-xs"
              sx={{
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              {name}
            </Atoms.Text>
          </Atoms.Row>
        </Atoms.Card>
      </Atoms.Card>
    </Atoms.Pressable>
  );
}

export { LaunchMap };
