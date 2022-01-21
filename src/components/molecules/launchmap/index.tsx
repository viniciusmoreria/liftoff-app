import React from 'react';

import { Linking, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { CaretDownIcon } from '@assets/icons';
import * as Atoms from '@components/atoms';
import type { Launchpad } from '@types';

import { customMapStyle } from './customStyle';

function LaunchMap({ launchpad }: { launchpad: Launchpad }) {
  const { latitude, longitude, locality, region, name } = launchpad;

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
    <Atoms.Card sx={{ p: 0 }}>
      <MapView
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        region={{
          latitude: launchpad.latitude,
          longitude: launchpad.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 20,
        }}
        style={{ height: 200, width: '100%', borderRadius: 8 }}
        provider={PROVIDER_GOOGLE}
        customMapStyle={customMapStyle}
        onPress={() => {
          handleOpenGps();
        }}
      >
        <Marker
          icon={CaretDownIcon}
          coordinate={{
            latitude: launchpad.latitude,
            longitude: launchpad.longitude,
          }}
        />
      </MapView>

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
  );
}

export { LaunchMap };
