import React, { useEffect } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { Spinner } from "native-base";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import { ProductTabs } from "../components/products/products-tabs.component";
import { useDispatch, useSelector } from "react-redux";
import { selectPublicProducts } from "../services/products/products.selectors";
import {
  getProductsStart,
  getNewArrivalProductsStart,
} from "../services/products/products.actions";
const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectPublicProducts);
  useEffect(() => {
    dispatch(getProductsStart());
    dispatch(getNewArrivalProductsStart());
  }, []);

  return (
    <SafeArea>
      <HeaderWithSearch
        openDrawer={() => {
          navigation.dispatch();
        }}
      />

      {!products ? (
        <Spinner color="orange" />
      ) : (
        <ProductTabs navigation={navigation} />
      )}
    </SafeArea>
  );
};

export default ProductsScreen;
