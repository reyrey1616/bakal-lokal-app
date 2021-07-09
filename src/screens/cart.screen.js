import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View } from "react-native";
import { Button } from "native-base";
import BLHeader from "../components/header/header.component";
import CartTable from "../components/cart/cart-table.component";
import styled from "styled-components";
import { CartTotals } from "../components/cart/cart-totals.component";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const userData = {
	subTotal: 745,
	deliveryFee: 40,
	transactionFee: 15,
	discount: 0,
	grandTotal: 800,
	withCoupon: true,
};

const CartScreen = ({ route }) => {
	const { previousScreen } = route?.params;
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
					<CartTable />
					<CartTotals userData={userData} />
				</View>
				<View
					style={{
						width: "100%",
						padding: 10,
						backgroundColor: "white",
					}}
				>
					<Button block warning>
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
