import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Logger } from '@libs/logger';
import * as Updates from 'expo-updates';
import { showMessage } from 'react-native-flash-message';

export function useExpoUpdates() {
  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (!update.isAvailable) return;
      const result = await Updates.fetchUpdateAsync();
      if (result.isNew) {
        showMessage({
          message: 'Update available',
          animated: true,
          duration: 5000,
          backgroundColor: '#242529',
          style: {
            borderRadius: 12,
          },
          titleStyle: {
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          },
          floating: true,
          renderCustomContent: () => (
            <View className="py-2">
              <Text className="text-md text-gray mt-2">
                A new app version is available to download.
              </Text>
              <Pressable
                className="flex-1 bg-primary items-center mt-4 p-4 rounded-lg"
                onPress={async () => await Updates.reloadAsync()}
              >
                <Text className="text-base text-white font-medium">Update and reload</Text>
              </Pressable>
            </View>
          ),
        });
      }
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, []);
}
