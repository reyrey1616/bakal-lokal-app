import React, { useState, useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View } from "react-native";
import { Button } from "native-base";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { CartTotals } from "../components/cart/cart-totals.component";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
import { Form, Picker, Label, Content, Spinner } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import CustomDatePicker from "../components/utils/date-picker.component";
import moment from "moment";
import DeliveryAddressForm from "../components/delivery-option/delivery-address.component";
import PickupLocation from "../components/delivery-option/pickup-location.component";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
	selectDeliveryDetails,
	selectAuthLoading,
	selectCurrentUser,
} from "../services/auth/auth.selectors";
import { useSelector, useDispatch } from "react-redux";
import { setDeliveryDetails } from "../services/auth/auth.actions";

const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const DeliveryScreen = ({ route }) => {
	const navigation = useNavigation();
	const page = useRoute();
	const dispatch = useDispatch();
	const form = useSelector(selectDeliveryDetails);
	const user = useSelector(selectCurrentUser);
	const loading = useSelector(selectAuthLoading);

	useEffect(() => {
		console.log(user);
		dispatch(
			setDeliveryDetails({
				...form,
				baranggay: user?.baranggay,
				fullAddress: user?.fullAddress,
				city: user?.city,
				baranggay: user?.baranggay,
				province: user?.province,
				postcode: user?.postcode,
			})
		);
	}, []);

	useEffect(() => {
		console.log(form);
	}, [form]);

	const onSetForm = (data) => {
		dispatch(setDeliveryDetails(data));
	};

	const deliveryOptionSubmit = () => {
		navigation.navigate("Checkout", {
			previousScreen: page?.name,
			orderInfo: form,
		});
	};
	return (
		<SafeArea>
			<BLHeader title="Delivery summary" previousScreen={"Cart"} />
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
									dispatch(
										setDeliveryDetails({
											...form,
											deliveryOption: value,
										})
									);
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
											dispatch(
												setDeliveryDetails({
													...form,
													date,
												})
											);
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
											dispatch(
												setDeliveryDetails({
													...form,
													time,
												})
											);
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
						loading ? (
							<Spinner color="orange" />
						) : (
							<DeliveryAddressForm
								form={form}
								setForm={(data) => {
									onSetForm(data);
								}}
							/>
						)
					) : (
						<PickupLocation />
					)}
					<CartTotals />
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
				<Button
					block
					warning
					onPress={() => {
						deliveryOptionSubmit();
					}}
				>
					<ButtonTypes.PrimaryButtonText>
						Proceed to billing
					</ButtonTypes.PrimaryButtonText>
				</Button>
			</View>
		</SafeArea>
	);
};

export default DeliveryScreen;
