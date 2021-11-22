import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { SafeArea } from "../components/utils/safe-area.component";
import Carousel from "../components/carousel/carousel.component";
import { StackHeader } from "../components/utils/stack-header.component";
import { ProductDetails } from "../components/products/product-details.component";
import axios from "axios";
const images = [
	"http://bakal-lokal.xyz/products/fish%20crackers-1620793789728-1624699196145.JPG",
	"http://bakal-lokal.xyz/products/fish%20crackers-1620793789728-1624699196145.JPG",
];

const getReviewsByProduct = async (id) => {
	try {
		const reviews = await axios.get(
			`https://bakal-lokal.xyz/api/v1/reviews/${id}`
		);
		const response = await reviews?.data;
		console.log(response?.data);
		if (response?.success) {
			return response?.data;
		} else {
			throw Error;
		}
	} catch (error) {
		console.log(error.response?.data);
		if (error.response && error.response.data.error) {
			const errorResponse = error.response.data.error;

			Alert.alert("Bakal Lokal", errorResponse);
		} else {
			Alert.alert(
				"Bakal Lokal",
				"Error loading the reviews. Please try again later!"
			);
		}

		return [];
	}
};

const ProductDetailsScreen = ({ navigation, route }) => {
	const { product, previousScreen } = route?.params;

	const [reviews, setReviews] = useState([]);

	const [reviewsLoading, setReviewsLoading] = useState(true);

	useEffect(() => {
		if (!product && !product?._id) return;

		const getReviews = async () => {
			const reviews = await getReviewsByProduct(product?._id);
			if (reviews?.length > 0 && reviews) {
				setReviews(reviews);
				setReviewsLoading(false);
			}
		};

		getReviews();
	}, []);

	// console.log(reviews);

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
			<ProductDetails
				product={product}
				navigation={navigation}
				reviews={reviews && reviews}
				reviewsLoading={reviewsLoading && reviewsLoading}
			/>
		</SafeArea>
	);
};

export default ProductDetailsScreen;
