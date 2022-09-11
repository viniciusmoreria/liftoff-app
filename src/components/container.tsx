import { ReactNode } from 'react';
import { View } from 'react-native';

import { HEADER_HEIGHT } from '@libs/utilities';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  useScrollView?: boolean;
};

export const Container = ({ children, useScrollView }: Props) => {
  const insets = useSafeAreaInsets();
  const safeAreaTop = insets.top + HEADER_HEIGHT;

  return useScrollView ? (
    <ScrollView
      className="bg-dark"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: safeAreaTop,
        paddingBottom: insets.bottom,
      }}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      className="flex-1 bg-dark"
      style={{
        paddingTop: safeAreaTop,
        paddingBottom: insets.bottom,
      }}
    >
      {children}
    </View>
  );
};
