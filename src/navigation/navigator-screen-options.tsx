import { Platform } from "react-native";

export const screenOptions = ({
  safeAreaTop,
  headerLeft = null,
  headerRight = null,
}: {
  safeAreaTop: number;
  headerLeft?: any;
  headerRight?: any;
}) => ({
  animationEnabled: true,
  headerShown: false,
  headerLeft: headerLeft,
  headerTitleAlign: "center" as "center",
  headerRight: headerRight ?? null,
  headerTintColor: "#000",
  headerTransparent: Platform.OS === "android" ? false : true,
  headerBlurEffect: "dark",
  headerBackVisible: false,
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerStyle: {
    height: 64 + safeAreaTop,
    borderBottomWidth: 0,
  },
  cardStyle: { flex: 1, backgroundColor: "transparent" },
  cardOverlayEnabled: false,
});
