import { Text, View } from 'react-native';

import { MenuItem } from '../menu-item';

export const SupportSection = () => {
  return (
    <View className="mt-6">
      <Text className="text-lg text-white font-bold">Support</Text>
      <View className="justify-items-center space-y-6 bg-secondary p-4 rounded-lg mt-4">
        <View>
          <MenuItem title="Contact Support" onPress={() => null} />
        </View>
        <View>
          <MenuItem title="Rate Our App" onPress={() => null} />
        </View>
        <View>
          <MenuItem title="Share" onPress={() => null} />
        </View>
      </View>
    </View>
  );
};
