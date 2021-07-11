import React, { useEffect } from "react";
import { View } from "react-native";
import { SafeArea } from "../components/utils/safe-area.component";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import { PageHeader } from "../components/utils/page-header.component";
import { ShopsWithSearch } from "../components/merchants/merchant-with-search.component";
import { MerchantsContainer } from "../components/merchants/merchant-container.component";
import { colors } from "../infra/theme/colors";
import { getMerchantsStart } from "../services/merchants/merchants.actions";
import { useDispatch, useSelector } from "react-redux";
import {
	selectMerchants,
	selectMerchantLoading,
} from "../services/merchants/merchants.selectors";
import { Spinner, Content } from "native-base";
const ShopsScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const loading = useSelector(selectMerchantLoading);
	const merchants = useSelector(selectMerchants);

	useEffect(() => {
		dispatch(getMerchantsStart());
	}, [dispatch]);

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

				{loading ? (
					<Content>
						<Spinner color="orange" />
					</Content>
				) : (
					<MerchantsContainer
						navigation={navigation}
						merchants={merchants}
					/>
				)}
			</View>
		</SafeArea>
	);
};

export default ShopsScreen;
