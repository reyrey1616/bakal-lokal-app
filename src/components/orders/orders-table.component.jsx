import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { colors } from "../../infra/theme/colors";
import currencyFormat from "../../utils/currencyFormat";
import moment from "moment";
import styled from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;
const OrdersTable = ({ data }) => {
	const navigation = useNavigation();
	const route = useRoute();
	return (
		<View style={styles.container}>
			<View style={styles.table}>
				{/* <ScrollViewContainer
					contentContainerStyle={{
						flex: 1,
						backgroundColor: colors.brand.dirtywhite,
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				> */}
				<View style={styles.header}>
					<View
						style={{
							...styles.cell,
							width: "20%",
						}}
					>
						<Text style={{ color: colors.brand.grey }}>
							{" "}
							Order ID{" "}
						</Text>
					</View>
					<View
						style={{
							...styles.cell,
							width: "30%",
						}}
					>
						<Text style={{ color: colors.brand.grey }}>
							{" "}
							Status{" "}
						</Text>
					</View>
					<View
						style={{
							...styles.cell,
							width: "30%",
						}}
					>
						<Text style={{ color: colors.brand.grey }}>
							{" "}
							Order date
						</Text>
					</View>
					<View
						style={{
							...styles.cell,
							width: "20%",
						}}
					>
						<Text style={{ color: colors.brand.grey }}>Total</Text>
					</View>
				</View>

				{data?.map((d) => {
					return (
						<TouchableOpacity
							key={d?._id}
							style={styles.row}
							onPress={() => {
								navigation.navigate("OrderDetails", {
									orderId: d?._id,
									previousScreen: route?.name,
								});
							}}
						>
							<View
								style={{
									...styles.cell,
									width: "20%",
								}}
							>
								<Text style={{ color: colors.brand.orange }}>
									{d?.orderNumber}
								</Text>
							</View>
							<View
								style={{
									...styles.cell,
									width: "30%",
								}}
							>
								<Text>{d?.orderStatus}</Text>
							</View>
							<View
								style={{
									...styles.cell,
									width: "30%",
								}}
							>
								<Text>
									{moment(d?.orderDate).format(
										"MMM DD, YYYY"
									)}
								</Text>
							</View>
							<View
								style={{
									...styles.cell,
									width: "20%",

									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<Text
									style={{
										color: colors.brand.black,
										fontWeight: "bold",
									}}
								>
									{currencyFormat(d?.grandTotal)}
								</Text>
							</View>
						</TouchableOpacity>
					);
				})}
				{/* </ScrollViewContainer> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "white",
		marginTop: 5,
		flex: 1,
	},
	table: {
		width: "100%",
		padding: 10,
	},
	header: {
		borderColor: colors.brand.dirtywhite,
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	cell: {
		padding: 10,
		width: "auto",
		justifyContent: "flex-start",
	},
	row: {
		borderTopWidth: 1,
		borderColor: colors.brand.dirtywhite,
		width: "100%",
		flexDirection: "row",
		width: "100%",
		paddingTop: 7,
		paddingBottom: 7,
		justifyContent: "space-between",
	},
});

export default OrdersTable;
