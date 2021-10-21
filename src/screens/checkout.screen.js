import React, { useEffect, useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { Alert, ScrollView, View } from "react-native";
import { Button, Spinner, Content } from "native-base";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { CartTotals } from "../components/cart/cart-totals.component";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
import { useNavigation, useRoute } from "@react-navigation/core";
import PaymentMethodItem from "../components/checkout/payment-methods.component";
import {
	selectDeliveryDetails,
	selectDeliveryFee,
	selectDiscount,
	selectTransactionFee,
	selectCurrentUser,
	selectAuthState,
} from "../services/auth/auth.selectors";
import {
	setDeliveryDetails,
	setDeliveryFee,
} from "../services/auth/auth.actions";
import { useSelector, useDispatch } from "react-redux";
import {
	addOrderStart,
	updateCustomerInfoStart,
} from "../services/auth/auth.actions";
import axios from "axios";

const updateCouponUsage = async (coupon) => {
	if (!coupon) return;

	try {
		const request = await axios.put(`/coupons/use/${coupon}`);
		const response = await request.data;
		if (response?.success === false) {
			throw Error;
		}
	} catch (error) {
		Alert.alert("Bakal Lokal", "Error updating voucher's usage!");
	}
};

const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const userData = {
	subTotal: 745,
	deliveryFee: 40,
	transactionFee: 15,
	discount: 0,
	grandTotal: 800,
	withCoupon: true,
	barangay: "North Baluarte",
	fullAddress: "North Baluarte, Molo, Iloilo City, Iloilo",
	city: "Iloilo City",
	province: "Iloilo",
	postcode: "5000",
};

// const paymentMethods = [
// 	{ id: 1, name: "Gcash", content: "Lorem ipsum dolor sit amet" },
// 	{ id: 2, name: "Bank transfer", content: "Lorem ipsum dolor sit amet" },
// ];

const CheckoutScreen = ({ route }) => {
	const { previousScreen } = route?.params;
	const page = useRoute();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const deliveryDetails = useSelector(selectDeliveryDetails);
	const deliveryFee = useSelector(selectDeliveryFee);
	const discount = useSelector(selectDiscount);
	const transactionFee = useSelector(selectTransactionFee);
	const user = useSelector(selectCurrentUser);
	const authState = useSelector(selectAuthState);
	const [paymentMethodLoading, setPaymentMethodLoading] = useState(false);
	const [paymentMethods, setPaymentMethods] = useState([]);

	const getPaymentMethods = async () => {
		try {
			setPaymentMethodLoading(true);

			const req = await axios.get("/payment-methods");

			const response = await req?.data;

			if (response?.success) {
				setPaymentMethods(
					response?.data?.filter((d) => d?.status === "Active")
				);
				setPaymentMethodLoading(false);
			} else {
				throw Error;
			}
		} catch (err) {
			setPaymentMethodLoading(false);
		}
	};

	useEffect(() => {
		console.log(authState);
		getPaymentMethods();
	}, []);

	const onSelect = (val) => {
		let deliveryFee = 0;

		if (val === "Cash on Pick-up") {
			deliveryFee = 0;
		} else if (val === "GCASH") {
			deliveryFee = 0;
		} else if (val === "Direct Bank Transfer") {
			deliveryFee = 0;
		} else if (val === "Cash on Delivery") {
			if (deliveryDetails?.logistic === "Lihog") {
				const excessDistance = Math.ceil(deliveryDetails?.distance) - 3;
				deliveryFee = 49 + excessDistance * 9;
			}
		}

		if (deliveryDetails?.deliveryOption !== "Pick-up") {
			dispatch(setDeliveryFee(deliveryFee));
		}

		dispatch(
			setDeliveryDetails({
				...deliveryDetails,
				paymentMethod: val,
			})
		);
	};

	const handleCheckout = async () => {
		const {
			paymentMethod,
			deliveryOption,
			selectedVoucher,
		} = deliveryDetails;

		const pickUpDateTime = {
			pickupTime: deliveryDetails?.time,
			pickupDate: deliveryDetails?.date,
		};

		const subTotal = user?.cartItems?.reduce((acc, item) => {
			return item?.subTotal + acc;
		}, 0);

		const grandTotal = subTotal + transactionFee + deliveryFee - discount;

		if (!paymentMethod) {
			Alert.alert("Please choose your payment method.");
		} else if (!user || !user.cartItems) {
			Alert.alert("Something went wrong, Please refresh the page.");
		} else if (!deliveryFee && deliveryFee !== 0) {
			Alert.alert("Please choose your payment method.");
		} else if (user && user.cartItems && user.cartItems.length < 1) {
			Alert.alert("Add item to your cart before checkout.");
		} else if (
			deliveryOption === "Pick-up" &&
			pickUpDateTime.pickupDate === undefined
		) {
			Alert.alert("Please complete the date and time of pickup.");
		} else if (
			deliveryOption === "Pick-up" &&
			pickUpDateTime.pickupTime === undefined
		) {
			Alert.alert("Please complete the date and time of pickup.");
		} else if (
			deliveryOption === "Delivery" &&
			pickUpDateTime.pickupDate === undefined
		) {
			Alert.alert("Please complete the date and time of delivery.");
		} else if (
			deliveryOption === "Delivery" &&
			pickUpDateTime.pickupTime === undefined
		) {
			Alert.alert("Please complete the date and time of delivery.");
		} else {
			const updatedCartItem =
				user &&
				user?.cartItems &&
				user?.cartItems.map(
					({
						buyPrice,
						quantity,
						subTotal,
						variant,
						dateAdded,
						product,
					}) => {
						return {
							dateAdded,
							buyPrice,
							quantity,
							subTotal,
							variant,
							product,
						};
					}
				);

			const newOrder = {
				pickupDate: pickUpDateTime.pickupDate,
				pickupTime: pickUpDateTime.pickupTime,
				customer: user && user?._id,
				logistic: "Lihog",
				deliveryOption,
				subTotal,
				transactionFee,
				deliveryFee,
				discount,
				paymentMethod,
				grandTotal,
				voucher: selectedVoucher,
				cartItems: updatedCartItem,
				billing_fullAddress: deliveryDetails?.fullAddress,
				billing_province: deliveryDetails?.province,
				billing_city: deliveryDetails?.city,
				billing_postcode: deliveryDetails?.postcode,
				billing_baranggay: deliveryDetails?.baranggay,
				billing_destination: "Visayas",
				lat: deliveryDetails?.lat,
				lng: deliveryDetails?.lng,
				email: user?.email,
				contactNumber: user?.contactNumber,
				fullName: user?.fname + " " + user?.mname + " " + user?.lname,

				// orderDetailsContent: receiptItemsOrderedGenerator(
				// 	updatedCartItem
				// ).tabledProducts,
				// merchants: receiptItemsOrderedGenerator(updatedCartItem)
				// 	.merchants,
			};

			console.log(newOrder);

			dispatch(
				addOrderStart({
					payload: newOrder,
					callback: async () => {
						const customerInfo = {
							email: user?.email,
							fname: user?.fname,
							mname: user?.mname,
							contactNumber: user?.contactNumber,
							billing_baranggay: deliveryDetails?.baranggay,
							billing_fullAddress: deliveryDetails?.fullAddress,
							billing_city: deliveryDetails?.city,
							billing_postcode: deliveryDetails?.postcode,
							billing_province: deliveryDetails?.province,
							lat: deliveryDetails?.lat,
							lng: deliveryDetails?.lng,
							actionType: "checkout",
						};

					
						if (selectedVoucher) {
							await updateCouponUsage(selectedVoucher);
						}
						dispatch(
							updateCustomerInfoStart({
								payload: customerInfo,
								callback: async () => {
									Alert.alert("Order Successfully Placed!");
									setTimeout(() => {
										navigation.navigate("Products");
									}, 1500);
								},
							})
						);
					},
				})
			);
		}
	};

	return (
		<SafeArea>
			<BLHeader title="Payment summary" previousScreen={previousScreen} />
			<ScrollViewContainer
				contentContainerStyle={{
					flex: 1,
					backgroundColor: colors.brand.dirtywhite,
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<View style={{ width: "100%" }}>
					{paymentMethodLoading ? (
						<Content>
							<Spinner color="orange" />
						</Content>
					) : (
						paymentMethods?.map((data) => {
							return (
								<PaymentMethodItem
									key={data?._id}
									selected={
										deliveryDetails?.paymentMethod ===
										data?.name
											? true
											: false
									}
									name={data?.name}
									content={data?.instruction}
									onSelect={onSelect}
								/>
							);
						})
					)}
					<CartTotals userData={userData} />
				</View>
			</ScrollViewContainer>

			<View
				style={{
					width: "100%",
					padding: 10,
					backgroundColor: "white",
				}}
			>
				<Button
					block
					warning
					onPress={() => {
						handleCheckout();
					}}
				>
					<ButtonTypes.PrimaryButtonText>
						Proceed to checkout
					</ButtonTypes.PrimaryButtonText>
				</Button>
			</View>
		</SafeArea>
	);
};

export default CheckoutScreen;
