import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "native-base";
import { Text } from "../typography/text.component";
import ButtonTypes from "../utils/buttons.component";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setDeliveryLocation } from "../../services/auth/auth.actions";
import { getDistance } from "geolib";
import { useNavigation } from "@react-navigation/native";

const Map = ({ user, previousScreen }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [deliveryMarker, setDeliveryMarker] = useState({
		latitude: 10.6987864,
		longitude: 122.5485763,
	});

	const [distance, setDistance] = useState(0);

	const [location, setLocation] = useState({
		latitude: 10.6987864,
		longitude: 122.5485763,
	});

	useEffect(() => {
		if (user?.lat && user?.lng) {
			setDeliveryMarker({
				latitude: parseFloat(user?.lat),
				longitude: parseFloat(user?.lng),
			});
		} else {
			setDeliveryMarker({
				latitude: 10.7177168,
				longitude: 122.5598794,
			});
		}

		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert(
					"Bakal Lokal",
					"Permission to access location was denied."
				);
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location?.coords);
		})();
	}, []);

	useEffect(() => {
		const dis = calculateDistance({
			latitude: parseFloat(deliveryMarker?.latitude),
			longitude: parseFloat(deliveryMarker?.longitude),
		});

		setDistance(dis);
	}, [deliveryMarker]);

	const calculateDistance = (to) => {
		var dis = getDistance(
			{ latitude: 10.7177168, longitude: 122.5598794 },
			{ latitude: to?.latitude, longitude: to?.longitude }
		);
		return dis / 1000;
	};

	return (
		<>
			<MapView
				provider={PROVIDER_GOOGLE}
				style={{ flex: 1 }}
				zoomEnabled
				initialRegion={{
					latitude: 10.6987864,
					longitude: 122.5485763,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				scrollEnabled
			>
				<Marker
					isPreSelected={true}
					draggable
					coordinate={deliveryMarker}
					onDragEnd={(e) => {
						setDeliveryMarker(e.nativeEvent.coordinate);
					}}
					title={"Delivery Location"}
				/>

				<Marker
					coordinate={{
						latitude: 10.72319,
						longitude: 122.5546544,
					}}
					title={"Bakal Lokal Hub"}
					pinColor="orange"
				/>
			</MapView>
			<View
				style={{
					width: "100%",
					padding: 10,
					backgroundColor: "white",
				}}
			>
				<View style={{ marginBottom: 15, marginTop: 15 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 5,
						}}
					>
						<View
							style={{
								width: 20,
								height: 20,
								borderRadius: 5,
								backgroundColor: "orange",
							}}
						/>
						<Text variant="caption"> - Bakal Lokal Hub </Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 5,
						}}
					>
						<View
							style={{
								width: 20,
								height: 20,
								borderRadius: 5,
								backgroundColor: "red",
							}}
						/>
						<Text variant="caption">
							- Delivery Location (Long press and drag the marker
							to update the location.)
						</Text>
					</View>

					<View
						style={{
							marginTop: 15,
						}}
					>
						<Text variant="title">
							{Math.ceil(distance)}KM from Bakal Lokal Hub
						</Text>
					</View>
				</View>

				<Button
					block
					warning
					onPress={() => {
						if (
							deliveryMarker?.latitude &&
							deliveryMarker?.longitude &&
							distance
						) {
							if (previousScreen === "Delivery") {
								dispatch(
									setDeliveryLocation({
										lat: deliveryMarker?.latitude,
										lng: deliveryMarker?.longitude,
										distance,
									})
								);

								navigation.navigate(`${previousScreen}`);
							}
						} else {
							Alert.alert(
								"Bakal Lokal",
								"Please set your location."
							);
						}
					}}
				>
					<ButtonTypes.PrimaryButtonText>
						Confirm
					</ButtonTypes.PrimaryButtonText>
				</Button>
			</View>
		</>
	);
};

export default Map;
