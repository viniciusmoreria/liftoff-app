import { useReducer } from 'react';
import { Text, View } from 'react-native';

import { usePreferencesStore } from '@store/preferencesStore';

import { MenuItem } from '../menu-item';
import { NotificationSettings } from './settings';

export const NotificationSection = () => {
  const { leastOneReminder, updates, webcastLive, setNotificationPreference } =
    usePreferencesStore();

  const [isNotificationModalEnabled, enableNotificationModal] = useReducer(
    (state) => !state,
    false
  );

  return (
    <View>
      <Text className="text-lg text-white font-bold">Notifications</Text>
      <View className="justify-items-center space-y-4 bg-secondary p-4 rounded-lg mt-4">
        <View>
          <MenuItem
            title="Reminders"
            label={leastOneReminder ? 'On' : 'Off'}
            onPress={enableNotificationModal}
          />
        </View>
        <View>
          <MenuItem
            title="Launch Updates"
            useSwitch
            isEnabled={updates}
            onPress={() => setNotificationPreference({ type: 'updates', value: !updates })}
          />
        </View>
        <View>
          <MenuItem
            title="Available Livestream"
            useSwitch
            isEnabled={webcastLive}
            onPress={() =>
              setNotificationPreference({
                type: 'webcastLive',
                value: !webcastLive,
              })
            }
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
