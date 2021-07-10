import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonTypes from "./buttons.component";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../infra/theme/colors";
import { Item } from "native-base";
import moement from "moment";

const CustomDatePicker = ({ onSelectDate, value, mode, title, icon }) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		hideDatePicker();
		onSelectDate(date);
	};

	return (
		<View style={{ border: 0 }}>
			<Item
				onPress={showDatePicker}
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop: 10,
					paddingBottom: 10,
				}}
			>
				<Text
					style={{
						borderBottomColor: "#333",
						borderBottomWidth: 1,
					}}
				>
					{value !== null ? `${value}` : title}
				</Text>
				{icon}
			</Item>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode={mode}
				isDarkModeEnabled={true}
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
		</View>
	);
};

export default CustomDatePicker;
