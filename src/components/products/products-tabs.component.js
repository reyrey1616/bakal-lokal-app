import React from "react";
import { Container, Tab, Tabs } from "native-base";
import { ProductsContainer } from "./products-container.component";
import { colors } from "../../infra/theme/colors";
import { PageHeader } from "../utils/page-header.component";
import { useSelector } from "react-redux";
import {
  selectPublicProducts,
  selectNewArrivalProducts,
} from "../../services/products/products.selectors";

export const ProductTabs = ({ navigation }) => {
  const products = useSelector(selectPublicProducts);
  const newArrivalProducts = useSelector(selectNewArrivalProducts);
  console.log(products.length);
  return (
    <Container style={{ backgroundColor: colors.brand.dirtywhite }}>
      <PageHeader title="Products" />

      <Tabs backgroundColor="white" tabBarBackgroundColor="white">
        <Tab
          heading="All products"
          activeTextStyle={{ color: colors.brand.orange }}
          activeTabStyle={{
            borderColor: colors.brand.orange,
            borderWidth: 0,
            backgroundColor: "white",
          }}
          tabStyle={{
            backgroundColor: "white",
          }}
        >
          <ProductsContainer
            products={products && products}
            navigation={navigation}
          />
        </Tab>
        <Tab
          heading="New arrivals"
          activeTextStyle={{ color: colors.brand.orange }}
          activeTabStyle={{
            borderColor: colors.brand.orange,
            borderWidth: 0,
            backgroundColor: "white",
          }}
          tabStyle={{
            backgroundColor: "white",
          }}
        >
          <ProductsContainer
            products={newArrivalProducts && newArrivalProducts}
            navigation={navigation}
          />
        </Tab>
        <Tab
          heading="Popular products"
          activeTextStyle={{ color: colors.brand.orange }}
          activeTabStyle={{
            borderColor: colors.brand.orange,
            borderWidth: 0,
            backgroundColor: "white",
          }}
          tabStyle={{
            backgroundColor: "white",
          }}
        >
          <ProductsContainer products={products} navigation={navigation} />
        </Tab>
      </Tabs>
    </Container>
  );
};
