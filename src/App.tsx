import React from "react";

import { Sentry } from "@libs/sentry";
import { RootStackNavigator } from "@navigation/root-stack-navigator";
import { AppProviders } from "@providers/app-providers";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";

enableScreens(true);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.STAGE,
});

export default function App() {
  return (
    <AppProviders>
      <StatusBar style="auto" />
      <RootStackNavigator />
    </AppProviders>
  );
}
