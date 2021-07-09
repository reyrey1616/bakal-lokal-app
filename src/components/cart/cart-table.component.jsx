import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../infra/theme/colors";
import { AntDesign } from "@expo/vector-icons";
import currencyFormat from "../../utils/currencyFormat";
const cartData = [
	{
		id: 1,
		item: "Rivory - Embutido",
		quantity: 1,
		price: 125,
	},
	{
		id: 2,
		item: "Rivory - Chorizo",
		quantity: 2,
		price: 160,
	},
];

const CartTable = () => (
	<View style={styles.container}>
		<View style={styles.table}>
			<View style={styles.header}>
				<View
					style={{
						...styles.cell,
						width: "45%",
					}}
				>
					<Text style={{ color: colors.brand.grey }}> Item </Text>
				</View>
				<View
					style={{
						...styles.cell,
						width: "15%",
					}}
				>
					<Text style={{ color: colors.brand.grey }}> Qty </Text>
				</View>
				<View
					style={{
						...styles.cell,
						width: "25%",
					}}
				>
					<Text style={{ color: colors.brand.grey }}> Price </Text>
				</View>
			</View>

			{cartData?.map((d) => {
				return (
					<View style={styles.row}>
						<View
							style={{
								...styles.cell,
								width: "55%",
							}}
						>
							<Text style={{ color: colors.brand.orange }}>
								{d?.item}
							</Text>
						</View>
						<View
							style={{
								...styles.cell,
								width: "15%",
							}}
						>
							<Text>{d?.quantity}</Text>
						</View>
						<View
							style={{
								...styles.cell,
								width: "30%",

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
								{currencyFormat(d?.price * d?.quantity)}
							</Text>
							<TouchableOpacity>
								<AntDesign
									name="closecircle"
									size={18}
									style={{ paddingLeft: 5 }}
									color={colors.brand.orange}
								/>
							</TouchableOpacity>
						</View>
					</View>
				);
			})}
		</View>
	</View>
);

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "white",
		marginTop: 5,
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
		justifyContent: "space-between",
	},
});

export default CartTable;
