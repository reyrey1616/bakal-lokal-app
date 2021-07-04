import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../screens/login.screen";
import RegistrationScreen from "../../screens/register.screen";
import DrawerMenuNavigator from "./menu.navigator";
// import { BottomNavigator } from "./bottom-navigation";
import ProductDetailsScreen from "../../screens/product-details.screen";

import { DrawerActions } from "@react-navigation/native";
export const navigationRef = React.createRef();
export function openDrawer(routeName, params) {
	navigationRef.current.dispatch(DrawerActions.openDrawer());
}

const MainStackNavigator = createStackNavigator();

const MainNavigator = () => {
	return (
		<NavigationContainer ref={navigationRef}>
			<MainStackNavigator.Navigator
				headerMode="none"
				initialRouteName="Menu"
				screenOptions={{
					...TransitionPresets.ModalPresentationIOS,
				}}
			>
				<MainStackNavigator.Screen
					name="Login"
					component={LoginScreen}
				/>
				<MainStackNavigator.Screen
					name="ProductDetails"
					component={ProductDetailsScreen}
				/>
				<MainStackNavigator.Screen
					name="Registration Form"
					component={RegistrationScreen}
				/>
				<MainStackNavigator.Screen
					name="Menu"
					component={DrawerMenuNavigator}
				/>
			</MainStackNavigator.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigator;
