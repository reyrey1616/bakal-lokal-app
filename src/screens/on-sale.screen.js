import React, { useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import Carousel from "../components/carousel/carousel.component";
import { PageHeader } from "../components/utils/page-header.component";
import { ProductsContainer } from "../components/products/products-container.component";
import { getProductsOnSaleStart } from "../services/products/products.actions";
import { selectPublicSaleProducts } from "../services/products/products.selectors";
import { useDispatch, useSelector } from "react-redux";

const OnSaleScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const saleProducts = useSelector(selectPublicSaleProducts);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			dispatch(getProductsOnSaleStart());
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<SafeArea>
			<HeaderWithSearch
				openDrawer={() => {
					navigation.dispatch();
				}}
			/>
			<Carousel
				data={
					saleProducts &&
					saleProducts?.map(
						(prod) =>
							`https://bakal-lokal.xyz/products/${prod?.profileImage}`
					)
				}
			/>
			<PageHeader title="On sale now!" />
			<ProductsContainer products={saleProducts && saleProducts} />
		</SafeArea>
	);
};

export default OnSaleScreen;
