import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
// import { StyleProvider } from "native-base";
// import getTheme from "./native-base-theme/components";
// import material from "./native-base-theme/variables/material";

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

export default function App() {
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
			<ThemeProvider theme={theme}>
				<MainNavigator />
			</ThemeProvider>
			<ExpoStatusBar style="auto" />
		</SafeArea>
	);
}
