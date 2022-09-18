import { useReducer } from 'react';
import { Text, View } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { usePreferencesStore } from '@store/preferencesStore';

import { MenuItem } from '../menu-item';
import { NotificationSettings } from './settings';

export const NotificationSection = () => {
  const {
    allowLaunchUpdateNotifications,
    setAllowLaunchUpdateNotifications,
    allowLivestreamNotifications,
    setAllowLivestreamNotifications,
  } = usePreferencesStore();

  const [isNotificationModalEnabled, enableNotificationModal] = useReducer(
    (state) => !state,
    false
  );

  const switchLaunchUpdateNotifications = async () => {
    setAllowLaunchUpdateNotifications(!allowLaunchUpdateNotifications);
    if (allowLaunchUpdateNotifications) {
      await messaging().unsubscribeFromTopic('updates');
    } else {
      await messaging().subscribeToTopic('updates');
    }
  };

  const switchLivestreamNotifications = async () => {
    setAllowLivestreamNotifications(!allowLivestreamNotifications);
    if (allowLivestreamNotifications) {
      await messaging().unsubscribeFromTopic('webcastLive');
    } else {
      await messaging().subscribeToTopic('webcastLive');
    }
  };

  return (
    <View>
      <Text className="text-lg text-white font-bold">Notifications</Text>
      <Text className="text-md text-white mt-2">configure how you want to be notified</Text>
      <View className="justify-items-center space-y-4 bg-secondary p-4 rounded-lg mt-4">
        <View>
          <MenuItem title="Settings" onPress={enableNotificationModal} />
        </View>
        <View>
          <MenuItem
            title="Launch Updates"
            useSwitch
            isEnabled={allowLaunchUpdateNotifications}
            onPress={switchLaunchUpdateNotifications}
          />
        </View>
        <View>
          <MenuItem
            title="Available Livestream"
            useSwitch
            isEnabled={allowLivestreamNotifications}
            onPress={switchLivestreamNotifications}
          />
        </View>
      </View>

      <NotificationSettings
        present={isNotificationModalEnabled}
        onDismiss={enableNotificationModal}
      />
    </View>
  );
};
