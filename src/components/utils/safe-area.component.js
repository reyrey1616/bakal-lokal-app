import { StatusBar, SafeAreaView, Platform } from "react-native";
import styled from "styled-components/native";
export const SafeArea = styled(SafeAreaView)`
	flex: 1;
	background-color: white;
	${StatusBar.currentHeight &&
	`margin-top: ${
		Platform.OS === "ios"
			? `${StatusBar.currentHeight}px`
			: `${StatusBar.currentHeight / 2}px`
	}`}
`;

console.log(StatusBar.currentHeight);
