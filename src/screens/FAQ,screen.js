import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View } from "react-native";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { colors } from "../infra/theme/colors";
import FAQs from "../components/FAQs/FAQs.component";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const FAQScreen = () => {
	return (
		<SafeArea>
			<BLHeader title="FAQ's" previousScreen={"Home"} />

			<View style={{ flex: 1, backgroundColor: "white" }}>
				<ScrollViewContainer
					contentContainerStyle={{
						flexGrow: 1,
						backgroundColor: colors.brand.dirtywhite,
						flexDirection: "column",
						padding: 10,
					}}
				>
					<FAQs />
				</ScrollViewContainer>
			</View>
		</SafeArea>
	);
};

export default FAQScreen;
