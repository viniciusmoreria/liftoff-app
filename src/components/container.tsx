import { ReactNode } from 'react';
import { ScrollViewProps, View } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  useScrollView?: boolean;
  scrollViewProps?: ScrollViewProps;
};

export const Container = ({ children, useScrollView = false, ...rest }: Props) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const safeAreaTop = insets.top + headerHeight / 1.5;

  return useScrollView ? (
    <ScrollView
      className="bg-dark"
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: safeAreaTop,
        paddingBottom: insets.bottom,
      }}
      {...rest}
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
