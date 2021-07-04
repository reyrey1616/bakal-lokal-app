import React, { useState } from "react";
import { View } from "react-native";
import { Input, Item } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import ButtonTypes from "../utils/buttons.component";
import { colors } from "../../infra/theme/colors";
export const BottomCart = ({ onValueChange }) => {
	const [quantity, setQuantity] = useState(1);

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
				<AntDesign
					name="minus"
					size={22}
					color="black"
					onPress={() => quantityChange("minus")}
				/>
				<Input
					value={quantity}
					defaultValue={`${quantity}`}
					disabled
					style={{ textAlign: "center" }}
				/>
				<AntDesign
					name="plus"
					size={22}
					color={colors.brand.orange}
					onPress={() => quantityChange("add")}
				/>
			</Item>
			<ButtonTypes.PrimaryButton
				style={{
					width: "60%",
					paddingTop: 10,
					paddingBottom: 10,
					height: 50,
				}}
			>
				<ButtonTypes.PrimaryButtonText>
					Add to bayong
				</ButtonTypes.PrimaryButtonText>
			</ButtonTypes.PrimaryButton>
		</View>
	);
};
