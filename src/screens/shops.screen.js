import React from "react";
import { View } from "react-native";
import { SafeArea } from "../components/utils/safe-area.component";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import { PageHeader } from "../components/utils/page-header.component";
import { ShopsWithSearch } from "../components/merchants/merchant-with-search.component";
import { MerchantsContainer } from "../components/merchants/merchant-container.component";
import { colors } from "../infra/theme/colors";
const ShopsScreen = ({ navigation }) => {
	return (
		<SafeArea>
			<View style={{ flex: 1, backgroundColor: colors.brand.dirtywhite }}>
				<HeaderWithSearch
					openDrawer={() => {
						navigation.dispatch();
					}}
				/>
				<PageHeader title="Merchants" />
				<ShopsWithSearch />
				<MerchantsContainer navigation={navigation} />
			</View>
		</SafeArea>
	);
};

export default ShopsScreen;
