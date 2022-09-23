import { Linking, Text, View } from 'react-native';

import { MenuItem } from '../menu-item';

export const LegalSection = () => {
  async function openPrivacyPolicy() {
    await Linking.openURL('https://liftoffprivacypolicy.carrd.co/');
  }

  return (
    <View className="mt-6">
      <Text className="text-lg text-white font-bold">Legal</Text>
      <View className="justify-items-center space-y-6 bg-secondary p-4 rounded-lg mt-4">
        {/* <View>
          <MenuItem title="Acknowledgments" onPress={() => null} />
        </View> */}
        <View>
          <MenuItem title="Privacy Policy" onPress={openPrivacyPolicy} />
        </View>
      </View>
    </View>
  );
};
