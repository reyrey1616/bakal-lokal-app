import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View } from "react-native";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { colors } from "../infra/theme/colors";

import { WebView } from "react-native-webview";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const AboutScreen = () => {
	return (
		<SafeArea>
			<ScrollViewContainer
				contentContainerStyle={{
					flex: 1,
					backgroundColor: colors.brand.dirtywhite,
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<View style={{ width: "100%", flex: 1 }}>
					<BLHeader
						title="About Bakal Lokal"
						previousScreen={"Home"}
					/>
					<WebView
						source={{ uri: "https://bakal-lokal.com/about" }}
						style={{ flex: 1, width: "100%" }}
					/>
				</View>
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default AboutScreen;
