import React, { useState, useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View } from "react-native";
import { Button } from "native-base";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { CartTotals } from "../components/cart/cart-totals.component";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
import { Form, Item, Picker, Icon, Label } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import CustomDatePicker from "../components/utils/date-picker.component";
import moment from "moment";
import DeliveryAddressForm from "../components/delivery-option/delivery-address.component";
import PickupLocation from "../components/delivery-option/pickup-location.component";
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
	withCoupon: false,
	barangay: "North Baluarte",
	fullAddress: "North Baluarte, Molo, Iloilo City, Iloilo",
	city: "Iloilo City",
	province: "Iloilo",
	postcode: "5000",
};
const DeliveryScreen = ({ route }) => {
	// const { previousScreen } = route?.params;

	const [form, setForm] = useState({
		deliveryOption: "Pick-up",
		// date: null,
		date: moment(new Date(Date.now())).format("YYYY-MM-DD"),
		time: moment(),
		fullAddress: "",
		barangay: "",
		city: "",
		province: "",
		postcode: "",
	});

	useEffect(() => {
		console.log(form);
	}, [form]);

	const onSetForm = (data) => {
		setForm(data);
	};

	const deliveryOptionOnChange = () => {};
	return (
		<SafeArea>
			<BLHeader
				title="Delivery summary"
				// previousScreen={previousScreen}
			/>
			<ScrollViewContainer
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor: colors.brand.dirtywhite,
				}}
			>
				<View style={{ width: "100%" }}>
					{/* FORM */}
					<Form
						style={{
							backgroundColor: "white",
							padding: 15,
							marginTop: 5,
						}}
					>
						<View>
							<Label
								style={{
									padding: 5,
									paddingBottom: 5,
								}}
							>
								Delivery method
							</Label>
							<Picker
								mode="dropdown"
								iosIcon={
									<AntDesign
										name="caretdown"
										size={12}
										color={colors.brand.orange}
									/>
								}
								placeholder="Select delivery option"
								placeholderStyle={{ color: "#bfc6ea" }}
								placeholderIconColor="#007aff"
								style={{
									width: "100%",
									borderBottomWidth: 1,
									borderBottomColor: colors.brand.dirtywhite,
								}}
								selectedValue={form?.deliveryOption}
								onValueChange={(value) => {
									setForm({
										...form,
										deliveryOption: value,
									});
								}}
							>
								<Picker.Item
									label="Delivery"
									value="Delivery"
								/>
								<Picker.Item label="Pick-up" value="Pick-up" />
							</Picker>
						</View>
						<View style={{ marginTop: 5 }}>
							<Label
								style={{
									padding: 5,
									paddingBottom: 5,
								}}
							>
								Delivery schedule
							</Label>
							<View
								style={{
									width: "100%",
									flexDirection: "row",
									justifyContent: "flex-start",
								}}
							>
								<View style={{ width: "50%" }}>
									<CustomDatePicker
										onSelectDate={(date) => {
											console.log(date);
											setForm({
												...form,
												date,
											});
											console.log(form);
										}}
										value={moment(form?.date).format(
											"YYYY-MM-DD"
										)}
										mode="date"
										title="Choose date"
										icon={
											<AntDesign
												name="calendar"
												color={colors.brand.orange}
												size={18}
											/>
										}
									/>
								</View>
								<View style={{ width: "50%" }}>
									<CustomDatePicker
										onSelectDate={(time) => {
											console.log(time);
											setForm({
												...form,
												time,
											});
										}}
										value={moment(form?.time).format(
											"h:mm:ss a"
										)}
										mode="time"
										icon={
											<AntDesign
												name="clockcircle"
												color={colors.brand.orange}
												size={18}
											/>
										}
										title="Choose time"
									/>
								</View>
							</View>
						</View>
					</Form>

					{/* END FORM */}

					{/* Delivery Address */}

					{form?.deliveryOption === "Delivery" ? (
						<DeliveryAddressForm
							form={form}
							setForm={(data) => {
								onSetForm(data);
							}}
						/>
					) : (
						<PickupLocation />
					)}
					<CartTotals userData={userData} />
				</View>
			</ScrollViewContainer>
			<View
				style={{
					width: "100%",
					padding: 10,
					backgroundColor: "white",
					position: "fixed",
					bottom: 0,
				}}
			>
				<Button block warning>
					<ButtonTypes.PrimaryButtonText>
						Proceed to billing
					</ButtonTypes.PrimaryButtonText>
				</Button>
			</View>
		</SafeArea>
	);
};

export default DeliveryScreen;
