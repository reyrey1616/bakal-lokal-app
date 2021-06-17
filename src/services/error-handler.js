import { Alert } from "react-native";
export const handleValidationError = (err) => {
	if (err.startsWith("ValidationError")) {
		err.substring(15)
			.split(",")
			.forEach((er) => {
				Alert.alert(er);
			});

		return true;
	}

	return false;
};
