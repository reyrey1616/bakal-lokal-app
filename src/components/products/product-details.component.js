import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../../infra/theme";
import { Text } from "../typography/text.component";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import currencyFormat from "../../utils/currencyFormat";
import { Spacer } from "../spacer/spacer.component";
import Variations from "./product-variations.component";
const SectionView = styled(View)`
	margin-top: 5;
	padding-top: 10;
	padding-bottom: 12;
	padding-left: 20;
	padding-right: 12;
	background: white;
	width: 100%;
`;

const ProductTitleSection = styled(View)`
	margin-top: 5;
	padding-top: 20;
	padding-bottom: 20;
	padding-left: 20;
	padding-right: 20;
	background: white;
	width: 100%;
`;

const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;
export const ProductDetails = ({ product, navigation }) => {
	const onSelectVariation = (variant) => {
		console.log(variant);
	};
	return (
		<View style={{ flex: 1 }}>
			<ScrollViewContainer
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor: theme.colors.brand.dirtywhite,
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				{/* Name */}
				<ProductTitleSection>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text variant="title">{product?.name}</Text>
					</View>
					<Spacer position="bottom" size="medium" />

					<Text
						variant="body"
						style={{ color: theme.colors.brand.orange }}
					>
						{currencyFormat(product?.price)}
					</Text>
				</ProductTitleSection>

				{/* Variation */}
				<SectionView>
					<Spacer position="bottom" size="medium" />

					<Text
						variant="body"
						style={{
							color: theme.colors.brand.black,
							fontWeight: "bold",
						}}
					>
						Variable
					</Text>
					<Spacer position="bottom" size="medium" />
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text
							style={{
								fontSize: theme?.fontSizes.caption,
								color: theme.colors.brand.orange,
							}}
						>
							None
						</Text>
						{/* Variations */}
						<Variations onSelectVariation={onSelectVariation} />
					</View>
					<Spacer position="bottom" size="medium" />
				</SectionView>

				{/* Categories */}
				<SectionView>
					<Spacer position="bottom" size="medium" />

					<Text
						variant="body"
						style={{
							color: theme.colors.brand.black,
							fontWeight: "bold",
						}}
					>
						Categories
					</Text>
					<Spacer position="bottom" size="medium" />
					<View>
						{product &&
							product.categories.map((cat, index) => {
								return (
									<Text
										style={{
											fontSize: theme?.fontSizes.caption,
											color: theme.colors.brand.orange,
										}}
									>
										{cat}
										{index < product?.categories?.length - 1
											? ",\u00A0"
											: ""}
									</Text>
								);
							})}
					</View>
				</SectionView>

				{/* Description */}
				<SectionView>
					<Spacer position="bottom" size="medium" />

					<Text
						variant="body"
						style={{
							color: theme.colors.brand.black,
							fontWeight: "bold",
						}}
					>
						Product details
					</Text>
					<Spacer position="bottom" size="medium" />
					<Text variant="caption">{product?.description}</Text>
				</SectionView>
				{/* Merchant */}
				<SectionView>
					<Spacer position="bottom" size="medium" />

					<Text
						variant="body"
						style={{
							color: theme.colors.brand.black,
							fontWeight: "bold",
						}}
					>
						Merchant
					</Text>
					<Spacer position="bottom" size="medium" />
					<Text
						variant="body"
						style={{ color: theme.colors.brand.orange }}
					>
						{product?.merchant}
					</Text>
				</SectionView>

				{/* Name */}
				<ProductTitleSection>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text>
							<Text
								variant="title"
								style={{
									color: theme.colors.brand.orange,
								}}
							>
								From the
							</Text>
							<Text
								variant="title"
								style={{
									color: theme.colors.brand.black,
								}}
							>
								{" "}
								same shop
							</Text>
						</Text>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Shops", {
									merchant: product?.merchant,
								});
							}}
						>
							<Text
								variant="title"
								style={{
									color: theme.colors.brand.orange,
								}}
							>
								See all
							</Text>
						</TouchableOpacity>
					</View>
				</ProductTitleSection>
			</ScrollViewContainer>
		</View>
	);
};
