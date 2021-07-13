import emailjs from "emailjs-com";
import moment from "moment";
import { Alert } from "react-native";
import currencyFormat from "./currencyFormat";
export const merchantCreationEmail = ({ to_name, email, contact_number }) => {
	emailjs
		.send(
			"service_xarrmch",
			"template_gwuode4",
			{
				to_name,
				email,
				contact_number,
			},
			"user_BgbYodHJVW1sBGMlZrluD"
		)

		.then(
			(result) => {
				fireAlert("Email sent to merchant!", "success");
			},
			(error) => {
				fireAlert(
					"Error: Notification email not sent to merchant!",
					"error"
				);
			}
		);
};

export const newOrderEmail = ({
	to_name,
	email,
	orderNo,
	orderDateTime,
	deliveryOption,
	merchants,
	subTotal,
	discount,
	deliveryFee,
	transactionFee,
	grandTotal,
	contactNumber,
	fullAddress,
	paymentMethod,
	orderDetailsContent,
}) => {
	emailjs
		.send(
			"service_xarrmch",
			"template_aylpu6a",
			{
				to_name,
				from_name: "Bakal Lokal",
				email,
				orderNo,
				amount: currencyFormat(grandTotal),
				orderDateTime: moment(orderDateTime).format(
					"MMMM Do YYYY, h:mm:ss a"
				),
				deliveryOption,
				merchants,
				subTotal: currencyFormat(subTotal),
				discount: currencyFormat(discount),
				deliveryFee: currencyFormat(deliveryFee),
				transactionFee: currencyFormat(transactionFee),
				grandTotal: currencyFormat(grandTotal),
				contactNumber,
				fullAddress,
				paymentMethod,
				orderDetailsContent,
			},
			"user_BgbYodHJVW1sBGMlZrluD"
		)

		.then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
};

export const verificationEmail = ({ to_name, email, verification_link }) => {
	emailjs
		.send(
			"service_xarrmch",
			"template_bhh55j8",
			{
				to_name,
				from_name: "Bakal Lokal",
				email,
				verification_link,
			},
			"user_BgbYodHJVW1sBGMlZrluD"
		)

		.then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
};

export const resetPasswordMail = ({
	to_name,
	to_email,
	reset_password_link,
}) => {
	emailjs
		.send(
			"service_xarrmch",
			"template_0u853tl",
			{
				to_name,
				from_name: "Bakal Lokal",
				to_email,
				reset_password_link,
			},
			"user_BgbYodHJVW1sBGMlZrluD"
		)

		.then(
			(result) => {
				Alert.alert(
					"Bakal Lokal",
					"Reset password mail has been sent to your email address"
				);
			},
			(error) => {
				Alert.alert(
					"Bakal Lokal",
					"Error sending reset password mail. Please refresh the page and try again."
				);
			}
		);
};
