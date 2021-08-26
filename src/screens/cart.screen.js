import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View, Alert } from "react-native";
import { Button } from "native-base";
import BLHeader from "../components/header/header.component";
import CartTable from "../components/cart/cart-table.component";
import styled from "styled-components";
import { CartTotals } from "../components/cart/cart-totals.component";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
import { useNavigation, useRoute } from "@react-navigation/core";
import { selectCurrentUser } from "../services/auth/auth.selectors";
import { useSelector } from "react-redux";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const CartScreen = ({ route }) => {
	const { previousScreen } = route?.params;
	const page = useRoute();
	const navigation = useNavigation();

	const currentUser = useSelector(selectCurrentUser);

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
				<View style={{ width: "100%" }}>
					<BLHeader title="Bayong" previousScreen={previousScreen} />
					<CartTable data={currentUser && currentUser?.cartItems} />
					<CartTotals data={{}} />
				</View>
				<View
					style={{
						width: "100%",
						padding: 10,
						backgroundColor: "white",
					}}
				>
					<Button
						block
						warning
						onPress={() => {
							console.log(currentUser);

							if (currentUser?.cartItems?.length <= 0) {
								Alert.alert(
									"Please add item to your bayong to proceed."
								);
								return;
							}

							navigation.navigate("Delivery", {
								previousScreen: page?.name,
							});
						}}
					>
						<ButtonTypes.PrimaryButtonText>
							Proceed to billing
						</ButtonTypes.PrimaryButtonText>
					</Button>
				</View>
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default CartScreen;
