import React, { useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import Carousel from "../components/carousel/carousel.component";
import { PageHeader } from "../components/utils/page-header.component";
import { ProductsContainer } from "../components/products/products-container.component";
import { products } from "../components/products/products-tabs.component";
import { getProductsOnSaleStart } from "../services/products/products.actions";
import { selectPublicSaleProducts } from "../services/products/products.selectors";
import { useDispatch, useSelector } from "react-redux";
const images = [
	{
		id: 1,
		title: "Wow",
		image:
			"http://bakal-lokal.xyz/products/fish%20crackers-1620793789728-1624699196145.JPG",
	},
	{
		id: 2,
		title: "Wow",
		image:
			"http://bakal-lokal.xyz/products/fish%20crackers-1620793789728-1624699196145.JPG",
	},
];
const OnSaleScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const saleProducts = useSelector(selectPublicSaleProducts);
	console.log("SALE");
	console.log(saleProducts);

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
			<Carousel data={images} />
			<PageHeader title="On sale now!" />
			<ProductsContainer products={saleProducts && saleProducts} />
		</SafeArea>
	);
};

export default OnSaleScreen;
