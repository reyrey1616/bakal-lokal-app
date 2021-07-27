import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { Form, Item, Input, Button, Label } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../infra/theme/colors";
import ButtonTypes from "../utils/buttons.component";
import SectionTitle from "../utils/title.component";
import { Text } from "../typography/text.component";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStoreVoucher } from "../../services/auth/auth.actions";
const VoucherModal = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [voucher, setVoucher] = useState(null);
	const [isExisting, setIsExisting] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const onFindVoucher = async (coupon) => {
		if (!coupon) return;
		try {
			setLoading(true);
			setSearchString(coupon);
			const request = await axios.get(`/coupons/public/${coupon}`);

			const response = await request.data;

			if (response?.success === true) {
				setLoading(false);

				if (response?.data.length > 0) {
					setIsExisting(true);
					const coupon = response?.data[0];
					return coupon;
				} else {
					setIsExisting(false);
					return null;
				}
			} else {
				throw Error;
			}
		} catch (error) {
			console.log(error);
			Alert.alert(
				"Bakal Lokal",
				"Error loading vouchers, Please refresh the page!"
			);
			setLoading(false);
			setIsExisting(false);
			return null;
		}
	};
	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				style={{
					backgroundColor: "rgba(0,0,0,0.1)",
				}}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View>
					<View style={styles.modalView}>
						<SectionTitle text1="Apply" text2="Coupon" />

						<Form style={{ width: "80%" }}>
							<Item fixedLabel>
								<Input
									value={searchString}
									onChangeText={async (val) => {
										const voucher = await onFindVoucher(
											val
										);

										if (voucher) {
											console.log(voucher);
											setVoucher(voucher);
										}
									}}
								/>
							</Item>
							{searchString && loading === false && isExisting && (
								<Label
									style={{
										textAlign: "center",
										marginTop: 10,
										color: colors.brand.green,
									}}
								>
									Coupon available!
								</Label>
							)}

							{searchString && loading === false && !isExisting && (
								<Label
									style={{
										textAlign: "center",
										marginTop: 10,
										color: colors.brand.red,
									}}
								>
									Coupon not exist!
								</Label>
							)}

							{searchString && loading === true && (
								<Label
									style={{
										textAlign: "center",
										marginTop: 10,
										color: colors.brand.grey,
									}}
								>
									Searching...
								</Label>
							)}
						</Form>
						<View style={styles.optionContainer}>
							<Button
								bordered
								warning
								style={styles.optionButton}
								onPress={() => {
									setModalVisible(false);
								}}
							>
								<ButtonTypes.SecondaryButtonText>
									Cancel
								</ButtonTypes.SecondaryButtonText>
							</Button>
							<ButtonTypes.PrimaryButton
								bordered
								warning
								style={styles.optionButton}
								onPress={() => {
									if (voucher && isExisting) {
										setModalVisible(false);
										dispatch(setStoreVoucher(voucher));
									} else {
										Alert.alert(
											"Please add a valid voucher"
										);
									}
								}}
							>
								<ButtonTypes.PrimaryButtonText>
									Apply
								</ButtonTypes.PrimaryButtonText>
							</ButtonTypes.PrimaryButton>
						</View>
					</View>
				</View>
			</Modal>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-around",
				}}
			>
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<Text
						variant="body"
						style={{ color: colors?.brand.orange }}
					>
						Apply Coupon
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		margin: 20,
		marginTop: "30%",
		width: "90%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	optionContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		flexWrap: "wrap",
		marginTop: 15,
	},
	optionButton: {
		width: "47%",
		alignItems: "center",
		justifyContent: "center",
		margin: "1%",
		marginBottom: 15,
	},
	variationsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
		marginTop: 15,
	},
	variationView: {
		width: "30%",
		marginRight: 5,
	},
	variation: {
		width: "100%",
		padding: 5,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 5,
		borderColor: colors.brand.orange,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 15,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default VoucherModal;
