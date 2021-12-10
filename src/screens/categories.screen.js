import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeArea } from "../components/utils/safe-area.component";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import { PageHeader } from "../components/utils/page-header.component";
import BLHeader from "../components/header/header.component";
import axios from "axios";
import { colors } from "../infra/theme/colors";
import { ProductsContainer } from "../components/products/products-container.component";
import styled from "styled-components";
import { Spinner } from "native-base";
const ScrollViewContainer = styled(ScrollView)`
  background-color: #fff;
  height: auto;
`;

const getProductsByCategory = async (id) => {
  console.log(id);
  try {
    const products = await axios.get(`products/${id}/category`);
    const response = await products?.data;
    if (response?.success) {
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
        "Error loading the products. Please try again later!"
      );
    }

    return [];
  }
};

const CategoriesScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!route?.params?.id && !route?.params?.name) return;

    const getProducts = async () => {
      const products = await getProductsByCategory(route?.params?.id);
      if (products?.length > 0 && products) {
        setProducts(products);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <SafeArea>
      <BLHeader title="Categories" previousScreen={"Home"} />
      <PageHeader title={route?.params?.name && route?.params?.name} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollViewContainer
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: colors.brand.dirtywhite,
            flexDirection: "column",
            padding: 10,
          }}
        >
          {loading ? (
            <Spinner color="orange" />
          ) : (
            <ProductsContainer products={products && products} />
          )}
        </ScrollViewContainer>
      </View>
    </SafeArea>
  );
};

export default CategoriesScreen;
