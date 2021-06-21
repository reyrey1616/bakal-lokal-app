import React, { useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { Container, Content, Input, Item } from "native-base";
import { Image, View, Alert } from "react-native";
import ButtonTypes from "../components/utils/buttons.component";
import { Spacer } from "../components/spacer/spacer.component";
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const onSubmit = (data) => {
		if (data?.email === "") {
			Alert.alert("Bakal Lokal", "Please input email!");
		} else if (data?.password === "") {
			Alert.alert("Bakal Lokal", "Please input password!");
		} else {
			if (data?.email === "test" && data?.password === "test") {
				Alert.alert("Bakal Lokal", "Login successful!");
			} else {
				Alert.alert("Bakal Lokal", "Login failed!");
			}
		}
	};
	return (
		<SafeArea>
			<Container style={{ flex: 1 }}>
				<Spacer position="bottom" size="large" />
				<View style={{ flex: 0.35, alignItems: "center" }}>
					<Image
						source={require("../assets/logo/main-logo-transparent.png")}
						style={{ width: "50%", height: "100%" }}
					/>
				</View>

				<Spacer position="bottom" size="large" />

				<Content style={{ flex: 1, padding: 10 }}>
					<Item>
						<AntDesign name="user" size={24} color="orange" />
						<Input
							placeholder="Email Address"
							onChangeText={(text) => {
								setForm({ ...form, email: text });
							}}
							value={form?.email}
						/>
					</Item>

					<Item last>
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

					<Spacer position="bottom" size="large" />
					<ButtonTypes.PrimaryButton
						block
						onPress={() => {
							onSubmit(form);
						}}
					>
						<ButtonTypes.PrimaryButtonText>
							Login
						</ButtonTypes.PrimaryButtonText>
					</ButtonTypes.PrimaryButton>
					<Spacer position="bottom" size="large" />
					<ButtonTypes.SecondaryButton
						block
						onPress={() => {
							navigation.navigate("Registration Form");
						}}
					>
						<ButtonTypes.SecondaryButtonText>
							Signup
						</ButtonTypes.SecondaryButtonText>
					</ButtonTypes.SecondaryButton>
				</Content>
			</Container>
		</SafeArea>
	);
};

export default LoginScreen;
