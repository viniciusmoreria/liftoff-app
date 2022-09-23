import { Text, View } from 'react-native';

import { usePreferencesStore } from '@store/preferencesStore';

import { MenuItem } from '../../menu-item';

export const NotificationSettings = () => {
  const {
    twentyFourHour,
    oneHour,
    tenMinutes,
    cape,
    china,
    french_guiana,
    india,
    japan,
    new_zealand,
    russia,
    van,
    wallops,
    setNotificationPreference,
  } = usePreferencesStore();

  return (
    <View className="pb-32">
      <Text className="text-xl text-white font-bold">Default Reminders</Text>

      <View className="bg-secondary p-4 rounded-lg mt-10 space-y-4">
        <View>
          <MenuItem
            title="24 hours before launch"
            useSwitch
            isEnabled={twentyFourHour}
            onPress={() =>
              setNotificationPreference({
                type: 'twentyFourHour',
                value: !twentyFourHour,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="1 hour before launch"
            useSwitch
            isEnabled={oneHour}
            onPress={() =>
              setNotificationPreference({
                type: 'oneHour',
                value: !oneHour,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="10 minutes before launch"
            useSwitch
            isEnabled={tenMinutes}
            onPress={() =>
              setNotificationPreference({
                type: 'tenMinutes',
                value: !tenMinutes,
              })
            }
          />
        </View>
      </View>

      <Text className="text-xl text-white font-bold mt-8">Launch Locations</Text>
      <Text className="text-sm text-white mt-4">
        Select the launch locations you want to receive reminders for.
      </Text>

      <View className="bg-secondary p-4 rounded-lg mt-6 space-y-4">
        <View>
          <MenuItem
            title="Cape Canaveral"
            useSwitch
            isEnabled={cape}
            onPress={() =>
              setNotificationPreference({
                type: 'cape',
                value: !cape,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="Vandenberg"
            useSwitch
            isEnabled={van}
            onPress={() =>
              setNotificationPreference({
                type: 'van',
                value: !van,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="Wallops"
            useSwitch
            isEnabled={wallops}
            onPress={() =>
              setNotificationPreference({
                type: 'wallops',
                value: !wallops,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="China"
            useSwitch
            isEnabled={china}
            onPress={() =>
              setNotificationPreference({
                type: 'china',
                value: !china,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="Russia"
            useSwitch
            isEnabled={russia}
            onPress={() =>
              setNotificationPreference({
                type: 'russia',
                value: !russia,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="India"
            useSwitch
            isEnabled={india}
            onPress={() =>
              setNotificationPreference({
                type: 'india',
                value: !india,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="Japan"
            useSwitch
            isEnabled={japan}
            onPress={() =>
              setNotificationPreference({
                type: 'japan',
                value: !japan,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="French Guiana"
            useSwitch
            isEnabled={french_guiana}
            onPress={() =>
              setNotificationPreference({
                type: 'french_guiana',
                value: !french_guiana,
              })
            }
          />
        </View>
        <View>
          <MenuItem
            title="New Zealand"
            useSwitch
            isEnabled={new_zealand}
            onPress={() =>
              setNotificationPreference({
                type: 'new_zealand',
                value: !new_zealand,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};
