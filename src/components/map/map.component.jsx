import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "native-base";
import { Text } from "../typography/text.component";
import ButtonTypes from "../utils/buttons.component";
import MapView, { Marker } from "react-native-maps";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeliveryLocation,
  setDeliveryDetails,
  setDeliveryFee,
} from "../../services/auth/auth.actions";
import { getDistance } from "geolib";
import { useNavigation } from "@react-navigation/native";
import { selectDeliveryDetails } from "../../services/auth/auth.selectors";

const Map = ({ user, previousScreen }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const deliveryDetails = useSelector(selectDeliveryDetails);

  const [deliveryMarker, setDeliveryMarker] = useState({
    latitude: parseFloat(10.6987864),
    longitude: parseFloat(122.5485763),
  });

  const [distance, setDistance] = useState(0);

  const [location, setLocation] = useState({
    latitude: parseFloat(10.6987864),
    longitude: parseFloat(122.5485763),
  });

  useEffect(() => {
    if (user?.lat && user?.lng) {
      setDeliveryMarker({
        latitude: parseFloat(user?.lat),
        longitude: parseFloat(user?.lng),
      });
    } else {
      setDeliveryMarker({
        latitude: parseFloat(10.7177168),
        longitude: parseFloat(122.5598794),
      });
    }

    // (async () => {
    // 	let { status } = await Location.requestForegroundPermissionsAsync();
    // 	if (status !== "granted") {
    // 		Alert.alert(
    // 			"Bakal Lokal",
    // 			"Permission to access location was denied."
    // 		);
    // 		return;
    // 	}

    // 	let location = await Location.getCurrentPositionAsync({});
    // 	setLocation(location?.coords);
    // })();
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
      {
        latitude: parseFloat(10.7177168),
        longitude: parseFloat(122.5598794),
      },
      {
        latitude: parseFloat(to?.latitude),
        longitude: parseFloat(to?.longitude),
      }
    );
    return dis / 1000;
  };
  5.78;
  return (
    <>
      <MapView
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

            const latitute = e.nativeEvent?.coordinate?.latitude;
            const longitude = e.nativeEvent?.coordinate?.longitude;

            setDeliveryMarker({
              latitude: parseFloat(latitute),
              longitude: parseFloat(longitude),
            });
          }}
          title={"Delivery Location"}
        />

        <Marker
          coordinate={{
            latitude: parseFloat(10.72319),
            longitude: parseFloat(122.5546544),
          }}
          title={"Bakal Lokal Hub"}
          pinColor="orange"
        />
      </MapView>
      {/* <MapView
				style={{
					flex: 1,
				}}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			/> */}
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
              - Delivery Location (Long press and drag the marker to update the
              location.)
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
                let deliveryFee = 0;
                if (deliveryDetails?.logistic === "Lihog") {
                  const excessDistance =
                    Math.ceil(deliveryDetails?.distance) - 3;
                  deliveryFee = 49 + excessDistance * 9;
                  dispatch(setDeliveryFee(deliveryFee));
                }

                navigation.navigate(`${previousScreen}`);
              }
            } else {
              Alert.alert("Bakal Lokal", "Please set your location.");
            }
          }}
        >
          <ButtonTypes.PrimaryButtonText>Confirm</ButtonTypes.PrimaryButtonText>
        </Button>
      </View>
    </>
  );
};

export default Map;
