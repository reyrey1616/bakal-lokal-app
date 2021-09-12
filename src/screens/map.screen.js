import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { Alert, ScrollView } from "react-native";
import { Spinner } from "native-base";
import BLHeader from "../components/header/header.component";
import styled from "styled-components";
import { colors } from "../infra/theme/colors";
import {
	selectCurrentUser,
	selectAuthLoading,
} from "../services/auth/auth.selectors";
import { useSelector } from "react-redux";
import Map from "../components/map/map.component";
import { useNavigation } from "@react-navigation/native";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const MapScreen = ({ route }) => {
	const { previousScreen } = route?.params;
	const navigation = useNavigation();
	const user = useSelector(selectCurrentUser);
	const loading = useSelector(selectAuthLoading);

	if (!user) {
		Alert.alert("Bakal Lokal", "Not authorized to access this page.");
		navigation.navigate("Home");
	}

	return (
		<SafeArea>
			<ScrollViewContainer
				contentContainerStyle={{
					flex: 1,
					backgroundColor: colors.brand.dirtywhite,
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<BLHeader
					title="Delivery Location"
					previousScreen={previousScreen}
				/>

				{loading ? (
					<Spinner color="orange" />
				) : (
					<Map user={user && user} previousScreen={previousScreen} />
				)}
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default MapScreen;
