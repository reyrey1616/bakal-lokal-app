import React, { useState } from "react";
import {
	Alert,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";
import { Input, Item } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ButtonTypes from "../utils/buttons.component";
import { colors } from "../../infra/theme/colors";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../services/auth/auth.selectors";
import { useNavigation } from "@react-navigation/core";

export const BottomCart = ({ onValueChange, onAddToCart, disabled }) => {
	const [quantity, setQuantity] = useState(1);

	const currentUser = useSelector(selectCurrentUser);
	const navigation = useNavigation();

	const quantityChange = (type = "add", value = 1) => {
		let newValue;
		if (type === "add") {
			newValue = quantity + value;
		} else {
			if (quantity <= 1) return;
			newValue = quantity - value;
		}

		setQuantity(newValue);
		onValueChange(newValue);
	};
	return (
		<View
			style={{
				zIndex: 999,
				flexDirection: "row",
				justifyContent: "space-around",
				width: "100%",
				alignItems: "center",
				paddingLeft: 10,
				paddingRight: 10,
				paddingTop: 10,
				paddingBottom: 10,
				backgroundColor: "white",
			}}
		>
			<Item
				regular
				style={{
					width: 120,
					borderRadius: 10,
					paddingRight: 5,
					paddingLeft: 5,
					height: 50,
				}}
			>
				<TouchableOpacity onPress={() => quantityChange("minus")}>
					<AntDesign name="minus" size={25} color="black" />
				</TouchableOpacity>
				<Input
					value={quantity}
					defaultValue={`${quantity}`}
					disabled
					style={{ textAlign: "center" }}
				/>
				<TouchableOpacity onPress={() => quantityChange("add")}>
					<AntDesign
						name="plus"
						size={25}
						color={colors.brand.orange}
					/>
				</TouchableOpacity>
			</Item>
			<ButtonTypes.PrimaryButton
				disabled={disabled}
				style={{
					width: "60%",
					paddingTop: 10,
					paddingBottom: 10,
					height: 50,
				}}
				onPress={() => {
					if (!currentUser) {
						navigation.navigate("Login");
						Alert.alert(
							"Bakal Lokal",
							"Please login first to add items to bayong."
						);
					} else {
						onAddToCart(quantity);
					}
				}}
			>
				<ButtonTypes.PrimaryButtonText>
					Add to bayong
				</ButtonTypes.PrimaryButtonText>
			</ButtonTypes.PrimaryButton>
		</View>
	);
};
