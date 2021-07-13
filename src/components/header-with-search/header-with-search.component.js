import React from "react";
import { Image, TouchableOpacity, Alert } from "react-native";
import { Header, Body, Item, Input } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { colors } from "../../infra/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { openDrawer } from "../../infra/navigation/main.navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { asyncStoreGet } from "../../services/utils";
import {
	selectAuthentication,
	selectCurrentUser,
} from "../../services/auth/auth.selectors";
import { useSelector } from "react-redux";
const HeaderContainer = styled(Header)`
	background: #fff;
	elevation: 5;
	padding: 0;
	margin: 0;
	shadow-color: rgba(0,0,0,0.1);
	shadow-offset: { width: 0, height: 1 };
	shadow-opacity: 0.5;
    shadow-radius: 2; 
`;
const HeaderWithSearch = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const isAuthenticated = useSelector(selectAuthentication);
	const currentUser = useSelector(selectCurrentUser);
	return (
		<HeaderContainer>
			<Grid
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<Col size={15}>
					<TouchableOpacity
						style={{ padding: 10 }}
						onPress={() => {
							openDrawer();
						}}
					>
						<Ionicons
							name="menu-outline"
							size={40}
							color={colors.brand.orange}
						/>
					</TouchableOpacity>
				</Col>
				<Col size={70}>
					<Body style={{ paddingRight: 15, paddingTop: 6 }}>
						<Item>
							<Ionicons
								name="search-outline"
								size={24}
								color={colors.brand.orange}
							/>
							<Input placeholder="Search products or shop" />
						</Item>
					</Body>
				</Col>
				<TouchableOpacity
					style={{ padding: 10, paddingTop: 15 }}
					onPress={async () => {
						const token = await asyncStoreGet("token");
						if (isAuthenticated && currentUser && token) {
							navigation.navigate("Cart", {
								previousScreen: route?.name,
							});
						} else {
							Alert.alert(
								"Bakal Lokal",
								"Please login your account to view your cart"
							);
							navigation.navigate("Login");
						}
					}}
				>
					<Image
						source={require("../../assets/logo/bl-basket.png")}
						style={{
							width: 30,
							height: 30,
						}}
					/>
				</TouchableOpacity>
			</Grid>
		</HeaderContainer>
	);
};

export default HeaderWithSearch;
