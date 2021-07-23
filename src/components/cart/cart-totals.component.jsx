import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "../typography/text.component";
import currencyFormat from "../../utils/currencyFormat";
import styled from "styled-components";
import { colors } from "../../infra/theme/colors";
import { useSelector } from "react-redux";
import {
	selectCurrentUser,
	selectDeliveryFee,
	selectDiscount,
	selectVoucher,
	selectTransactionFee,
} from "../../services/auth/auth.selectors";
import VoucherModal from "../vouchers/voucher-modal.component";

const Flex = styled(View)`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 5px 15px;
`;

export const CartTotals = () => {
	const currentUser = useSelector(selectCurrentUser);

	const _deliveryFee = useSelector(selectDeliveryFee);
	const _discount = useSelector(selectDiscount);
	const _transactionFee = useSelector(selectTransactionFee);
	const _voucher = useSelector(selectVoucher);

	const [data, setData] = useState({
		subTotal: 0,
		deliveryFee: 0,
		transactionFee: 15,
		grandTotal: 0,
		discount: 0,
		voucher: null,
	});

	useEffect(() => {
		const subTotal = currentUser?.cartItems?.reduce((acc, item) => {
			return acc + item?.subTotal;
		}, 0);

		const grandTotal =
			subTotal + _transactionFee + _deliveryFee - _discount;

		setData({
			...data,
			subTotal,
			grandTotal,
		});
	}, [currentUser, _voucher]);
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
					<Text> {currencyFormat(_deliveryFee)}</Text>
				</Flex>
				<Flex>
					<Text variant="body">Order fee</Text>
					<Text> {currencyFormat(_transactionFee)}</Text>
				</Flex>
				{_voucher ? (
					<Flex>
						<Text variant="body">Discount</Text>
						<Text> {currencyFormat(_discount)}</Text>
					</Flex>
				) : (
					<Flex>
						<VoucherModal />

						<Text> {currencyFormat(_discount)}</Text>
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
