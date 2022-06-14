import React from "react";

import { SafeAreaProvider } from "@libs/safe-area";
import { NavigationProvider } from "@navigation/navigation-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationProvider>{children}</NavigationProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
