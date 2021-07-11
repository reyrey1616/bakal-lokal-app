import React from "react";
import { Container, Tab, Tabs } from "native-base";
import { ProductsContainer } from "./products-container.component";
import { colors } from "../../infra/theme/colors";
import { PageHeader } from "../utils/page-header.component";
import { useSelector } from "react-redux";
import { selectPublicProducts } from "../../services/products/products.selectors";
// export const products = [
// 	{
// 		id: 1,
// 		image: require("../../assets/design/background.png"),
// 		name: "Rivory - Embutido",
// 		price: 120,
// 		merchant: "Rivory",
// 		description:
// 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam minus, ipsa nisi cumque assumenda voluptatem ullam soluta accusamus, eveniet eum explicabo quo. Minus hic sint impedit quisquam? Quis, ex.",
// 		categories: ["Lifestyle", "Advocacy"],
// 	},
// 	{
// 		id: 2,
// 		image: require("../../assets/design/background.png"),
// 		name: "Dela Yna - Blue earrings",
// 		price: 180,
// 		merchant: "Dela Yna",
// 		description:
// 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quibusdam minus, ipsa nisi cumque assumenda voluptatem ullam soluta accusamus, eveniet eum explicabo quo. Minus hic sint impedit quisquam? Quis, ex.",
// 		categories: ["Lifestyle", "Advocacy"],
// 	},
// ];
export const ProductTabs = ({ navigation }) => {
	const products = useSelector(selectPublicProducts);

	console.log(products?.length);
	return (
		<Container style={{ backgroundColor: colors.brand.dirtywhite }}>
			<PageHeader title="Products" />

			<Tabs>
				<Tab
					heading="All products"
					activeTextStyle={{ color: colors.brand.orange }}
					activeTabStyle={{
						borderColor: colors.brand.orange,
						borderWidth: 0,
					}}
				>
					<ProductsContainer
						products={products}
						navigation={navigation}
					/>
				</Tab>
				<Tab
					heading="New arrivals"
					activeTextStyle={{ color: colors.brand.orange }}
					activeTabStyle={{
						borderColor: colors.brand.orange,
						borderWidth: 0,
					}}
				>
					<ProductsContainer
						products={products}
						navigation={navigation}
					/>
				</Tab>
				<Tab
					heading="Popular products"
					activeTextStyle={{ color: colors.brand.orange }}
					activeTabStyle={{
						borderColor: colors.brand.orange,
						borderWidth: 0,
					}}
				>
					<ProductsContainer
						products={products}
						navigation={navigation}
					/>
				</Tab>
			</Tabs>
		</Container>
	);
};
