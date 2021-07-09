import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonTypes from "./buttons.component";

const CustomDatePicker = ({ onSelectDate }) => {
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
			<ButtonTypes.PrimaryButton onPress={showDatePicker}>
				<ButtonTypes.PrimaryButtonText>
					Choose Birthday
				</ButtonTypes.PrimaryButtonText>
			</ButtonTypes.PrimaryButton>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				isDarkModeEnabled={true}
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
		</View>
	);
};

export default CustomDatePicker;
