import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View } from "react-native";
import { Button } from "native-base";
import BLHeader from "../components/header/header.component";
import CartTable from "../components/cart/cart-table.component";
import styled from "styled-components";
import { CartTotals } from "../components/cart/cart-totals.component";
import { colors } from "../infra/theme/colors";
import ButtonTypes from "../components/utils/buttons.component";
import { useNavigation, useRoute } from "@react-navigation/core";
import { selectCurrentUser } from "../services/auth/auth.selectors";
import { useSelector } from "react-redux";
import Map from "../components/map/map.component";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const MapScreen = ({ route }) => {
	const { previousScreen } = route?.params;

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
				<Map />
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default MapScreen;
