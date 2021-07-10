import React, { useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View } from "react-native";
import { Button } from "native-base";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { CartTotals } from "../components/cart/cart-totals.component";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
import { useNavigation, useRoute } from "@react-navigation/core";
import PaymentMethodItem from "../components/checkout/payment-methods.component";
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
	barangay: "North Baluarte",
	fullAddress: "North Baluarte, Molo, Iloilo City, Iloilo",
	city: "Iloilo City",
	province: "Iloilo",
	postcode: "5000",
};

const paymentMethods = [
	{ id: 1, name: "Gcash", content: "Lorem ipsum dolor sit amet" },
	{ id: 2, name: "Bank transfer", content: "Lorem ipsum dolor sit amet" },
];

const CheckoutScreen = ({ route }) => {
	// const { previousScreen } = route?.params;
	const page = useRoute();
	const navigation = useNavigation();

	const [paymentMethod, setPaymentMethod] = useState("Gcash");

	const onSelect = (val) => {
		setPaymentMethod(val);
	};
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
					<BLHeader
						title="Payment summary"
						previousScreen={"Delivery"}
					/>
					{paymentMethods?.map((data) => {
						return (
							<PaymentMethodItem
								key={data?.id}
								selected={
									paymentMethod === data?.name ? true : false
								}
								name={data?.name}
								content={data?.content}
								onSelect={onSelect}
							/>
						);
					})}
					<CartTotals userData={userData} />
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
							navigation.navigate("Delivery", {
								previousScreen: page?.name,
							});
						}}
					>
						<ButtonTypes.PrimaryButtonText>
							Proceed to checkout
						</ButtonTypes.PrimaryButtonText>
					</Button>
				</View>
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default CheckoutScreen;
