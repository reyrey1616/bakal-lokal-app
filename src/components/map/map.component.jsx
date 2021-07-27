import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "native-base";
import { Text } from "../typography/text.component";
import ButtonTypes from "../utils/buttons.component";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Alert } from "react-native";
import * as Location from "expo-location";
const Map = () => {
	const [deliveryMarker, setDeliveryMarker] = useState({
		latitude: 10.6987864,
		longitude: 122.5485763,
	});

	const [location, setLocation] = useState({
		latitude: 10.6987864,
		longitude: 122.5485763,
	});
	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {
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
						console.log(e.nativeEvent.coordinate);
						setDeliveryMarker(e.nativeEvent.coordinate);
					}}
					title={"Delivery Location"}
				/>

				<Marker
					coordinate={location}
					title={"Current Location"}
					pinColor="blue"
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
								backgroundColor: "blue",
							}}
						/>
						<Text variant="caption"> - Current Location </Text>
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
							{" "}
							- Delivery Location (Long press and drag the marker
							to update the location.)
						</Text>
					</View>
				</View>

				<Button
					block
					warning
					onPress={() => {
						deliveryOptionSubmit();
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
