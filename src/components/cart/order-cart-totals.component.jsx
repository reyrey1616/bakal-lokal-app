import React, { useEffect, useState } from "react";
import { View } from "react-native";
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

export const OrderCartTotals = ({ order }) => {
	const [data, setData] = useState({
		subTotal: 0,
		deliveryFee: 0,
		transactionFee: 15,
		grandTotal: 0,
		discount: 0,
		voucher: null,
	});

	useEffect(() => {
		if (!order) return;
		setData({
			subTotal: order?.subTotal,
			deliveryFee: order?.deliveryFee,
			transactionFee: order?.transactionFee,
			grandTotal: order?.grandTotal,
			discount: order?.discount,
			voucher: order?.voucher,
		});
	}, [order]);

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
					<Text> {currencyFormat(data && data?.subTotal)}</Text>
				</Flex>
				<Flex>
					<Text variant="body">Delivery Fee</Text>
					<Text> {currencyFormat(data && data?.deliveryFee)}</Text>
				</Flex>
				<Flex>
					<Text variant="body">Order fee</Text>
					<Text> {currencyFormat(data && data?.transactionFee)}</Text>
				</Flex>
				{data?.voucher ? (
					<Flex>
						<Text variant="body">Discount</Text>
						<Text> {currencyFormat(data && data?.discount)}</Text>
					</Flex>
				) : (
					<Flex>
						<Text variant="body">Discount</Text>
						<Text> {currencyFormat(data && data?.discount)}</Text>
					</Flex>
				)}
			</View>

			<Flex style={{ paddingTop: 15, paddingBottom: 15 }}>
				<Text variant="title">Total</Text>
				<Text variant="title">
					{currencyFormat(data && data?.grandTotal)}
				</Text>
			</Flex>
		</View>
	);
};
