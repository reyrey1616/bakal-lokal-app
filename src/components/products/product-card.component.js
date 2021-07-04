import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Card, CardItem } from "native-base";
import styled from "styled-components/native";
import { theme } from "../../infra/theme";
import { Spacer } from "../spacer/spacer.component";
import currencyFormat from "../../utils/currencyFormat";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CardContainer = styled(Card)`
	border-radius: 12;
	overflow: hidden;
	width: 100%;
	height: 300;
	margin: 0;
`;

const ProductContentContainer = styled(View)`
	flex-direction: column;
	height: 45%;
	position: relative;
`;

export const ProductCard = ({ product }) => {
	const navigation = useNavigation();
	const route = useRoute();

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("ProductDetails", {
					product,
					previousScreen: route?.name,
				});
			}}
			style={{
				padding: 5,
				backgroundColor: "transparent",
				width: "50%",
				margin: 0,
			}}
		>
			<CardContainer>
				<CardItem cardBody style={{ height: "55%" }}>
					<Image
						source={product?.image}
						style={{
							height: "100%",
							width: null,
							flex: 1,
							borderTopLeftRadius: 12,
							borderTopRightRadius: 12,
						}}
					/>
				</CardItem>
				<ProductContentContainer>
					<CardItem>
						<Spacer position="bottom" size="large" />
						<View>
							<Text
								style={{
									fontSize: theme?.fontSizes.body,
									fontWeight: "bold",
									color: "#555",
								}}
							>
								{product?.name}
							</Text>
						</View>
					</CardItem>
					<CardItem>
						<Spacer position="bottom" size="large" />

						<Text
							style={{
								fontSize: theme?.fontSizes.body,
								color: theme.colors.brand.orange,
							}}
						>
							{currencyFormat(product?.price)}
						</Text>
					</CardItem>
					<View style={{ paddingLeft: 15 }}>
						<View>
							<Text
								style={{
									fontSize: theme?.fontSizes.caption,
									color: theme.colors.brand.grey,
								}}
							>
								{product?.merchant}
							</Text>
						</View>
					</View>

					<TouchableOpacity
						style={{ position: "absolute", right: 10, bottom: 10 }}
					>
						<FontAwesome
							name="plus"
							size={24}
							color={theme.colors.brand.orange}
						/>
					</TouchableOpacity>
				</ProductContentContainer>
			</CardContainer>
		</TouchableOpacity>
	);
};
