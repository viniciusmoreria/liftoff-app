import React from "react";
import { useWindowDimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { HomeNavigator } from "@pages/home";
import { ProfileNavigator } from "@pages/profile";
import {
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomTab = createMaterialTopTabNavigator();

export function BottomTabNavigator() {
  const { width } = useWindowDimensions();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      showPageIndicator={false}
      keyboardDismissMode="on-drag"
      initialLayout={{ width }}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#d83545",
        tabBarInactiveTintColor: "#c0c0c0",
        tabBarIndicator: () => null,
        tabBarStyle: {
          height: safeAreaBottom + 44,
          backgroundColor: "#05050b8d",
        },
      }}
      tabBar={(props) => (
        <BlurView
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
          tint="dark"
          intensity={100}
        >
          <MaterialTopTabBar {...props} />
        </BlurView>
      )}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="home" color={color} size={20} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="person" color={color} size={20} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
