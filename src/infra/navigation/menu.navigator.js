import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
	Ionicons,
	FontAwesome,
	AntDesign,
	FontAwesome5,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeArea } from "../../components/utils/safe-area.component";
import { BottomNavigator } from "./bottom-navigation";
// import ProductsScreen from "../../screens/products.screen";
import { theme } from "../theme";
const Drawer = createDrawerNavigator();

const SampleScreen = () => (
	<SafeArea>
		<Text>Sample Screen</Text>
	</SafeArea>
);

const DrawerMenuNavigator = () => (
	<Drawer.Navigator
		// screenOptions={createScreenOptions}
		initialRouteName="Home"
		drawerContentOptions={{
			activeTintColor: "tomato",
			inactiveTintColor: "gray",
		}}
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
			component={SampleScreen}
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
			component={SampleScreen}
		/>

		<Drawer.Screen
			options={{
				title: "Billing methods",
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
			component={SampleScreen}
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
			component={SampleScreen}
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
			component={SampleScreen}
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
			component={SampleScreen}
		/>

		<Drawer.Screen
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
		/>

		<Drawer.Screen
			options={{
				title: "Logout",
				drawerIcon: ({ size }) => (
					<View style={{ width: 27, marginRight: -15 }}>
						<AntDesign
							name="logout"
							size={size}
							color={theme.colors.brand.orange}
						/>
					</View>
				),
			}}
			name="Logout"
			component={SampleScreen}
		/>
	</Drawer.Navigator>
);

export default DrawerMenuNavigator;
