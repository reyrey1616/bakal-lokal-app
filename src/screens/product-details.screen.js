import React from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import Carousel from "../components/carousel/carousel.component";
import { StackHeader } from "../components/utils/stack-header.component";
import { ProductDetails } from "../components/products/product-details.component";
import { BottomCart } from "../components/bottom-cart/bottom-cart.component";
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

const ProductDetailsScreen = ({ navigation, route }) => {
	const { product, previousScreen } = route?.params;

	if (!product) {
		Alert.alert("Error loading product!");
	}

	const galleryImages = product?.gallery?.map(
		(img) => `https://bakal-lokal.xyz/products_gallery/${img}`
	);

	return (
		<SafeArea>
			<StackHeader previousScreen={previousScreen} />
			<Carousel
				data={[
					`https://bakal-lokal.xyz/products/${product?.profileImage}`,
					...galleryImages,
				]}
			/>
			<ProductDetails product={product} navigation={navigation} />
		</SafeArea>
	);
};

export default ProductDetailsScreen;
