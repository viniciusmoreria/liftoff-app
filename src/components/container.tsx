import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

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
    <ScrollView className="flex-1 bg-dark px-8" style={styles(safeAreaTop).container}>
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1 bg-dark px-8" style={styles(safeAreaTop).container}>
      {children}
    </View>
  );
};

const styles = (safeAreaTop: number) =>
  StyleSheet.create({
    container: {
      paddingTop: safeAreaTop,
    },
  });
