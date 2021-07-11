import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../../screens/home.screen";
import { theme } from "../theme";
// import ProductNavigator from "./product.navigator";
import ProductsScreen from "../../screens/products.screen";
import OnSaleScreen from "../../screens/on-sale.screen";
import ShopNavigator from "./merchant.navigator";
const Tab = createBottomTabNavigator();

const createScreenOptions = ({ route }) => {
	if (route.name === "Home") {
		return {
			tabBarIcon: ({ size, color }) => (
				<FontAwesome name="home" size={size} color={color} />
			),
		};
	} else if (route.name === "Products") {
		return {
			tabBarIcon: ({ size, color }) => (
				<FontAwesome5 name="shopping-bag" size={size} color={color} />
			),
		};
	} else if (route.name === "Sale") {
		return {
			tabBarIcon: ({ size, color }) => (
				<FontAwesome name="heart" size={size} color={color} />
			),
		};
	} else if (route.name === "Shops") {
		return {
			tabBarIcon: ({ size, color }) => (
				<FontAwesome5 name="store" size={size} color={color} />
			),
		};
	}
};

export const BottomNavigator = () => (
	<Tab.Navigator
		screenOptions={createScreenOptions}
		initialRouteName="Products"
		tabBarOptions={{
			activeTintColor: theme.colors.brand.orange,
			inactiveTintColor: "gray",
		}}
	>
		<Tab.Screen
			style={{ background: "red" }}
			options={{
				title: "Home",
			}}
			name="Home"
			component={HomeScreen}
		/>
		<Tab.Screen
			style={{ background: "red" }}
			options={{
				title: "Products",
			}}
			name="Products"
			component={ProductsScreen}
		/>
		<Tab.Screen
			style={{ background: "red" }}
			options={{
				title: "On Sale",
			}}
			name="Sale"
			component={OnSaleScreen}
		/>
		<Tab.Screen
			style={{ background: "red" }}
			options={{
				title: "Shops",
			}}
			name="Shops"
			component={ShopNavigator}
		/>
	</Tab.Navigator>
);
