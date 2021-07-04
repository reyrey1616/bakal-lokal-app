import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import { ProductTabs } from "../components/products/products-tabs.component";

const ProductsScreen = ({ navigation }) => {
	return (
		<SafeArea>
			<HeaderWithSearch
				openDrawer={() => {
					navigation.dispatch();
				}}
			/>

			<ProductTabs navigation={navigation} />
		</SafeArea>
	);
};

export default ProductsScreen;
