import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { asyncStoreGet } from "../../services/utils";
import {
	selectAuthentication,
	selectCurrentUser,
} from "../../services/auth/auth.selectors";
import { useSelector } from "react-redux";
import { Container, Header, Content, Button, Icon } from "native-base";
export const StackHeader = ({ previousScreen }) => {
	const navigation = useNavigation();
	const isAuthenticated = useSelector(selectAuthentication);
	const currentUser = useSelector(selectCurrentUser);

	return (
		<View
			style={{
				position: "absolute",
				top: 1,
				zIndex: 999,
				flexDirection: "row",
				justifyContent: "space-between",
				width: "100%",
				alignItems: "center",
				paddingLeft: 0,
				paddingTop: 0,
				paddingRight: 10,
				backgroundColor: "rgba(0,0,0.3)",
			}}
		>
			<Button warning style={{ padding: 10 }}>
				<AntDesign
					name="arrowleft"
					size={24}
					color="white"
					onPress={() => {
						navigation.navigate(`${previousScreen}`);
					}}
				/>
			</Button>

			<TouchableOpacity
				style={{ padding: 10, paddingTop: 15 }}
				onPress={async () => {
					const token = await asyncStoreGet("token");
					if (isAuthenticated && currentUser && token) {
						navigation.navigate("Cart");
					} else {
						Alert.alert(
							"Bakal Lokal",
							"Please login your account to view your cart"
						);
						navigation.navigate("Login");
					}
				}}
			>
				<Image
					source={require("../../assets/logo/bl-basket.png")}
					style={{
						width: 30,
						height: 30,
					}}
				/>
			</TouchableOpacity>
		</View>
	);
};
