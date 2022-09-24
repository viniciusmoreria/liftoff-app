import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { isIOS } from '@libs/utilities';

type Props = {
  navigation: any;
  headerTitle: string;
};

export const screenOptions = ({ navigation, headerTitle }: Props) =>
  ({
    headerShown: true,
    headerLargeTitle: true,
    headerLargeTitleStyle: {
      fontFamily: 'Inter-Bold',
      fontSize: 28,
    },
    headerTitle: headerTitle,
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTransparent: isIOS,
    headerBlurEffect: 'dark',
    headerStyle: {
      backgroundColor: isIOS ? 'transparent' : '#252525c1',
    },
    headerTitleStyle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
    },
    headerLeft: () => (
      <TouchableWithoutFeedback onPress={navigation.goBack} style={{ marginLeft: 4 }}>
        <Ionicons name="chevron-back" color="#fff" size={28} />
      </TouchableWithoutFeedback>
    ),
  } as {});
