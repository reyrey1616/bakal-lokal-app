import React, { useState } from "react";
import {
	Image,
	TouchableOpacity,
	Alert,
	StyleSheet,
	View,
	Text,
} from "react-native";
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
import Autocomplete from "react-native-autocomplete-input";
import axios from "axios";
// import { AutoComplete, filterData } from "react-native-autocomplete-input";

const HeaderContainer = styled(Header)`
	background: #fff;
	elevation: 5;
	padding: 0;
	margin: 0;
	shadow-color: rgba(0,0,0,0.1);
	shadow-offset: { width: 0, height: 1 };
	shadow-opacity: 0.5;
    shadow-radius: 2; 
	z-index: 3;
	height: 100;
	overflow: scroll;
`;

const HeaderWithSearch = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const isAuthenticated = useSelector(selectAuthentication);
	const currentUser = useSelector(selectCurrentUser);

	const [searchString, setSearchString] = useState("");
	// const searchResult = filterData(searchString);
	const [searchResult, setSearchResult] = useState([]);

	const onChange = async (val) => {
		setSearchString(val);
		let search = val.replace(/[^a-zA-Z0-9]/g, "");

		if (val && search !== "" && search !== null && search !== undefined) {
			try {
				const request = await axios.get(`products/search/${search}`);
				const response = request.data;

				if (response.success === true) {
					setSearchResult(response.data);
				} else {
					throw Error;
				}
			} catch (error) {
				if (error.response.data.error) {
					const errorResponse = error.response.data.error;
					Alert.alert("Bakal Lokal", errorResponse);
				} else {
					Alert.alert("Bakal Lokal", "Error searching product...");
				}
			}
		}
	};

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
					{/* <Ionicons
								name="search-outline"
								size={24}
								color={colors.brand.orange}
							/> */}
					{/* <Input placeholder="Search products or shop" /> */}
					<View style={styles.autocompleteContainer}>
						<Autocomplete
							style={{
								width: "100%",
								borderWidth: 1,
								padding: 10,
								zIndex: 2,
								position: "relative",
							}}
							data={searchResult}
							value={searchString}
							onChangeText={(text) => onChange(text)}
							listContainerStyle={{
								position: "fixed",
								bottom: 10,
								left: 0,
								width: "100%",
								zIndex: 2,
								backgroundColor: "blue",
								padding: 10,
							}}
							flatListProps={{
								keyExtractor: (_, idx) => idx,
								renderItem: ({ item }) => {
									console.log(item?.name);
									return (
										<Text
											style={{
												zIndex: 999,
												backgroundColor: "transparent",
												// position: "absolute",
												// top: 0,
												// left: 0,
												// width: "100%",
											}}
										>
											{item?.name}
										</Text>
									);
								},
							}}
						/>
					</View>
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

const styles = StyleSheet.create({
	autocompleteContainer: {
		flex: 1,
		zIndex: 999,
	},
});
export default HeaderWithSearch;
