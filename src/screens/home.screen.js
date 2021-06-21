import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { Text } from "react-native";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
const HomeScreen = ({ navigation }) => {
	return (
		<SafeArea>
			<HeaderWithSearch navigation={navigation} />
			<Text> Home Screen </Text>
		</SafeArea>
	);
};

export default HomeScreen;
