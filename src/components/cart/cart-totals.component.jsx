import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../typography/text.component";
import currencyFormat from "../../utils/currencyFormat";
import styled from "styled-components";
import { colors } from "../../infra/theme/colors";
const Flex = styled(View)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 5px 15px;
`;

export const CartTotals = ({ userData }) => {
	return (
		<View
			style={{
				marginTop: 5,
				backgroundColor: "white",
				width: "100%",
				padding: 10,
			}}
		>
			<View
				style={{
					paddingTop: 15,
					paddingBottom: 15,
					borderBottomColor: colors.brand.dirtywhite,
					borderBottomWidth: 1,
				}}
			>
				<Flex>
					<Text variant="title">Subtotal</Text>
					<Text> {currencyFormat(userData?.subTotal)}</Text>
				</Flex>
				<Flex>
					<Text variant="body">Delivery Fee</Text>
					<Text> {currencyFormat(userData?.deliveryFee)}</Text>
				</Flex>
				<Flex>
					<Text variant="body">Order fee</Text>
					<Text> {currencyFormat(userData?.transactionFee)}</Text>
				</Flex>
				{userData.withCoupon ? (
					<Flex>
						<Text variant="body">Discount</Text>
						<Text> {currencyFormat(userData?.discount)}</Text>
					</Flex>
				) : (
					<Flex>
						<TouchableOpacity>
							<Text
								variant="body"
								style={{ color: colors.brand.orange }}
							>
								Apply Coupon
							</Text>
						</TouchableOpacity>

						<Text> {currencyFormat(userData?.discount)}</Text>
					</Flex>
				)}
			</View>

			<Flex style={{ paddingTop: 15, paddingBottom: 15 }}>
				<Text variant="title">Total</Text>
				<Text variant="title">
					{currencyFormat(userData?.grandTotal)}
				</Text>
			</Flex>
		</View>
	);
};
