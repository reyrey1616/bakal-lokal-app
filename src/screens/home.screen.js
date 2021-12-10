import React, { useEffect, useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { ScrollView, View, Alert } from "react-native";
import { Spinner } from "native-base";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import WelcomeBanner from "../components/home-page/welcome-banner.component";
import {
  ShopAllProducts,
  Shops,
} from "../components/home-page/home.components";
import styled from "styled-components";
import { CategoriesList } from "../components/categories/categories.component";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesStart } from "../services/category/category.actions";
import { selectLoading } from "../services/category/category.selectors";
import { Spacer } from "../components/spacer/spacer.component";
import SectionTitle from "../components/utils/title.component";
import { ProductsContainer } from "../components/products/products-container.component";
import axios from "axios";
const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  height: auto;
`;

const getFeaturedProducts = async () => {
  try {
    const products = await axios.get(`/products?isFeatured=true`);
    const response = await products?.data;

    console.log(products?.data);
    if (response?.success) {
      console.log(response.data);
      return response?.data;
    } else {
      throw Error;
    }
  } catch (error) {
    if (error.response && error.response.data.error) {
      const errorResponse = error.response.data.error;

      Alert.alert("Bakal Lokal", errorResponse);
    } else {
      Alert.alert(
        "Bakal Lokal",
        "Error loading the featured products. Please try again later!"
      );
    }

    return [];
  }
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const [featuredProducts, setIsFeaturedProducts] = useState([]);

  useEffect(() => {
    dispatch(getCategoriesStart());

    getFeaturedProducts();

    const getFeatured = async () => {
      const prod = await getFeaturedProducts();
      setIsFeaturedProducts(prod);
    };

    getFeatured();
  }, []);

  return (
    <SafeArea>
      <HeaderWithSearch
        openDrawer={() => {
          navigation.dispatch();
        }}
      />

      <ScrollViewContainer contentContainerStyle={{ flexGrow: 1, zIndex: 1 }}>
        <WelcomeBanner />
        <ShopAllProducts />
        <Shops />
        {loading ? <Spinner color="orange" /> : <CategoriesList />}
        <View style={{ padding: 15 }}>
          <SectionTitle text1="Featured" text2="products" />
          <Spacer position="bottom" size="large" />
          <ProductsContainer products={featuredProducts} />
        </View>
      </ScrollViewContainer>
    </SafeArea>
  );
};

export default HomeScreen;
