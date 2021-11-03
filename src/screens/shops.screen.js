import React, { useEffect, useState } from "react";
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
	const [merchantsToDisplay, setMerchantsToDisplay] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		dispatch(getMerchantsStart());
	}, [dispatch]);

	useEffect(() => {
		setMerchantsToDisplay(merchants && merchants);
	}, [loading]);

	const onFilterMerchant = (val) => {
		if (!val) return;

		if (val === "") {
			setMerchantsToDisplay(merchants && merchants);
		}

		let filtered = merchants?.filter((m) => {
			return m.name.toLowerCase().includes(val?.toLowerCase());
		});
		setSelectedCategory("");
		setMerchantsToDisplay(filtered);
	};

	const selectCategory = (val) => {
		if (!val) return;

		if (val === "" || val === null || val === undefined) {
			setMerchantsToDisplay(merchants && merchants);
		}
		setSelectedCategory(val);
		const filtered = merchants?.filter((m) => {
			const isExistingOnCategories = m?.categories?.find(
				(c) => c?.name === val
			);

			return isExistingOnCategories;
		});

		setMerchantsToDisplay(filtered);
	};

	return (
		<SafeArea>
			<View style={{ flex: 1, backgroundColor: colors.brand.dirtywhite }}>
				<HeaderWithSearch
					openDrawer={() => {
						navigation.dispatch();
					}}
				/>
				<PageHeader title="Merchants" />

				{loading ? (
					<Content>
						<Spinner color="orange" />
					</Content>
				) : (
					<>
						<ShopsWithSearch
							onTextSearch={(val) => onFilterMerchant(val)}
							onSelectCategory={(val) => selectCategory(val)}
							selectedCategory={selectedCategory}
						/>
						<MerchantsContainer
							navigation={navigation}
							merchants={
								merchants &&
								merchantsToDisplay &&
								merchantsToDisplay
							}
						/>
					</>
				)}
			</View>
		</SafeArea>
	);
};

export default ShopsScreen;
