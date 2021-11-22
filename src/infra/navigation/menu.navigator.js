import React from "react";
import {
	createDrawerNavigator,
	DrawerItemList,
	DrawerContentScrollView,
} from "@react-navigation/drawer";
import { FontAwesome, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Alert, Text, View } from "react-native";
import { SafeArea } from "../../components/utils/safe-area.component";
import { BottomNavigator } from "./bottom-navigation";
// import ProductsScreen from "../../screens/products.screen";
import { theme } from "../theme";
import UserAccountScreen from "../../screens/customer-account.screen";
import CustomerOrdersScreen from "../../screens/customer-orders.screens";
import BillingAddressScreen from "../../screens/billing-address.screens";
import { asyncStoreRemove } from "../../services/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FAQScreen from "../../screens/FAQ,screen";
import {
	selectCurrentUser,
	selectAuthentication,
} from "../../services/auth/auth.selectors";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/auth/auth.actions";
import ContactScreen from "../../screens/contact.screen";
import AboutScreen from "../../screens/About.screen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const navigation = useNavigation();
	const currentUser = useSelector(selectCurrentUser);
	const isAuthenticated = useSelector(selectAuthentication);
	const dispatch = useDispatch();

	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			{currentUser && isAuthenticated ? (
				<TouchableOpacity
					style={{
						width: "100%",
						padding: 16,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						borderColor: "black",
					}}
					onPress={async () => {
						try {
							const request = await axios.get("/auth/logout");
							const response = await request.data;

							if (response.success === true) {
								await asyncStoreRemove("token");
								dispatch(logout());
								navigation.navigate("Login");
							} else {
								throw Error;
							}
						} catch (error) {
							Alert.alert("error", "Error logout");
						}
					}}
				>
					<AntDesign
						name="logout"
						size={24}
						color={theme.colors.brand.orange}
						style={{ marginRight: 10 }}
					/>
					<Text> Logout </Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={{
						width: "100%",
						padding: 16,
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						borderColor: "black",
					}}
					onPress={() => {
						navigation.navigate("Login");
					}}
				>
					<AntDesign
						name="user"
						size={24}
						color={theme.colors.brand.orange}
						style={{ marginRight: 10 }}
					/>
					<Text> Login </Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const SampleScreen = () => (
	<SafeArea>
		<Text>Sample Screen</Text>
	</SafeArea>
);

const DrawerMenuNavigator = () => {
	const navigation = useNavigation();

	return (
		<Drawer.Navigator
			// screenOptions={createScreenOptions}
			initialRouteName="Home"
			drawerContentOptions={{
				activeTintColor: "tomato",
				inactiveTintColor: "gray",
			}}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen
				style={{ background: "red" }}
				options={{
					title: "Home",

					drawerIcon: ({ size }) => (
						<View style={{ width: 27, marginRight: -15 }}>
							<FontAwesome
								name="home"
								size={size}
								color={theme.colors.brand.orange}
							/>
						</View>
					),
				}}
				name="Home"
				component={BottomNavigator}
			/>
			<Drawer.Screen
				style={{ background: "red" }}
				options={{
					title: "Account settings",
					drawerIcon: ({ size }) => (
						<View style={{ width: 27, marginRight: -15 }}>
							<FontAwesome
								name="user"
								size={size}
								color={theme.colors.brand.orange}
							/>
						</View>
					),
				}}
				name="Account settings"
				component={UserAccountScreen}
			/>

			<Drawer.Screen
				options={{
					title: "Orders",
					drawerIcon: ({ size }) => (
						<View style={{ width: 27, marginRight: -15 }}>
							<FontAwesome5
								name="shopping-bag"
								size={size}
								color={theme.colors.brand.orange}
							/>
						</View>
					),
				}}
				name="Orders"
				component={CustomerOrdersScreen}
			/>

			<Drawer.Screen
				options={{
					title: "Billing adress",
					drawerIcon: ({ size }) => (
						<View style={{ width: 27, marginRight: -15 }}>
							<FontAwesome
								name="credit-card-alt"
								size={18}
								color={theme.colors.brand.orange}
							/>
						</View>
					),
				}}
				name="Billing"
				component={BillingAddressScreen}
			/>

			<Drawer.Screen
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
				options={{
					title: "Coupons",
					drawerIcon: ({ size }) => {
						return (
							<View style={{ width: 27, marginRight: -15 }}>
								<FontAwesome5
									style={{ marginRight: -5 }}
									name="percentage"
									size={size}
									color={theme.colors.brand.orange}
								/>
							</View>
						);
					},
				}}
				name="Coupons"
				component={SampleScreen}
			/>

			<Drawer.Screen
				options={{
					title: "About us",
					drawerIcon: ({ size }) => (
						<View style={{ width: 27, marginRight: -15 }}>
							<AntDesign
								name="infocirlce"
								size={size}
								color={theme.colors.brand.orange}
							/>
						</View>
					),
				}}
				name="About"
				component={AboutScreen}
			/>

			<Drawer.Screen
				options={{
					title: "Contact us",
					drawerIcon: ({ size }) => (
						<View style={{ width: 27, marginRight: -15 }}>
							<FontAwesome
								name="phone"
								size={size}
								color={theme.colors.brand.orange}
							/>
						</View>
					),
				}}
				name="Contact"
				component={ContactScreen}
			/>

			<Drawer.Screen
				options={{
					title: "FAQs",
					drawerIcon: ({ size }) => (
						<View style={{ width: 27, marginRight: -15 }}>
							<AntDesign
								name="questioncircle"
								size={size}
								color={theme.colors.brand.orange}
							/>
						</View>
					),
				}}
				name="FAQs"
				component={FAQScreen}
			/>

			{/* <Drawer.Screen
		options={{
			title: "App settings",
			drawerIcon: ({ size }) => (
				<View style={{ width: 27, marginRight: -15 }}>
					<Ionicons
						name="settings"
						size={size}
						color={theme.colors.brand.orange}
					/>
				</View>
			),
		}}
		name="Settings"
		component={SampleScreen}
	/> */}
		</Drawer.Navigator>
	);
};

export default DrawerMenuNavigator;
