import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import {
	useFonts as useCabin,
	Cabin_400Regular,
} from "@expo-google-fonts/cabin";
import {
	useFonts as useMontserrat,
	Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import { theme } from "./src/infrastracture/theme";

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
		<>
			<ThemeProvider theme={theme}>
				<View>
					{" "}
					<Text> Bakal Lokal </Text>{" "}
				</View>
			</ThemeProvider>
			<ExpoStatusBar style="auto" />
		</>
	);
}
