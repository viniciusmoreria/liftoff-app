import React from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';

import * as Atoms from '@components/atoms';
import { useBottomSheet } from '@hooks/index';
import { isIOS } from '@utils/helpers';

function NotificationSheet() {
  const { closeSheet } = useBottomSheet();

  const [isEnabled, setIsEnabled] = React.useState(false);

  const handleOpenSettings = React.useCallback(() => {
    if (isIOS) {
      Linking.openURL('app-settings:');
    } else {
      startActivityAsync(ActivityAction.NOTIFICATION_SETTINGS);
    }

    closeSheet();
  }, [closeSheet]);

  const requestNotificationPermission = React.useCallback(async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status === 'denied') {
      handleOpenSettings();

      return;
    }

    setIsEnabled(status === 'granted');

    closeSheet();
  }, [closeSheet, handleOpenSettings]);

  const getNotificationStatus = React.useCallback(async () => {
    const { status } = await Notifications.getPermissionsAsync();

    setIsEnabled(status === 'granted');
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNotificationStatus();
    }, [getNotificationStatus]),
  );

  return (
    <Atoms.Box sx={{ pt: '12px', pb: '42px' }}>
      <Atoms.Text
        variant="text-lg"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mt: '12px',
          textAlign: 'center',
        }}
      >
        Get notified before every Liftoff
      </Atoms.Text>

      <Atoms.Text
        variant="text-xs"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mt: '36px',
          mb: '12px',
          textAlign: 'center',
        }}
      >
        We will send you a notification at T-minus 10 and 5 minutes stages
      </Atoms.Text>

      <Atoms.Row
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: '24px',
          mb: '42px',
        }}
      >
        <Atoms.Button
          onPress={() => handleOpenSettings()}
          sx={{ bg: isEnabled ? 'secondary' : 'accent' }}
          title={isEnabled ? 'Turn off' : 'Off'}
          textVariant="text-sm"
        />

        <Atoms.Box sx={{ width: 12 }} />

        <Atoms.Button
          onPress={() => requestNotificationPermission()}
          title={isEnabled ? 'Enabled' : 'Enable'}
          textVariant="text-sm"
          disabled={isEnabled}
          sx={{
            bg: isEnabled ? 'accent' : 'secondary',
          }}
        />
      </Atoms.Row>
    </Atoms.Box>
  );
}

export { NotificationSheet };
