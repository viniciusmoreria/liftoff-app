import React, { useEffect } from "react";
import { View } from "react-native";

import { StackActions, useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const { dispatch } = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      dispatch(StackActions.replace("bottomTabs"));
    }, 2500);
  }, [dispatch]);

  return <View style={{ flex: 1, backgroundColor: "#16171B" }}></View>;
};

export { SplashScreen };
