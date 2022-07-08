import React, { useState } from "react";
import { View, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Item } from "native-base";

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
          width: "100%",
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
