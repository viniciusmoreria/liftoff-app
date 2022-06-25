import { Text, View } from 'react-native';

import { tw } from '@styles/twrnc';

const HomeScreen = () => {
  return (
    <View style={tw`flex-1 bg-dark items-center justify-center`}>
      <Text style={tw`text-2xl text-white`}>Good evening</Text>
    </View>
  );
};

export { HomeScreen };
