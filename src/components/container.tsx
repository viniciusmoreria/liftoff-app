import { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, View } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  useScrollView?: boolean;
  scrollViewProps?: ScrollViewProps;
  refreshControl?: ScrollViewProps['refreshControl'];
};

export const Container = ({ children, useScrollView = false, refreshControl, ...rest }: Props) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const safeAreaTop = insets.top + headerHeight / 1.5;

  return useScrollView ? (
    <ScrollView
      className="bg-dark"
      refreshControl={refreshControl}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: safeAreaTop,
        paddingBottom: insets.bottom + 16,
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
        paddingBottom: insets.bottom + 16,
      }}
    >
      {children}
    </View>
  );
};
