import React, { useEffect } from "react";
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
import CartScreen from "../../screens/cart.screen";
import DeliveryScreen from "../../screens/delivery.screen";
import CheckoutScreen from "../../screens/checkout.screen";
import { DrawerActions } from "@react-navigation/native";
import { getUserStart } from "../../services/auth/auth.actions";
import MapScreen from "../../screens/map.screen";
import { useDispatch } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { asyncStoreGet } from "../../services/utils";
import { View } from "react-native";
import { SafeArea } from "../../components/utils/safe-area.component";
import { Text } from "../../components/typography/text.component";
import { colors } from "../theme/colors";
import { Spacer } from "../../components/spacer/spacer.component";

export const navigationRef = React.createRef();

export function openDrawer(routeName, params) {
	navigationRef.current.dispatch(DrawerActions.openDrawer());
}

const MainStackNavigator = createStackNavigator();

const SampleScreen = () => (
	<SafeArea>
		<View>
			<Spacer position="bottom" size="medium" />
			<Text
				variant="title"
				style={{
					color: colors.brand.black,
				}}
			>
				Welcome to
			</Text>
			<Text
				variant="title"
				style={{
					color: colors.brand.orange,
				}}
			>
				BAKAL LOKAL
			</Text>
		</View>
	</SafeArea>
);

const MainNavigator = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUser = async () => {
			const token = await asyncStoreGet("token");
			console.log(token);
			if (token) {
				setAuthToken(token);
				dispatch(getUserStart());
			}
		};

		fetchUser();
	}, [dispatch]);

	return (
		<NavigationContainer ref={navigationRef}>
			<MainStackNavigator.Navigator
				headerMode="none"
				initialRouteName="Delivery"
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
				<MainStackNavigator.Screen name="Cart" component={CartScreen} />
				<MainStackNavigator.Screen
					name="Delivery"
					component={DeliveryScreen}
				/>
				<MainStackNavigator.Screen
					name="Checkout"
					component={CheckoutScreen}
				/>
				<MainStackNavigator.Screen name="Map" component={MapScreen} />
			</MainStackNavigator.Navigator>
		</NavigationContainer>
	);
};

export default MainNavigator;
