import React, { useState, useEffect } from "react";
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
} from "native-base";
import { Image, View, Alert, ImageBackground } from "react-native";
import ButtonTypes from "../components/utils/buttons.component";
import { Spacer } from "../components/spacer/spacer.component";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "../components/typography/text.component";
import { colors } from "../infra/theme/colors";
import SectionTitle from "../components/utils/title.component";
import { useDispatch } from "react-redux";
import { loginStart } from "../services/auth/auth.actions";
import { theme } from "../infra/theme";
import { connect } from "react-redux";
import {
	selectCurrentUser,
	selectAuthentication,
} from "../services/auth/auth.selectors";
import { createStructuredSelector } from "reselect";

const LoginScreen = ({ navigation, currentUser, isAuthenticated }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: "guidoriagaorey16@gmail.com",
		password: "12345678",
	});

	useEffect(() => {
		console.log(isAuthenticated);

		if (currentUser) {
			navigation.navigate("Menu");
		}
	}, [currentUser]);

	const onSubmit = (data) => {
		navigation.navigate("Menu");

		if (data?.email === "") {
			Alert.alert("Bakal Lokal", "Please input email!");
		} else if (data?.password === "") {
			Alert.alert("Bakal Lokal", "Please input password!");
		} else {
			navigation.navigate("Menu");

			dispatch(
				loginStart(data, (token) => {
					navigation.navigate("Menu");
					Alert.alert("Bakal Lokal", "Login Success");
				})
			);
		}
	};
	return (
		<SafeArea>
			<ImageBackground
				style={{
					width: "100%",
					flex: 1,
					flexDirection: "column",
					justifyContent: "space-between",
				}}
				source={require("../assets/design/background.png")}
			>
				<View>
					<View>
						<Header style={{ backgroundColor: "white" }}>
							<Left>
								<Button transparent>
									<Icon
										onPress={() => {
											navigation.navigate("Menu");
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
									User Login
								</Title>
							</Body>

							<Right />
						</Header>
					</View>
					<Spacer position="bottom" size="small" />
					<View
						style={{
							alignItems: "center",
							flexDirection: "row",
							justifyContent: "space-around",
							backgroundColor: "white",
							paddingLeft: "15%",
							paddingRight: "15%",
							alignItems: "center",
						}}
					>
						<Image
							source={require("../assets/logo/main-logo-transparent.png")}
							style={{ width: 70, height: 70 }}
						/>
						<View>
							<Spacer position="bottom" size="medium" />
							<Text
								variant="title"
								style={{
									color: colors.brand.black,
									fontWeight: "bold",
									fontSize: theme?.fontSizes?.h4,
								}}
							>
								Welcome to
							</Text>
							<Text
								variant="title"
								style={{
									color: colors.brand.orange,
									fontWeight: "bold",
									fontSize: theme?.fontSizes?.h4,
								}}
							>
								BAKAL LOKAL
							</Text>
						</View>
					</View>

					<View
						style={{
							backgroundColor: "white",
							padding: 5,
							marginTop: 5,
						}}
					>
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								padding: 15,
							}}
						>
							<SectionTitle text1="Please" text2="Login" />
						</View>
						<Item regular style={{ borderRadius: 7 }}>
							<AntDesign name="user" size={24} color="orange" />
							<Input
								placeholder="Email"
								onChangeText={(text) => {
									setForm({ ...form, email: text });
								}}
								value={form?.email}
							/>
						</Item>
						<Spacer size="medium" position="bottom" />
						<Item regular style={{ borderRadius: 7 }}>
							<AntDesign name="key" size={24} color="orange" />

							<Input
								placeholder="Password"
								secureTextEntry={true}
								onChangeText={(text) => {
									setForm({ ...form, password: text });
								}}
								value={form?.password}
							/>
						</Item>

						<View
							style={{
								alignItems: "flex-end",
								justifyContent: "flex-end",
								padding: 15,
							}}
						>
							<Text
								variant="caption"
								style={{ color: colors.brand.orange }}
							>
								Forgot password?
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
							width: "47%",
						}}
						onPress={() => {
							onSubmit(form);
						}}
					>
						<ButtonTypes.PrimaryButtonText>
							Login
						</ButtonTypes.PrimaryButtonText>
					</ButtonTypes.PrimaryButton>
					<Spacer position="bottom" size="large" />
					<Button
						bordered
						warning
						style={{
							width: "47%",
							alignItems: "center",
							justifyContent: "center",
						}}
						onPress={() => {
							navigation.navigate("Registration Form");
						}}
					>
						<ButtonTypes.SecondaryButtonText>
							Sign up
						</ButtonTypes.SecondaryButtonText>
					</Button>
				</View>
			</ImageBackground>
		</SafeArea>
	);
};

const mapStateToProps = createStructuredSelector({
	isAuthenticated: selectAuthentication,
	currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(LoginScreen);
