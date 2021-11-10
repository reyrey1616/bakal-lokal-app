import React, { useEffect, useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View, Alert, Text } from "react-native";
import { Button } from "native-base";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
import { Spinner } from "native-base";
import DeliveryAddressForm from "../components/delivery-option/delivery-address.component";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
	selectDeliveryDetails,
	selectAuthLoading,
	selectCurrentUser,
} from "../services/auth/auth.selectors";
import { useSelector, useDispatch } from "react-redux";
import { getDistance } from "geolib";
import { updateCustomerInfoStart } from "../services/auth/auth.actions";

const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const BillingAddressScreen = ({ route }) => {
	const dispatch = useDispatch();
	const form = useSelector(selectDeliveryDetails);
	const user = useSelector(selectCurrentUser);
	const loading = useSelector(selectAuthLoading);
	const [deliveryAddress, setDeliveryAddress] = useState({
		fullAddress: "",
		baranggay: "",
		city: "",
		province: "",
		postcode: "",
	});

	// const [deliveryMarker, setDeliveryMarker] = useState({
	// 	latitude: 10.6987864,
	// 	longitude: 122.5485763,
	// });

	useEffect(() => {
		setDeliveryAddress({
			baranggay: user?.baranggay,
			fullAddress: user?.fullAddress,
			city: user?.city,
			baranggay: user?.baranggay,
			province: user?.province,
			postcode: user?.postcode,
		});
	}, [user]);

	// const calculateDistance = (to) => {
	// 	var dis = getDistance(
	// 		{ latitude: 10.7177168, longitude: 122.5598794 },
	// 		{ latitude: to?.latitude, longitude: to?.longitude }
	// 	);
	// 	return dis / 1000;
	// };

	const billingAddressSave = () => {
		if (deliveryAddress?.fullAddress === "") {
			alert("Please set your address line");
		} else if (deliveryAddress?.baranggay === "") {
			alert("Please set your baranggay");
		} else if (deliveryAddress?.city === "") {
			alert("Please set your city");
		} else if (deliveryAddress?.province === "") {
			alert("Please set your province");
		} else if (deliveryAddress?.postcode === "") {
			alert("Please set your postcode");
		} else {
			// if (form?.lat && form?.lng && form?.distance) {
			// 	dispatch(setDeliveryDetails({ ...form, ...deliveryAddress }));
			// } else {
			// 	alert("Please set your delivery location.");

			// 	return;
			// }

			console.log(deliveryAddress);
			dispatch(
				updateCustomerInfoStart({
					payload: {
						fullAddress: deliveryAddress?.fullAddress,
						baranggay: deliveryAddress?.baranggay,
						city: deliveryAddress?.city,
						province: deliveryAddress?.province,
						postcode: deliveryAddress?.postcode,
						actionType: "billing_address",
					},
					callback: () => {
						Alert.alert("Bakal Lokal", "Successfully Saved!");
					},
				})
			);
		}
	};
	return (
		<SafeArea>
			<BLHeader title="Billing Address" previousScreen={"Home"} />
			<ScrollViewContainer
				contentContainerStyle={{
					flexGrow: 1,
					backgroundColor: colors.brand.dirtywhite,
				}}
			>
				<View style={{ width: "100%" }}>
					{loading ? (
						<Spinner color="orange" />
					) : (
						<DeliveryAddressForm
							form={deliveryAddress}
							setForm={(data) => {
								console.log(data);
								setDeliveryAddress(data);
							}}
						/>
					)}
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
						}}
					>
						{/* <Button
							style={{ padding: 10, margin: 10 }}
							warning
							onPress={() => {
								console.log(route?.name);
								navigation.navigate("Map", {
									previousScreen: route?.name,
								});
							}}
						>
							<ButtonTypes.PrimaryButtonText>
								Choose Delivery Location on Map
							</ButtonTypes.PrimaryButtonText>
						</Button> */}
					</View>
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
						billingAddressSave();
					}}
				>
					<ButtonTypes.PrimaryButtonText>
						Save
					</ButtonTypes.PrimaryButtonText>
				</Button>
			</View>
		</SafeArea>
	);
};

export default BillingAddressScreen;
