import React, { useEffect, useState } from "react";
import { SafeArea } from "../components/utils/safe-area.component";
import { Spinner } from "native-base";
import { Alert, RefreshControl } from "react-native";
import HeaderWithSearch from "../components/header-with-search/header-with-search.component";
import { ProductTabs } from "../components/products/products-tabs.component";
import { useDispatch, useSelector } from "react-redux";
import { selectPublicProducts } from "../services/products/products.selectors";
import {
  getProductsStart,
  getNewArrivalProductsStart,
} from "../services/products/products.actions";
import { ScrollView } from "react-native-gesture-handler";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectPublicProducts);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(getProductsStart());
    dispatch(getNewArrivalProductsStart());
  };

  // const onRefresh = React.useCallback(() => {
  //   setLoading(true);
  //   loadData();

  //   wait(1000).then(() => {
  //     setLoading(false);
  //   });
  // }, []);

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
