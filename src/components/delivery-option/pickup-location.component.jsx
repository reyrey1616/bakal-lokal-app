import React from "react";
import { View, ScrollView, Image } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { colors } from "../../infra/theme/colors";
import { Text } from "../typography/text.component";
const PickupLocation = () => {
	return (
		<View style={{ width: "100%", backgroundColor: "white", marginTop: 5 }}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-start",
					padding: 15,
				}}
			>
				<FontAwesome
					name="map-marker"
					size={28}
					style={{ paddingRight: 8 }}
					color={colors.brand.orange}
				/>
				<Text variant="body">
					Produkto Lokal Hub, G/F AAMC Barbo Bldg., Jalandoni St.Brgy.
					Our Lady of Lourdes, Jaro, Iloilo City, Iloilo, Philippines,
					500
				</Text>
			</View>

			<View
				style={{
					flexDirection: "row",
					alignItems: "flex-start",
					padding: 15,
				}}
			>
				<AntDesign
					name="phone"
					size={25}
					color={colors.brand.orange}
					style={{ paddingRight: 8 }}
				/>
				<Text variant="body">(033) 328 1898</Text>
			</View>

			<ScrollView
				style={{ flexDirection: "row", width: "100%" }}
				horizontal
			>
				<View style={{ width: "50%", padding: 8 }}>
					<Image
						style={{ width: 250, height: 250 }}
						source={require("../../assets/static-images/1.jpg")}
					/>
				</View>
				<View style={{ width: "50%", padding: 8 }}>
					<Image
						style={{ width: 250, height: 250 }}
						source={require("../../assets/static-images/2.jpg")}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default PickupLocation;
