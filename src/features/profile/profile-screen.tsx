import { Text, View } from 'react-native';

import { Container } from '@components/container';

export const ProfileScreen = () => {
  return (
    <Container>
      <View className="flex-row items-center px-8">
        <Text className="text-2xl text-white font-bold">Profile</Text>
      </View>
    </Container>
  );
};
