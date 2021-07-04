import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import ShopDetailsScreen from "../../screens/shop-details.screen";
import ShopsScreen from "../../screens/shops.screen";

const MainStackNavigator = createStackNavigator();

const ProductNavigator = () => {
	return (
		<MainStackNavigator.Navigator
			headerMode="none"
			screenOptions={{
				...TransitionPresets.ModalPresentationIOS,
			}}
		>
			<MainStackNavigator.Screen name="Shops" component={ShopsScreen} />
			<MainStackNavigator.Screen
				name="ShopDetails"
				component={ShopDetailsScreen}
			/>
		</MainStackNavigator.Navigator>
	);
};

export default ProductNavigator;
