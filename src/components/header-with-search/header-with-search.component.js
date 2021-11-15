import React, { useState, useEffect } from "react";
import {
	Image,
	TouchableOpacity,
	Alert,
	StyleSheet,
	View,
	Text,
} from "react-native";
import { Header, Body, Left, ListItem, Thumbnail } from "native-base";
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

const HeaderWithSearch = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const isAuthenticated = useSelector(selectAuthentication);
	const currentUser = useSelector(selectCurrentUser);

	useEffect(() => {
		console.log(currentUser);
	}, [currentUser]);

	const [searchString, setSearchString] = useState("");
	// const searchResult = filterData(searchString);
	const [searchResult, setSearchResult] = useState([]);

	const onChange = async (val) => {
		setSearchString(val);
		let search = val.replace(/[^a-zA-Z0-9]/g, "");

		try {
			const request = await axios.get(`products/search/${search}`);
			const response = request.data;

			if (response.success === true) {
				response?.data?.length === 0
					? setSearchResult([])
					: setSearchResult(response.data);
			} else {
				throw Error;
			}
		} catch (error) {
			if (error.response.data.error) {
				setSearchResult([]);
			} else {
				Alert.alert("Bakal Lokal", "Error searching product...");
			}

			setSearchResult([]);
		}
	};

	return (
		<View style={styles.mainContainer}>
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
			<Ionicons
				name="search-outline"
				size={24}
				color={colors.brand.orange}
			/>
			<View style={styles.container}>
				<View style={styles.autocompleteContainer}>
					<Autocomplete
						// editable={!isLoading}
						autoCorrect={false}
						data={
							searchResult?.length === 1 && searchResult
								? []
								: searchResult
						}
						onBlur={() => {
							setSearchResult([]);
						}}
						value={searchString}
						onChangeText={(val) => onChange(val)}
						placeholder="Search products"
						flatListProps={{
							keyboardShouldPersistTaps: "always",
							keyExtractor: (item) => item?._id,
							renderItem: ({ item }) => {
								if (searchResult?.length >= 1) {
									return (
										<ListItem
											style={{ padding: 5, zIndex: 99 }}
											thumbnail
											onPress={() => {
												setSearchResult([]);
												navigation.navigate(
													"ProductDetails",
													{
														product: item,
														previousScreen:
															route?.name,
													}
												);
											}}
										>
											<Left>
												<Thumbnail
													square
													source={{
														uri: `https://bakal-lokal.xyz/products/${item?.profileImage}`,
													}}
												/>
											</Left>
											<Body>
												<Text>{item?.name}</Text>
											</Body>
										</ListItem>
									);
								}
							},
						}}
					/>
				</View>
			</View>
			<TouchableOpacity
				style={{ padding: 10, paddingTop: 15 }}
				onPress={async () => {
					const token = await asyncStoreGet("token");

					console.log(token, isAuthenticated, currentUser);
					if (isAuthenticated && token) {
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
		</View>
	);
};
const styles = StyleSheet.create({
	mainContainer: {
		flexDirection: "row",
		alignItems: "center",
		position: "relative",
		zIndex: 99,
		backgroundColor: "white",
	},
	container: {
		position: "relative",
		backgroundColor: "#F5FCFF",
		flex: 1,
		zIndex: 99,

		// Android requiers padding to avoid overlapping
		// with content and autocomplete
		paddingTop: 50,

		// Make space for the default top bar
		...Platform.select({
			web: {
				marginTop: 0,
			},
			default: {
				marginTop: 0,
			},
		}),
	},
	itemText: {
		fontSize: 15,
		margin: 2,
	},
	descriptionContainer: {
		// `backgroundColor` needs to be set otherwise the
		// autocomplete input will disappear on text input.
		backgroundColor: "#F5FCFF",
		marginTop: 8,
	},
	infoText: {
		textAlign: "center",
	},
	autocompleteContainer: {
		// Hack required to make the autocomplete
		// work on Andrdoid
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
		zIndex: 1,
		padding: 5,
	},
});

export default HeaderWithSearch;
