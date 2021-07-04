import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const StackHeader = ({ previousScreen }) => {
	const navigation = useNavigation();

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
				paddingLeft: 10,
				paddingRight: 10,
			}}
		>
			<AntDesign
				name="arrowleft"
				size={24}
				color="white"
				onPress={() => {
					navigation.navigate(`${previousScreen}`);
				}}
			/>
			<TouchableOpacity style={{ padding: 10, paddingTop: 15 }}>
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
