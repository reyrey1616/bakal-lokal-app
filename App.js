import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
// import { StyleProvider } from "native-base";
// import getTheme from "./native-base-theme/components";
// import material from "./native-base-theme/variables/material";
// import { StatusBar } from "react-native";
import {
  useFonts as useCabin,
  Cabin_400Regular,
} from "@expo-google-fonts/cabin";
import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

import { theme } from "./src/infra/theme/";
import { SafeArea } from "./src/components/utils/safe-area.component";
// import MenuNavigator from "./src/infra/navigation/menu.navigator";
import MainNavigator from "./src/infra/navigation/main.navigation";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./src/services/store";
import { init } from "emailjs-com";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { AppRegistry } from "react-native";

// axios.defaults.baseURL = "http://localhost:5000/api/v1/";
axios.defaults.baseURL = "https://bakal-lokal.xyz/api/v1/";
init("user_BgbYodHJVW1sBGMlZrluD");

function App() {
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
    };

    loadFont();
  }, []);

  const [cabinLoaded] = useCabin({
    Cabin_400Regular,
  });
  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
  });

  if (!cabinLoaded || !montserratLoaded) {
    return null;
  }

  return (
    <SafeArea>
      <ExpoStatusBar style="auto" animated={true} backgroundColor="white" />

      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainNavigator />
        </ThemeProvider>
      </Provider>
    </SafeArea>
  );
}

export default App;
