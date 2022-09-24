import { Text, View } from 'react-native';

import { Container } from '@components/container';
import { isIOS } from '@libs/utilities';
import { RootStackParams } from '@navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

export const LaunchDetailScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParams, 'launch-detail'>>();
  const { launch } = params;

  return (
    <Container useScrollView>
      <View className={`flex-1 px-4 mt-${[isIOS ? '12' : '4']}`}>
        <View className="bg-secondary p-4 rounded-lg h-20 overflow-hidden">
          <View className="flex-1 flex-row items-center">
            <View className="items-center">
              <Text className="text-white text-xs font-bold">
                {format(new Date(launch.net), 'Y')}
              </Text>
            </View>
            <View className="h-full mx-3 w-px bg-dark" />
            <View className="flex-1 mr-2">
              <Text className="text-gray text-xs font-medium">
                {String(launch.net).slice(11, 16)} Local
              </Text>
              <Text className="text-gray text-xs mt-2 font-medium">
                {format(new Date(launch.net), 'MMM d, iii HH:mm O')}
              </Text>
            </View>
            {/* {launch.mission?.orbit?.abbrev && (
              <View>
                <Text className="text-white text-xs font-bold">Orbit</Text>
                <Text className="text-gray text-xs mt-2">{launch.mission?.orbit?.abbrev}</Text>
              </View>
            )} */}
          </View>
        </View>
      </View>
    </Container>
  );
};
