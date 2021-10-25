import React from "react";
import { View } from "react-native";
import { Item, Picker, Input } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../infra/theme/colors";
export const ShopsWithSearch = ({ onTextSearch }) => {
	return (
		<View
			style={{
				width: "100%",
				backgroundColor: "white",
				paddingLeft: 8,
				paddingRight: 8,
				marginBottom: 7,
				paddingBottom: 10,
			}}
		>
			<Item>
				<AntDesign
					name="search1"
					size={24}
					color={colors.brand.orange}
				/>
				<Input
					placeholder="Search merchant"
					placeholderTextColor="#bfc6ea"
					onChangeText={(val) => {
						onTextSearch(val);
					}}
				/>
			</Item>
			{/* 
			<Picker
				mode="dropdown"
				iosIcon={<AntDesign name="right" color={colors.brand.orange} />}
				style={{ width: "78%" }}
				placeholder="Category"
				placeholderStyle={{ color: "#bfc6ea" }}
				placeholderIconColor="#007aff"
				// selectedValue={this.state.selected2}
				// onValueChange={this.onValueChange2.bind(this)}
			> */}

			<Item picker>
				<Picker
					style={{ width: "100%", height: 40 }}
					iosHeader="Category"
					Header="Category"
					mode="dropdown"
					textStyle={{ color: "grey" }}
					placeholder="Select category"
					headerBackButtonText="Category"
				>
					<Picker.Item label="Food and Beverage" value="key0" />
					<Picker.Item label="Fresh" value="key1" />
					<Picker.Item label="Lifestyle" value="key2" />
				</Picker>
			</Item>
		</View>
	);
};
