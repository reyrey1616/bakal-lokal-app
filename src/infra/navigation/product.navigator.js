// import React, { useEffect } from "react";
// import {
// 	createStackNavigator,
// 	TransitionPresets,
// } from "@react-navigation/stack";
// import ProductDetailsScreen from "../../screens/product-details.screen";
// import ProductsScreen from "../../screens/products.screen";

// const MainStackNavigator = createStackNavigator();

// const ProductNavigator = ({ navigation }) => {
// 	// useEffect(() => {
// 	// 	alert("wow");
// 	// 	navigation.navigate("Products");
// 	// }, []);
// 	return (
// 		<MainStackNavigator.Navigator
// 			headerMode="none"
// 			screenOptions={{
// 				...TransitionPresets.ModalPresentationIOS,
// 			}}
// 		>
// 			<MainStackNavigator.Screen
// 				name="Products"
// 				component={ProductsScreen}
// 			/>
// 			<MainStackNavigator.Screen
// 				name="ProductDetails"
// 				component={ProductDetailsScreen}
// 			/>
// 		</MainStackNavigator.Navigator>
// 	);
// };

// export default ProductNavigator;
