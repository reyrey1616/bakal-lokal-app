import React from "react";
import { View, ScrollView, Text } from "react-native";
import { theme } from "../../infra/theme";
import styled from "styled-components/native";
import { MerchantCard } from "./merchant-card.component";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

export const merchants = [
	{
		id: 1,
		name: "Rivory Frozen Goods",
		image: require("../../assets/design/background.png"),
		categories: ["Food and Beverage", "Local"],
		numberOfProducts: 24,
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, odio facilis minima facere assumenda explicabo veritatis reiciendis cumque quidem nostrum maiores fuga distinctio alias, quas quasi fugiat modi maxime dicta.",
	},
	{
		id: 2,
		name: "Dela Yna",
		image: require("../../assets/design/background.png"),
		categories: ["Food and Beverage", "Local"],
		numberOfProducts: 24,
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, odio facilis minima facere assumenda explicabo veritatis reiciendis cumque quidem nostrum maiores fuga distinctio alias, quas quasi fugiat modi maxime dicta.",
	},
	{
		id: 3,
		name: "Braskape",
		image: require("../../assets/design/background.png"),
		categories: ["Food and Beverage", "Local"],
		numberOfProducts: 24,
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, odio facilis minima facere assumenda explicabo veritatis reiciendis cumque quidem nostrum maiores fuga distinctio alias, quas quasi fugiat modi maxime dicta.",
	},
];

export const MerchantsContainer = ({ navigation }) => {
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
