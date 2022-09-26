import React from 'react';
import { Pressable } from 'react-native';

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
      backgroundColor: '#16171B',
    },
    headerTitleStyle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
    },
    headerLeft: () => (
      <Pressable onPress={navigation.goBack}>
        <Ionicons name="chevron-back" color="#fff" size={28} />
      </Pressable>
    ),
  } as {});
