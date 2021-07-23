import React, { useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, Text } from "react-native";
import { Button } from "native-base";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import WelcomeBanner from "../components/home-page/welcome-banner.component";
import {
	ShopAllProducts,
	Shops,
} from "../components/home-page/home.components";
import styled from "styled-components";
import { CategoriesList } from "../components/categories/categories.component";
import { useDispatch } from "react-redux";
import { getCategoriesStart } from "../services/category/category.actions";
const ScrollViewContainer = styled(ScrollView)`
	background-color: #fff;
	height: auto;
`;

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCategoriesStart());
	}, []);
	return (
		<SafeArea>
			<HeaderWithSearch
				openDrawer={() => {
					navigation.dispatch();
				}}
			/>

			<ScrollViewContainer
				contentContainerStyle={{ flexGrow: 1, zIndex: 1 }}
			>
				<WelcomeBanner />
				<ShopAllProducts />
				<Shops />
				<CategoriesList />
			</ScrollViewContainer>
		</SafeArea>
	);
};

export default HomeScreen;
