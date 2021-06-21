import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../screens/login.screen";
import RegistrationScreen from "../../screens/register.screen";

const MainStackNavigator = createStackNavigator();

const ProductNavigator = () => {
	return (
		<NavigationContainer>
			<MainStackNavigator.Navigator
				headerMode="none"
				screenOptions={{
					...TransitionPresets.ModalPresentationIOS,
				}}
			>
				<MainStackNavigator.Screen
					name="Login"
					component={LoginScreen}
				/>
				<MainStackNavigator.Screen
					name="Registration Form"
					component={RegistrationScreen}
				/>
			</MainStackNavigator.Navigator>
		</NavigationContainer>
	);
};

export default ProductNavigator;
