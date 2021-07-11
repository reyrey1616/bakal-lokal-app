import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { theme } from "../../infra/theme";
import { Text } from "../typography/text.component";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Spacer } from "../spacer/spacer.component";
const SectionView = styled(View)`
	margin-top: 5;
	padding-top: 10;
	padding-bottom: 12;
	padding-left: 20;
	padding-right: 12;
	background: white;
	width: 100%;
`;

const MerchantTitleSection = styled(View)`
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
export const MerchantDetails = ({ merchant, navigation }) => {
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
				<MerchantTitleSection>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text variant="title">{merchant?.name}</Text>
						<AntDesign
							name="hearto"
							size={24}
							color={theme.colors.brand.orange}
						/>
					</View>
				</MerchantTitleSection>

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
						Shop categories
					</Text>
					<Spacer position="bottom" size="medium" />
					<View>
						{merchant &&
							merchant?.categories.map((cat, index) => {
								return (
									<Text
										style={{
											fontSize: theme?.fontSizes.caption,
											color: theme.colors.brand.orange,
										}}
									>
										{cat?.name}
										{index <
										merchant?.categories?.length - 1
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
						Shop details
					</Text>
					<Spacer position="bottom" size="medium" />
					<Text variant="caption">{merchant?.about}</Text>
				</SectionView>
				{/* Name */}
				<MerchantTitleSection>
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
								Shop
							</Text>
							<Text
								variant="title"
								style={{
									color: theme.colors.brand.black,
								}}
							>
								{" "}
								products
							</Text>
						</Text>
						<TouchableOpacity
						// onPress={() => {
						// 	navigation.navigate("Shops", {
						// 		merchant: product?.merchant,
						// 	});
						// }}
						>
							<Text
								style={{
									color: theme.colors.brand.grey,
									fontSize: theme.fontSizes.caption,
								}}
							>
								{merchant?.numberOfProducts} products
							</Text>
						</TouchableOpacity>
					</View>
				</MerchantTitleSection>
			</ScrollViewContainer>
		</View>
	);
};
