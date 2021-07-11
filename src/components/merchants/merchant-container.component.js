import React from "react";
import { View, ScrollView, Text } from "react-native";
import { theme } from "../../infra/theme";
import styled from "styled-components/native";
import { MerchantCard } from "./merchant-card.component";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

export const MerchantsContainer = ({ navigation, merchants }) => {
	return (
		<View style={{ flex: 1 }}>
			<ScrollViewContainer
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor: theme.colors.brand.dirtywhite,
					flexDirection: "column",
					padding: 10,
				}}
			>
				{merchants?.map((merchant) => (
					<MerchantCard
						key={merchant?.id}
						merchant={merchant}
						navigation={navigation}
					/>
				))}
			</ScrollViewContainer>
		</View>
	);
};
