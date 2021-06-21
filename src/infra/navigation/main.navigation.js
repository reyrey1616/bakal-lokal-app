import React, { useEffect } from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../screens/login.screen";
import RegistrationScreen from "../../screens/register.screen";
import HomeScreen from "../../screens/home.screen";

const MainStackNavigator = createStackNavigator();

const MainNavigator = ({ navigation }) => {
	// useEffect(() => {
	// 	navigation.toggleDrawer();
	// }, []);
	return (
		<NavigationContainer>
			<MainStackNavigator.Navigator
				headerMode="none"
				initialRouteName="Home"
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
				<MainStackNavigator.Screen name="Home" component={HomeScreen} />
			</MainStackNavigator.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigator;
