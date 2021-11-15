import React, { useEffect, useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { Alert, ScrollView, View } from "react-native";
import { Spinner } from "native-base";
import BLHeader from "../components/header/header.component";
import CartTable from "../components/cart/cart-table.component";
import styled from "styled-components";
import { colors } from "../infra/theme/colors";
import { useNavigation, useRoute } from "@react-navigation/core";
import { selectCurrentUser } from "../services/auth/auth.selectors";
import { useSelector } from "react-redux";
import { Text } from "../components/typography/text.component";
import { fontSizes } from "../infra/theme/fonts";
import { AntDesign } from "@expo/vector-icons";
import { OrderCartTotals } from "../components/cart/order-cart-totals.component";
import axios from "axios";
import moment from "moment";

const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const OrderDetailsScreen = ({ route }) => {
	const { previousScreen, orderId } = route?.params;

	const [orderDetails, setOrderDetails] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!orderId) return;

		async function getOrderDetails() {
			try {
				const orderReq = await axios.get(`/orders/${orderId}`);
				const orderRes = await orderReq?.data?.data;

				const status = orderReq?.data?.success;

				if (status) {
					setLoading(false);
					console.log(orderRes);
					setOrderDetails(orderRes);
				} else {
					Alert.alert("Bakal Lokal", "Order seems not exist!");
					throw Error;
				}
			} catch (error) {
				setLoading(false);

				if (error.response && error.response.data.error) {
					const errorResponse = error.response.data.error;
					Alert.alert("Bakal Lokal", errorResponse);
				} else {
					Alert.alert("Bakal Lokal", "Error loading the order.");
				}
			}
		}

		getOrderDetails();
	}, [orderId]);

	return (
		<SafeArea>
			<BLHeader title="Order details" previousScreen={previousScreen} />
			<View style={{ flex: 1, paddingBottom: 10 }}>
				{!loading ? (
					<ScrollViewContainer
						contentContainerStyle={{
							flexGrow: 1,
							backgroundColor: colors.brand.dirtywhite,
							flexDirection: "column",
							padding: 10,
						}}
					>
						<View
							style={{
								width: "100%",
								backgroundColor: "white",
								marginBottom: 5,
								padding: 15,
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								Status
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
									color: colors.brand.green,
								}}
							>
								{orderDetails?.orderStatus}
							</Text>
						</View>

						<View
							style={{
								width: "100%",
								backgroundColor: "white",
								marginBottom: 5,
								padding: 15,
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								Payment method
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								{orderDetails?.paymentMethod}
							</Text>
						</View>

						<View
							style={{
								width: "100%",
								backgroundColor: "white",
								marginBottom: 5,
								padding: 15,
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.body,
								}}
							>
								Date
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.body,
								}}
							>
								<AntDesign
									name="calendar"
									color={colors.brand.orange}
									size={18}
								/>{" "}
								{moment(orderDetails?.orderDate).format(
									"YYYY-MM-DD"
								)}
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.body,
								}}
							>
								Time
							</Text>

							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.body,
								}}
							>
								<AntDesign
									name="clockcircle"
									color={colors.brand.orange}
									size={18}
									style={{
										marginRight: 10,
									}}
								/>{" "}
								{moment(orderDetails?.orderDate).format(
									"YYYY-MM-DD"
								)}
							</Text>
						</View>

						<View
							style={{
								width: "100%",
								backgroundColor: "white",
								marginBottom: 5,
								padding: 15,
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
							}}
						>
							<Text
								variant="title"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h5,
								}}
							>
								Order
							</Text>
							<Text
								variant="title"
								style={{
									color: colors.brand.orange,
									fontSize: fontSizes.h5,
								}}
							>
								{" "}
								details
							</Text>
						</View>
						{/* Orders Table */}

						<View
							style={{
								width: "100%",
								backgroundColor: "white",
								marginBottom: 5,
							}}
						>
							<CartTable
								data={orderDetails?.cartItems}
								readOnly={true}
							/>
						</View>
						{/* Delivery Address */}
						<View
							style={{
								width: "100%",
								backgroundColor: "white",
								marginBottom: 5,
								padding: 15,
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
							}}
						>
							<Text
								variant="title"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h5,
								}}
							>
								Delivery
							</Text>
							<Text
								variant="title"
								style={{
									color: colors.brand.orange,
									fontSize: fontSizes.h5,
								}}
							>
								{" "}
								address
							</Text>
						</View>
						<View
							style={{
								width: "100%",
								backgroundColor: "white",
								marginBottom: 5,
								padding: 15,
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-start",
							}}
						>
							<Text
								style={{
									color: colors.brand.orange,
									fontSize: fontSizes.h6,
								}}
							>
								Home
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								{orderDetails?.customer?.fname +
									" " +
									orderDetails?.customer?.lname}
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								{orderDetails?.billing_baranggay}
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								{orderDetails?.billing_city}
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								{orderDetails?.billing_province}
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								{orderDetails?.billing_postcode}
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.h6,
								}}
							>
								{orderDetails?.customer?.contactNumber}
							</Text>
							<Text
								variant="label"
								style={{
									color: colors.brand.black,
									fontSize: fontSizes.body,
								}}
							>
								{orderDetails?.customer?.email}
							</Text>
						</View>

						<OrderCartTotals order={orderDetails && orderDetails} />
					</ScrollViewContainer>
				) : (
					<Spinner color="orange" />
				)}
			</View>
		</SafeArea>
	);
};

export default OrderDetailsScreen;
