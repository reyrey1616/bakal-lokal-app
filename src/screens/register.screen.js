import React, { useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import {
	Button,
	Input,
	Item,
	Header,
	Left,
	Right,
	Title,
	Body,
	Icon,
	Label,
	Picker,
} from "native-base";
import { View, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import ButtonTypes from "../components/utils/buttons.component";
import { Spacer } from "../components/spacer/spacer.component";
import { Text } from "../components/typography/text.component";
import { colors } from "../infra/theme/colors";
import CustomDatePicker from "../components/utils/date-picker.component";
import { useDispatch, connect } from "react-redux";
import { registerStart } from "../services/auth/auth.actions";

const RegistrationScreen = ({ navigation, register }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		fname: "Rey",
		lname: "Guidoriagao",
		contactNumber: "09182254329",
		email: "dabboyrey@gmail.com",
		password: "1111111111",
		bdate: "",
		gender: "Male",
	});

	const onSubmit = (data) => {
		console.log(data);
		if (data?.fname === "") {
			Alert.alert("Bakal Lokal", "Please input first name!");
		} else if (data?.lname === "") {
			Alert.alert("Bakal Lokal", "Please input last name!");
		} else if (data?.contactNumber === "") {
			Alert.alert("Bakal Lokal", "Please input contact number!");
		} else if (data?.email === "") {
			Alert.alert("Bakal Lokal", "Please input email!");
		} else if (data?.bdate === "") {
			Alert.alert("Bakal Lokal", "Please select birthday!");
		} else if (data?.gender === "") {
			Alert.alert("Bakal Lokal", "Please select gender!");
		} else if (data?.password === "") {
			Alert.alert("Bakal Lokal", "Please input password!");
		} else {
			Alert.alert("Submitting");
			dispatch(
				register(data, () => {
					Alert.alert(
						"Bakal Lokal",
						"Registration successfull, We've sent you a mail to verify your account."
					);
					navigation.navigate("Login");
				})
			);
		}
	};
	return (
		<SafeArea>
			<ScrollView style={{ flex: 1 }}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					style={{
						width: "100%",
						flex: 1,
						flexDirection: "column",
						justifyContent: "space-between",
						backgroundColor: colors.brand.dirtywhite,
					}}
				>
					<View>
						<View>
							<Header>
								<Left>
									<Button transparent>
										<Icon
											onPress={() => {
												navigation.navigate("Login");
											}}
											name="arrow-back"
											style={{
												color: colors.brand.orange,
											}}
										/>
									</Button>
								</Left>
								<Body>
									<Title
										style={{
											color: colors.brand.orange,
										}}
									>
										Register
									</Title>
								</Body>

								<Right />
							</Header>
						</View>
						<Spacer position="bottom" size="small" />

						<View
							style={{
								backgroundColor: "white",
								padding: 5,
								marginTop: 5,
							}}
						>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<View
									style={{ width: "48%", marginRight: "4%" }}
								>
									<Label
										style={{
											padding: 5,
											paddingBottom: 10,
										}}
									>
										First name
									</Label>

									<Item regular>
										{/* First name input */}
										<Input
											onChangeText={(text) => {
												setForm({
													...form,
													fname: text,
												});
											}}
											value={form?.fname}
										/>
									</Item>
								</View>
								<View style={{ width: "48%" }}>
									<Label
										style={{
											padding: 5,
											paddingBottom: 10,
										}}
									>
										Last name
									</Label>

									<Item regular>
										{/* Last name input */}
										<Input
											onChangeText={(text) => {
												setForm({
													...form,
													lname: text,
												});
											}}
											value={form?.lname}
										/>
									</Item>
								</View>
							</View>

							{/* Phone Number */}
							<View style={{ width: "100%" }}>
								<Label
									style={{ padding: 5, paddingBottom: 10 }}
								>
									Phone
								</Label>

								<Item regular>
									<Input
										onChangeText={(text) => {
											setForm({
												...form,
												contactNumber: text,
											});
										}}
										value={form?.contactNumber}
									/>
								</Item>
							</View>

							{/* Email */}
							<View style={{ width: "100%" }}>
								<Label
									style={{ padding: 5, paddingBottom: 10 }}
								>
									Email
								</Label>

								<Item regular>
									<Input
										onChangeText={(text) => {
											setForm({ ...form, email: text });
										}}
										value={form?.email}
									/>
								</Item>
							</View>

							{/* Birthday and Gender */}
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<View
									style={{ width: "48%", marginRight: "4%" }}
								>
									<Label
										style={{
											padding: 5,
											paddingBottom: 10,
										}}
									>
										Birthday
									</Label>

									<Item regular>
										{/* Birthday */}
										<CustomDatePicker
											onSelectDate={(date) => {
												setForm({
													...form,
													bdate: date,
												});
											}}
										/>
									</Item>
								</View>
								<View style={{ width: "48%" }}>
									<Label
										style={{
											padding: 5,
											paddingBottom: 10,
										}}
									>
										Gender
									</Label>

									<Item regular>
										{/* gender input */}
										<Picker
											mode="dropdown"
											iosHeader="Select Gender"
											style={{ width: "100%" }}
											selectedValue={form?.gender}
											onValueChange={(val) => {
												setForm({
													...form,
													gender: val,
												});
											}}
										>
											<Picker.Item
												label="Male"
												value="Male"
											/>
											<Picker.Item
												label="Female"
												value="Female"
											/>
											<Picker.Item
												label="LGBTQIA+"
												value="LGBTQIA+"
											/>
										</Picker>
									</Item>
								</View>
							</View>

							{/* Email */}
							<View style={{ width: "100%", marginTop: 5 }}>
								<Label
									style={{ padding: 5, paddingBottom: 10 }}
								>
									Password
								</Label>

								<Item regular>
									<Input
										secureTextEntry={true}
										onChangeText={(text) => {
											setForm({
												...form,
												password: text,
											});
										}}
										value={form?.password}
									/>
								</Item>
							</View>
							<View
								style={{
									padding: 15,
								}}
							>
								<Text
									variant="caption"
									style={{ color: colors.brand.grey }}
								>
									Minimum of 8 characters composed of numbers
									and letters.
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							padding: 10,
							flexDirection: "row",
							justifyContent: "space-evenly",
							backgroundColor: "white",
						}}
					>
						<Spacer position="bottom" size="large" />
						<ButtonTypes.PrimaryButton
							style={{
								width: "100%",
							}}
							onPress={() => {
								onSubmit(form);
							}}
						>
							<ButtonTypes.PrimaryButtonText>
								Register
							</ButtonTypes.PrimaryButtonText>
						</ButtonTypes.PrimaryButton>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeArea>
	);
};

const mapDispatchToProps = (dispatch) => ({
	register: (data, cb) => dispatch(registerStart(data, cb)),
});

export default connect(null, mapDispatchToProps)(RegistrationScreen);
