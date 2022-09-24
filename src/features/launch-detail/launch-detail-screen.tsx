import { Text, View } from 'react-native';

import { Container } from '@components/container';
import { RootStackParams } from '@navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';

export const LaunchDetailScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParams, 'launch-detail'>>();
  const { launch } = params;

  return (
    <Container useScrollView>
      <View>
        <Text>{launch.name}</Text>
      </View>
    </Container>
  );
};
