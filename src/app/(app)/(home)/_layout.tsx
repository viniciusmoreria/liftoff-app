import { Text } from '@modules/components';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import * as Application from 'expo-application';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Profile from '../profile';

export default function DrawerLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Drawer
      drawerContent={(props) => (
        <View
          style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom + spacing.sm }}>
          <DrawerContentScrollView {...props} contentContainerStyle={styles.contentContainerStyle}>
            <Profile />
          </DrawerContentScrollView>

          <Text
            text={`Version ${Application.nativeApplicationVersion}`}
            size="xxs"
            textAlign="center"
            color={colors.text}
            weight="semiBold"
          />
        </View>
      )}
      screenOptions={{
        drawerPosition: 'right',
        drawerActiveTintColor: colors.text,
        drawerInactiveTintColor: colors.text,
        drawerStyle: {
          backgroundColor: colors.background,
        },
        headerShown: false,
      }}>
      <Drawer.Screen name="index" />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: spacing.xl,
    rowGap: spacing.sm,
  },
});
