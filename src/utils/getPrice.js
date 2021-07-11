import moment from "moment";
import { Alert } from "react-native";
const identifyPricing = (data) => {
	if (!data) {
		Alert.alert(
			"Bakal Lokal",
			"Something went wrong! Please refresh the page."
		);
	}

	if (
		dateCompareIfOnSale(
			data?.saleDetails?.saleEndDate,
			new Date(Date.now())
		)
	) {
		return data && data?.saleDetails?.salePrice;
	} else {
		return data && data?.srp;
	}
};

const dateCompareIfOnSale = (date1, date2) => {
	if (!date1 || !date2) {
		return false;
	}
	if (
		moment(date1).format("YYYY-MM-DD") >= moment(date2).format("YYYY-MM-DD")
	) {
		return true;
	} else {
		return false;
	}
};

export default identifyPricing;
